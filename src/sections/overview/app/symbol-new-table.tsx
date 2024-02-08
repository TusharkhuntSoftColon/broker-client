/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import { io } from 'socket.io-client';
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { useDrag, useDrop, DndProvider, DragPreviewImage } from 'react-dnd';

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useTheme, IconButton } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import TableContainer from '@mui/material/TableContainer';

import useAuth from 'src/hooks/useAuth';
import { useBoolean } from 'src/hooks/use-boolean';

import { SOCKET_URL } from 'src/utils/environments';

import { newSymbolTableData } from 'src/_mock';
import adminService from 'src/services/adminService';

import Iconify from 'src/components/iconify';
import { TableHeadCustom } from 'src/components/table';
import SocketSymbol from 'src/components/modal/SocketSymbol';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import AddSymbolInDashboard from 'src/components/modal/AddSymbolInDashboard';
// ----------------------------------------------------------------------

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

const TABLE_HEAD = [
  {
    id: 'symbol',
    label: 'Symbol',
    align: 'left',
    border: '1px solid #dddddd !important',
  },
  { id: 'bid', label: 'Bid', align: 'right', border: '1px solid #dddddd !important' },
  { id: 'ask', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
];

export default function SymbolTableDashboard() {
  const socketSymbol = useBoolean();
  const addSymbolInDashboard = useBoolean();
  const role = useSelector((data: any) => data.auth.role);
  const { token } = useAuth();
  const [value, setValue] = React.useState(0);
  const [tableData, setTableData] = useState<any>([]);
  const [symbolData, setSymbolData] = useState<any>([]);
  const [activeSymbolData] = useState<any>([]);
  const [rows, setRow] = useState<any>([]);
  const [assignedImportMonth, setAssignedImportMonth] = useState([]);
  const [currentSymbolList, setCurrentSymbolList] = useState<any>([]);

  const getImportMonthList = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getImportMonthOrderListByAdmin;
      case 'SUPER_MASTER':
        return adminService.getImportMonthListBySuperMaster;
      case 'MASTER':
        return adminService.getImportMonthListByMaster;
      // Add other cases for different roles with their respective paths
      default:
        return adminService.getImportMonthListByMaster; // Return a default path if role doesn't match
    }
  };

  // // list view page API
  // const { mutate: getSymbolList } = useMutation(adminService.getImportMonthList, {
  //   onSuccess: (data) => {
  //     SymbolListForDashboardTable(data?.data?.rows);
  //   },
  //   onError: (error: any) => {
  //     if (isAxiosError(error)) {
  //       enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
  //     }
  //   },
  // });

  const { mutate: getUpdatedImportMonthList } = useMutation(
    adminService.getupdatedImportMonthListByAdmin,
    {
      onSuccess: (data) => {},
      onError: (error) => {
        console.log('error', error);
      },
    }
  );

  const { mutate: getAssignedImportMonthList } = useMutation(
    adminService.getassignedImportMonthListByAdmin,
    {
      onSuccess: (data) => {
        setAssignedImportMonth(data?.data?.rows);
      },
      onError: (error) => {
        console.log('error', error);
      },
    }
  );
  const { mutate } = useMutation(getImportMonthList(role), {
    onSuccess: (data) => {
      const symbolnewData: any[] = data?.data?.rows;

      setSymbolData(symbolnewData);
      setCurrentSymbolList(symbolnewData);

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
      // const socket = io('wss://192.168.1.12:3000/');
      const socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: {
          transport: 'websocket',
          EIO: '4',
          authorization: token,
        },
        auth: { authorization: token },
        extraHeaders: {
          Authorization: `Bearer ${token}`, // Add your auth token to the headers
        },
      });

      const Symbols = activeSymbols.map((symbol: any) => symbol?.socketLiveName);
      const parsedSymbols = JSON.stringify(Symbols);

      socket.on('connect', () => {
        console.log('[socket] Connected');
        socket.emit('subscribeToUserServerMarket', parsedSymbols);
      });

      socket.emit('joinUserRoom', parsedSymbols);

      socket.on('disconnect', (reason: any) => {
        console.log('[socket] Disconnected:', reason);
      });
      socket.on('error', (error: any) => {
        console.log('[socket] Error:', error);
      });

      socket.on('marketWatch', (data: any) => {
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
    const symbolTableDashboard: any[] = [];
    for (const data of tableData) {
      symbolTableDashboard.push({
        id: data?.InstrumentIdentifier,
        symbol: symbolData
          .filter((item: any) => item?.socketLiveName === data?.InstrumentIdentifier)
          .map((item: any) => item?.name),
        bid: data?.BuyPrice,
        ask: data?.SellPrice,
        dailyChange: data?.PriceChangePercentage,
        oldBuyPrice: data?.oldBuyPrice,
        oldSellPrice: data?.oldSellPrice,
        oldPercentage: data?.oldPercentage,
      });
    }
    const updatedArray = symbolData
      .map((data: any) =>
        symbolTableDashboard.find((data1: any) => data1.id === data?.socketLiveName)
      )
      .filter(Boolean); // Filter out undefined values
    setRow(updatedArray);
  }, [tableData]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  useEffect(() => {
    mutate();
    getUpdatedImportMonthList();
    getAssignedImportMonthList();
    // getSymbolList();
  }, []);

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

  console.log({ rows });

  const tabs = [
    {
      label: 'Symbols',
      value: 0,
      title: 'Symbol Table',
      tableDatas: newSymbolTableData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'bid', label: 'Bid', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'ask', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
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
    <>
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
              <CustomTabPanel
                key={data.value}
                value={value}
                index={data.value}
                styles={{ overflow: 'hidden' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CardHeader title={data.title} sx={{ mb: 4, mt: -1 }} />

                  <IconButton
                    color="default"
                    sx={{ mb: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addSymbolInDashboard.onTrue();
                    }}
                  >
                    <AddIcon sx={{ fontSize: '28px', fontWeight: '800' }} />
                  </IconButton>

                  <IconButton
                    color="default"
                    sx={{ mb: 2, mr: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      socketSymbol.onTrue();
                    }}
                  >
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                </Box>
                <TableContainer
                  className="symbol-table-card"
                  sx={{ overflow: 'scroll', height: '400px' }}
                >
                  <Table stickyHeader>
                    <TableHeadCustom
                      sx={{ textAlign: 'right', border: '1px solid #dddddd' }}
                      headLabel={TABLE_HEAD}
                    />
                    <TableBody>
                      {rowData?.map((row: any, index: number) => (
                        <SymbolNewRow key={row.id} row={row} index={index} value={value} />
                      ))}
                    </TableBody>
                  </Table>
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
                marginRight: 0,
              },
            }}
          >
            {tabs.map((data: any) => (
              <Tab
                key={data.value}
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

      <AddSymbolInDashboard
        open={addSymbolInDashboard.value}
        onClose={addSymbolInDashboard.onFalse}
        symbolOptionList={assignedImportMonth}
        mutateSymbolData={mutate}
        currentList={currentSymbolList}
      />

      <SocketSymbol
        open={socketSymbol.value}
        onClose={socketSymbol.onFalse}
        symbolData={symbolData}
        setSymbolData={setSymbolData}
        mutateSymbolData={mutate}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type SymbolNewRowProps = {
  row: any;
  value?: any;
  index?: any;
  // moveRow: (fromIndex: number, toIndex: number) => void;
};

function SymbolNewRow({
  row,
  value,
  index,
  // moveRow
}: SymbolNewRowProps) {
  const popover = usePopover();
  const theme = useTheme();
  const handleBidData =
    row?.bid !== undefined && row?.oldBuyPrice !== undefined && row?.bid > row?.oldBuyPrice;

  const handleAskData =
    row?.ask !== undefined && row?.oldSellPrice !== undefined && row?.ask > row?.oldSellPrice;

  const handleDownload = () => {
    popover.onClose();
  };

  const handlePrint = () => {
    popover.onClose();
  };

  const handleShare = () => {
    popover.onClose();
  };

  const handleDelete = () => {
    popover.onClose();
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
                    ? theme.palette.mode === 'light'
                      ? 'black'
                      : 'white'
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
                    ? theme.palette.mode === 'light'
                      ? 'black'
                      : 'white'
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
