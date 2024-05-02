/* eslint-disable perfectionist/sort-imports */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { useDrag, useDrop, DndProvider, DragPreviewImage } from 'react-dnd';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Tooltip, useTheme, IconButton, CardHeader } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { newSymbolTableData } from 'src/_mock';
import adminService from 'src/services/adminService';

import Iconify from 'src/components/iconify';
import { TableHeadCustom } from 'src/components/table';
import SocketSymbol from 'src/components/modal/SocketSymbol';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import AddSymbolInDashboard from 'src/components/modal/AddSymbolInDashboard';
import superMasterService from 'src/services/superMasterService';
import masterService from 'src/services/masterService';

import useAuth from 'src/hooks/useAuth';
import { useSocket } from 'src/context/SocketContext';
import SymbolPropertiesDialog from '../Dialog/SymbolProperties';
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
  { id: 'dailyChange', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
  { id: 'high', label: 'High', align: 'right', border: '1px solid #dddddd !important' },
  { id: 'low', label: 'Low', align: 'right', border: '1px solid #dddddd !important' },
];

export default function SymbolTableDashboard() {
  const socketSymbol = useBoolean();
  const addSymbolInDashboard = useBoolean();
  const { role } = useAuth();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [symbolData, setSymbolData] = useState<any>([]);
  const [rows, setRow] = useState<any>([]);
  const [assignedExchanges, setAssignedExchanges] = useState([]);
  const [currentSymbolList, setCurrentSymbolList] = useState<any>([]);
  const [importMonthData, setImportMonthData] = useState<any>([]);
  const [socketData, setSocketData] = useState<any>([]);
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);

  const { socket, connect, disconnect, subscribeToMarket, joinUserRoom, marketWatch } = useSocket();

  const getImportMonthList = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getImportMonthOrderListByAdmin;
      case 'SUPER_MASTER':
        return superMasterService.getImportMonthOrderListBySuperMaster;
      case 'MASTER':
        return masterService.getImportMonthOrderListByMaster;
      default:
        return masterService.getImportMonthOrderListByMaster;
    }
  };

  const getAssignedExchangeByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getassignedExchangeListByAdmin;
      case 'SUPER_MASTER':
        return superMasterService.getassignedExchangeListBySuperMaster;
      case 'MASTER':
        return masterService.getassignedExchangeListByMaster;
      default:
        return masterService.getassignedExchangeListByMaster;
    }
  };

  const { mutate: getAssignedExchangeList } = useMutation(getAssignedExchangeByRole(role), {
    onSuccess: (data) => {
      setAssignedExchanges(data?.data?.rows);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  useEffect(() => {
    if (socket) {
      connect();
      subscribeToMarket('symbol', importMonthData); // Subscribe to market when the component mounts
      joinUserRoom('symbol', importMonthData); // Join user room when the component mounts

      socket.on('disconnect', (reason: any) => {
        console.log('[socket] Disconnected:', reason);
      });

      socket.on('error', (error: any) => {
        console.log('[socket] Error:', error);
      });

      marketWatch(setSocketData);
    }

    return () => {
      if (socket) {
        disconnect();
      }
    };
  }, [socket, connect, disconnect, subscribeToMarket, joinUserRoom, importMonthData]);

  const { mutate } = useMutation(getImportMonthList(role), {
    onSuccess: async (data) => {
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
      setImportMonthData(symbolnewData);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  // const getSymbolPropertiesByRole: any = (role1: any) => {
  //   switch (role1) {
  //     case 'ADMIN':
  //       return overviewService.getSymbolPropertiesByAdmin();
  //     case 'SUPER_MASTER':
  //       return overviewService.getSymbolPropertiesBySuperMaster();
  //     case 'MASTER':
  //       return overviewService.getSymbolPropertiesByMaster();
  //     default:
  //       return overviewService.getSymbolPropertiesByMaster();
  //   }
  // };
  // const { mutate: getSymbolProperty } = useMutation(getSymbolPropertiesByRole(role), {
  //   onSuccess: (data) => {
  //     console.log(data?.data?.rows);
  //     // setSymbolProperties(data?.rows);
  //   },
  //   onError: (error) => {
  //     console.log('error', error);
  //   },
  // });

  // useEffect(() => {
  //   getSymbolProperty();
  // }, []);

  useEffect(() => {
    const symbolTableDashboard: any[] = [];
    for (const data of socketData) {
      symbolTableDashboard.push({
        id: symbolData
          .filter((item: any) => item?.socketLiveName === data?.InstrumentIdentifier)
          .map((item: any) => item?._id)[0],
        instrumentIdentifier: data?.InstrumentIdentifier,
        symbol: symbolData
          .filter((item: any) => item?.socketLiveName === data?.InstrumentIdentifier)
          .map((item: any) => item?.name),
        bid: data?.BuyPrice,
        ask: data?.SellPrice,
        dailyChange: data?.PriceChangePercentage,
        oldBuyPrice: data?.oldBuyPrice,
        oldSellPrice: data?.oldSellPrice,
        oldPercentage: data?.oldPercentage,
        bidColor:
          data?.BuyPrice !== undefined && data?.oldBuyPrice !== undefined
            ? data?.BuyPrice > data?.oldBuyPrice
              ? 'blue'
              : data?.BuyPrice === data?.oldBuyPrice
                ? theme.palette.mode === 'light'
                  ? 'red'
                  : 'white'
                : 'red'
            : 'black',
        askColor:
          data?.SellPrice !== undefined && data?.oldSellPrice !== undefined
            ? data?.SellPrice > data?.oldSellPrice
              ? 'blue'
              : data?.SellPrice === data?.oldSellPrice
                ? theme.palette.mode === 'light'
                  ? 'black'
                  : 'white'
                : 'red'
            : 'red',
        open: data?.Open,
        close: data?.Close,
        high: data?.High,
        low: data?.Low,
        priceChangePercentage: data?.PriceChangePercentage,
        lastTradePrice: data?.LastTradePrice,
        priceChange: data?.PriceChange,
      });
    }
    const updatedArray = symbolData
      .map((data: any) =>
        symbolTableDashboard.find(
          (data1: any) => data1.instrumentIdentifier === data?.socketLiveName
        )
      )
      .filter(Boolean);

    setRow(updatedArray);
  }, [socketData]);

  useEffect(() => {
    mutate();
    getAssignedExchangeList();
  }, []);

  const rowData = rows?.map((row: any) => {
    const {
      id,
      symbol,
      bid,
      ask,
      dailyChange,
      oldBuyPrice,
      oldSellPrice,
      oldPercentage,
      bidColor,
      askColor,
      open,
      close,
      high,
      low,
      priceChangePercentage,
      lastTradePrice,
      priceChange,
    } = row;
    return {
      id,
      symbol,
      bid,
      ask,
      dailyChange,
      oldBuyPrice,
      oldSellPrice,
      oldPercentage,
      bidColor,
      askColor,
      open,
      close,
      high,
      low,
      priceChangePercentage,
      lastTradePrice,
      priceChange,
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
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'bid',
          label: 'Bid',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'ask',
          label: 'Ask',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'ltp',
          label: 'LTP',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'dailyChange',
          label: 'Net Change',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'change%',
          label: 'Change%',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'high',
          label: 'High',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'low',
          label: 'Low',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'open',
          label: 'Open',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'close',
          label: 'Close',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
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
          [theme.breakpoints.down(1800)]: {
            height: '49vh',
          },

          [theme.breakpoints.up(1600)]: {
            height: '53vh',
          },
        }}
      >
        <Box sx={{ margin: '5px', border: '1px solid #d3d3d3', height: '98%' }}>
          <Box>
            {tabs.map((data) => (
              <CustomTabPanel
                key={data.value}
                value={value}
                index={data.value}
                styles={{ overflowY: 'hidden' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    fontSize: '5px',
                    padding: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CardHeader
                    title={data.title}
                    sx={{ padding: '0px 0px 0px 10px !important', fontSize: '12px' }}
                  />
                  <Box>
                    <Tooltip title="Advance Mode" placement="top">
                      <IconButton
                        color="default"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAdvancedMode(!isAdvancedMode);
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: '16px',
                            border: '1px solid gray',
                            padding: 0.3,
                            borderRadius: '50%',
                            height: '22px',
                            width: '22px',
                            backgroundColor: isAdvancedMode ? 'lightgray' : 'transparent',
                          }}
                        >
                          A
                        </Box>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add Symbol" placement="top">
                      <IconButton
                        color="default"
                        onClick={(e) => {
                          e.stopPropagation();
                          addSymbolInDashboard.onTrue();
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rearrange Symbols" placement="top">
                      <IconButton
                        color="default"
                        onClick={(e) => {
                          e.stopPropagation();
                          socketSymbol.onTrue();
                        }}
                        sx={{ fontSize: '18px', fontWeight: '800' }}
                      >
                        <CreateIcon sx={{ fontSize: '18px', fontWeight: '800' }} />
                        {/* <Iconify icon="solar:pen-bold" /> */}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <TableContainer
                  className="symbol-table-card"
                  sx={{
                    overflow: 'scroll',
                    // height: { md: '40vh !important', xl: '46vh !important' },
                    // maxHeight: { md: '40vh !important', xl: '46vh !important' },
                    maxWidth: '52.5vh !important',
                    [theme.breakpoints.down(1800)]: {
                      height: '42vh',
                    },

                    [theme.breakpoints.up(1600)]: {
                      height: '48vh',
                    },

                    // [theme.breakpoints.down(347)]: {
                    //   width: '70%',
                    // },
                  }}
                >
                  <Table stickyHeader>
                    <TableHeadCustom
                      sx={{
                        textAlign: 'right',
                        border: '1px solid #dddddd',
                      }}
                      headLabel={
                        data?.label === 'Symbols' && !isAdvancedMode
                          ? data?.tableLabel.slice(0, 3)
                          : data?.tableLabel
                      }
                    />
                    <TableBody>
                      {rowData?.map((row: any, index: number) => (
                        <SymbolNewRow key={row.id} row={row} isAdvancedMode={isAdvancedMode} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Card>

      <AddSymbolInDashboard
        open={addSymbolInDashboard.value}
        onClose={addSymbolInDashboard.onFalse}
        assignedExchangesList={assignedExchanges}
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
  isAdvancedMode?: boolean;
};

function SymbolNewRow({ row, isAdvancedMode }: SymbolNewRowProps) {
  const popover = usePopover();
  const symbolProperties = useBoolean();
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
      <StyledTableRow sx={{ cursor: 'pointer' }} onDoubleClick={() => symbolProperties.onTrue()}>
        <TableCell
          style={{
            border: '1px solid #dddddd',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1px',
            padding: '1px',
            fontSize: '13px',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: 'none',
          }}
        >
          {handleBidData || handleAskData ? (
            <NorthEastIcon style={{ fontSize: '14px', color: 'blue' }} />
          ) : (
            <SouthEastIcon style={{ fontSize: '14px', color: 'red' }} />
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
            width: '100px',
            fontSize: '13px',
            padding: '5px',
            borderRight: 'none',
            borderBottom: 'none',
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
            width: '100px',
            fontSize: '13px',
            padding: '5px',
            borderRight: 'none',
            borderBottom: 'none',
          }}
        >
          {row.ask}
        </StyledTableCell>
        {isAdvancedMode && (
          <>
            {' '}
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
                width: '100px',
                fontSize: '13px',
                padding: '5px',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            >
              {row?.lastTradePrice}
            </StyledTableCell>
            <StyledTableCell
              style={{
                color: row.priceChange > 0 ? 'blue' : 'red',
                textAlign: 'right',
                width: '100px',
                fontSize: '13px',
                padding: '5px',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            >
              {row.priceChange?.toFixed(2)}
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
                width: '100px',
                fontSize: '13px',
                padding: '5px',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            >
              {row.priceChangePercentage?.toFixed(2)}
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
                width: '100px',
                fontSize: '13px',
                padding: '5px',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            >
              {row.high}
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
                width: '100px',
                fontSize: '13px',
                padding: '5px',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            >
              {row.low}
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
                width: '100px',
                fontSize: '13px',
                padding: '5px',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            >
              {row.open}
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
                width: '100px',
                fontSize: '13px',
                padding: '5px',
                borderRight: 'none',
                borderBottom: 'none',
              }}
            >
              {row.close}
            </StyledTableCell>{' '}
          </>
        )}
      </StyledTableRow>

      <SymbolPropertiesDialog
        open={symbolProperties.value}
        onClose={symbolProperties.onFalse}
        row={row}
      />

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
