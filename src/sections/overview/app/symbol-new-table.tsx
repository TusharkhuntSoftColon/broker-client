/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';

import useAuth from 'src/hooks/useAuth';

import { SOCKET_URL } from 'src/utils/environments';

import { newSymbolTableData } from 'src/_mock';
import adminService from 'src/services/adminService';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useTable, TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// ----------------------------------------------------------------------

type RowProps = {
  id: any;
  symbol: string;
  bid: number;
  ask: number;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  styles: any;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #dddddd',
}));

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, styles, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={styles}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface formattedDataInterface {
  name: string;
  _id: string;
  importMonth: {
    label: string;
    value: string;
  }[];
}

export default function SymbolTableDashboard() {
  const [value, setValue] = React.useState(0);
  const role = useSelector((data: any) => data.auth.role);
  const { token } = useAuth();
  const table = useTable();
  const [tableData, setTableData] = useState<any>([]);
  const [symbolData, setSymbolData] = useState<any>([]);
  const [exchangeData, setExchangeData] = useState<formattedDataInterface[]>([]);
  const [rows, setRow] = useState<any>([]);

  const getImportMonthList = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getImportMonthListByAdmin;
      case 'SUPER_MASTER':
        return adminService.getImportMonthListBySuperMaster;
      case 'MASTER':
        return adminService.getImportMonthListByMaster;
      // Add other cases for different roles with their respective paths
      default:
        return adminService.getImportMonthListByMaster; // Return a default path if role doesn't match
    }
  };

  const { mutate } = useMutation(getImportMonthList(role), {
    onSuccess: (data) => {
      const symbolnewData: any[] = data?.data?.rows;

      setSymbolData(symbolnewData);

      console.log({ symbolnewData });

      // set table data with empty socket
      const symbolTableDashboard = [];
      for (const symbols of symbolnewData) {
        symbolTableDashboard.push({
          id: symbols?._id,
          symbol: symbols?.name,
          bid: 0,
          ask: 0,
          dailyChange: 0,

          oldBuyPrice: 0,
          oldSellPrice: 0,
          oldPercentage: 0,
        });
      }
      setRow(symbolTableDashboard);

      // setActiveSymbolData(symbolnewData);
      socketConnection(symbolnewData);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const socketConnection = async (activeSymbols: any) => {
    try {
      const socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: {
          transport: 'websocket',
          EIO: '4',
          authorization: token,
        },
        auth: { authorization: token },
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      const Symbols = activeSymbols.map((symbol: any) => symbol?.socketLiveName);
      const parseSymbol = JSON.stringify(Symbols);

      socket.on('connect', () => {
        console.log('[socket] Connected');
        socket.emit('subscribeToUserServerMarket', parseSymbol);
      });

      socket.emit('joinUserRoom', parseSymbol);

      socket.on('disconnect', (reason: any) => {
        console.log('[socket] Disconnected:', reason);
      });
      socket.on('error', (error: any) => {
        console.log('[socket] Error:', error);
      });

      socket.on('marketWatch', (data: any) => {
        // console.log('marketWatch', data);
        setTableData((prev: any) => {
          let index1 = -1;

          for (let index = 0; index < prev.length; index++) {
            const data1 = prev[index];
            if (
              data1.InstrumentIdentifier &&
              data.InstrumentIdentifier &&
              data1.InstrumentIdentifier === data.InstrumentIdentifier
            ) {
              index1 = index;

              break;
            }
          }

          if (index1 === -1) {
            return [...prev, data];
          }

          const newObj = {
            ...data,
            oldBuyPrice: prev[index1].BuyPrice,
            oldSellPrice: prev[index1].SellPrice,
            oldPercentage: prev[index1].PriceChangePercentage,
          };
          prev[index1] = newObj;
          return [...prev];
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // socketetConnection();
    mutate();
  }, []);

  useEffect(() => {
    const symbolTableDashboard = [];
    for (const data of tableData) {
      symbolTableDashboard.push({
        id: data.InstrumentIdentifier,
        symbol: symbolData.map((item: any) =>
          item?.socketLiveName === data?.InstrumentIdentifier && item?.symbolType === data?.Exchange
            ? item.name
            : null
        ),
        bid: data.BuyPrice,
        ask: data.SellPrice,
        dailyChange: data.PriceChangePercentage,

        oldBuyPrice: data.oldBuyPrice,
        oldSellPrice: data.oldSellPrice,
        oldPercentage: data.oldPercentage,
      });
    }
    setRow(symbolTableDashboard);
  }, [tableData]);

  useEffect(() => {
    console.log({ rows });
  }, [rows]);

  const rowData = rows?.map((row: any) => {
    const { id, symbol, bid, ask, dailyChange, oldBuyPrice, oldSellPrice, oldPercentage } = row;
    return {
      id,
      symbol,
      bid,
      ask,
      dailyChange,
      oldBuyPrice,
      oldSellPrice,
      oldPercentage,
    };
  });

  const tabs = [
    {
      label: 'Symbols',
      value: 0,
      title: 'Symbol Table',
      tableDatas: newSymbolTableData,
      tableLabel: [
        {
          id: 'symbol',
          label: 'Symbol',
          align: 'left',
          border: '1px solid #dddddd !important',
          width: '80px',
        },
        {
          id: 'bid',
          label: 'Bid',
          align: 'right',
          border: '1px solid #dddddd !important',
          width: '80px',
        },
        {
          id: 'ask',
          label: 'Ask',
          align: 'right',
          border: '1px solid #dddddd !important',
          width: '80px',
        },
      ],
    },
    {
      label: 'Details',
      value: 1,
      title: 'Details Table',
      tableDatas: newSymbolTableData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'bid', label: 'Bid', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'ask', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
      ],
    },
    {
      label: 'Ticks',
      value: 2,
      title: 'Ticks Table',
      tableDatas: newSymbolTableData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'bid', label: 'Bid', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'ask', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
      ],
    },
  ];
  return (
    <Card
      sx={{
        borderRadius: 0,
        height: 'inherit',
        border: '1px solid #d3d3d3',
        WebkitBorderRadius: '5px',
      }}
    >
      <Box sx={{ margin: '5px', border: '1px solid #d3d3d3' }}>
        <Box>
          {tabs.map((data) => (
            <CustomTabPanel value={value} index={data.value} styles={{ overflow: 'hidden' }}>
              <CardHeader title={data.title} sx={{ mb: 4, mt: -1 }} />
              <TableContainer sx={{ overflow: 'unset', height: '400px' }}>
                <Scrollbar>
                  <Table stickyHeader>
                    <TableHeadCustom
                      sx={{ textAlign: 'right', border: '1px solid #dddddd' }}
                      headLabel={data.tableLabel}
                    />

                    <TableBody>
                      {rowData.map((row: any, index: any) => (
                        <SymbolNewRow key={row.id} row={row} index={index} value={value} />
                      ))}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </CustomTabPanel>
          ))}
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTab-root': {
              marginRight: 0, // Remove auto margin right for each tab
            },
          }}
        >
          {tabs.map((data: any) => (
            <Tab
              label={data.label}
              {...a11yProps(data.value)}
              sx={{
                // ml: 2,
                width: '20%',
                marginRight: '0px !important',
                borderTop: value === data.value ? 'none' : '1px solid #d3d3d3',
                borderLeft: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                borderRight: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                // borderBottom: value === data.value ? '1px solid #d3d3d3' : '1px solid #d3d3d3',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type SymbolNewRowProps = {
  row: RowProps | any;
  value?: any;
  index?: any;
};

function SymbolNewRow({ row, value, index }: SymbolNewRowProps) {
  const popover = usePopover();
  const handleBidData =
    row?.bid !== undefined && row?.oldBuyPrice !== undefined && row?.bid > row?.oldBuyPrice;

  const handleAskData =
    row?.ask !== undefined && row?.oldSellPrice !== undefined && row?.ask > row?.oldSellPrice;

  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };

  return (
    <>
      <StyledTableRow>
        <TableCell
          style={{
            border: '1px solid #dddddd',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '9px',
            borderLeft: 'none',
          }}
        >
          {handleBidData || handleAskData ? (
            <NorthEastIcon style={{ fontSize: '18px', color: 'blue' }} />
          ) : (
            <SouthEastIcon style={{ fontSize: '18px', color: 'red' }} />
          )}
          {row.symbol}
        </TableCell>
        <StyledTableCell
          style={{
            color:
              row?.bid !== undefined && row?.oldBuyPrice !== undefined
                ? row?.bid > row?.oldBuyPrice
                  ? 'blue'
                  : row?.bid === row?.oldBuyPrice
                    ? 'black'
                    : 'red'
                : 'red',
            textAlign: 'right',
            width: '40px',
            padding: '9px',
          }}
        >
          {row.bid}
        </StyledTableCell>
        <StyledTableCell
          style={{
            color:
              row?.ask !== undefined && row?.oldSellPrice !== undefined
                ? row?.ask > row?.oldSellPrice
                  ? 'blue'
                  : row?.ask === row?.oldSellPrice
                    ? 'black'
                    : 'red'
                : 'red',
            textAlign: 'right',
            width: '40px',
            padding: '9px',
            borderRight: 'none',
          }}
        >
          {row.ask}
        </StyledTableCell>
      </StyledTableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:cloud-download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
