/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { io } from 'socket.io-client';
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';

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

import useAuth from 'src/hooks/useAuth';

import { SOCKET_URL } from 'src/utils/environments';

import { newClientsOnlineTableData } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

type RowProps = {
  id: any;
  login: number;
  position: number;
  symbol: string;
  price1: number;
  price2: number;
  reason: string;
  swap: number;
  name: number;
  group: string;
  balance: number;
  credit: number;
  client: string;
  version: number;
  ip: string;
  equity: number;
  order: number;
  time: string;
  type: string;
  volume: string;
  sl: any;
  tp: any;
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

export default function ClientTableDashboard({
  accountData,
  ordersData,
  positionsData,
}: {
  accountData: any;
  ordersData: any;
  positionsData: any;
}) {
  const [value, setValue] = useState(0);
  const [tableData, setTableData] = useState<any>([]);
  const { token } = useAuth();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [updatedPositionsData, setUpdatedPositionsData] = useState([]);
  const [updatedOrdersData, setUpdatedOrdersData] = useState([]);

  useEffect(() => {
    const subscribingData = value === 0 ? positionsData : value === 3 ? ordersData : [];
    socketConnection(subscribingData);
  }, [positionsData, ordersData, tableData]);

  useEffect(() => {
    const updateLivePrice = async (socketData: any) => {
      const userTableData = value === 0 ? positionsData : value === 3 ? ordersData : [];
      const updatedPositions = userTableData?.map((position: any) => {
        const socketItem = socketData?.find(
          (item: any) => item.InstrumentIdentifier === position.scriptName
        );
        if (socketItem) {
          if (position.positionType === 'BUY') {
            return { ...position, livePrice: socketItem.SellPrice };
          } else if (position.positionType === 'SELL') {
            return { ...position, livePrice: socketItem.BuyPrice };
          }
        }
        return position;
      });
      if (updatedPositions !== undefined && value === 0) {
        setUpdatedPositionsData(updatedPositions);
      } else if (updatedPositions !== undefined && value === 3) {
        setUpdatedOrdersData(updatedPositions);
      }
    };
    updateLivePrice(tableData);
  }, [tableData, value]);

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

      const Symbols = activeSymbols.map((symbol: any) => symbol?.scriptName);
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
              data1?.InstrumentIdentifier &&
              data?.InstrumentIdentifier &&
              data1?.InstrumentIdentifier === data?.InstrumentIdentifier
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

  console.log({ updatedPositionsData, positionsData });

  const tabs = [
    {
      label: 'Positions',
      value: 0,
      title: 'Users',
      tableDatas: tableData.length > 0 ? updatedPositionsData : positionsData,
      tableLabel: [
        { id: 'login', label: 'Login', align: 'left', border: '1px solid #dddddd !important' },
        {
          id: 'position',
          label: 'Position',
          align: 'left',
          border: '1px solid #dddddd !important',
        },
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'type', label: 'Type', align: 'right', border: '1px solid #dddddd !important' },
        {
          id: 'volume',
          label: 'Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
          width: '10px',
        },
        { id: 'price1', label: 'Price', align: 'right', border: '1px solid #dddddd !important' },
        {
          id: 'livePrice',
          label: 'Current Price',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
      ],
    },
    {
      label: 'Accounts',
      value: 1,
      title: 'Accounts Table',
      tableDatas: accountData,
      tableLabel: [
        { id: 'ID', label: 'Login', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'name', label: 'Name', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'balance', label: 'Balance', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'credit', label: 'Credit', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'equity', label: 'Equity', align: 'right', border: '1px solid #dddddd !important' },
      ],
    },
    {
      label: 'Online',
      value: 2,
      title: 'Online Table',
      tableDatas: newClientsOnlineTableData,
      tableLabel: [
        { id: 'login', label: 'Login', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'group', label: 'Group', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'name', label: 'Name', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'client', label: 'Client', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'version', label: 'Version', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'ip', label: 'IP', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'equity', label: 'Equity', align: 'right', border: '1px solid #dddddd !important' },
      ],
    },
    {
      label: 'Orders',
      value: 3,
      title: 'Orders Table',
      tableDatas: tableData.length > 0 ? updatedOrdersData : ordersData,
      tableLabel: [
        { id: 'ID', label: 'Login', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'order', label: 'Order', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'symbol', label: 'Symbol', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'time', label: 'Time', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'type', label: 'Type', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'volume', label: 'Volume', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'price1', label: 'Price', align: 'right', border: '1px solid #dddddd !important' },
        {
          id: 'livePrice',
          label: 'Current Price',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
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
      {/* <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
        View All
        </Button>
      </Box> */}

      <Box sx={{ margin: '5px', border: '1px solid #d3d3d3' }}>
        <Box>
          {tabs.map((data) => {
            return (
              <CustomTabPanel value={value} index={data.value} styles={{ overflow: 'hidden' }}>
                <CardHeader title={data.title} sx={{ mb: 4, mt: -1 }} />
                <TableContainer sx={{ overflow: 'unset', height: '400px' }}>
                  <Scrollbar>
                    <Table stickyHeader>
                      <TableHeadCustom headLabel={data.tableLabel} />

                      <TableBody>
                        {data.tableDatas?.map((row: any) => (
                          <ClientNewRow key={row.id} row={row} value={value} />
                        ))}
                        {data?.tableDatas?.length === 0 && (
                          <TableNoData notFound={data?.tableDatas?.length === 0} />
                        )}
                      </TableBody>
                    </Table>
                  </Scrollbar>
                </TableContainer>
              </CustomTabPanel>
            );
          })}
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
          {tabs.map((data: any) => {
            return (
              <Tab
                label={data.label}
                {...a11yProps(data.value)}
                sx={{
                  width: '15%',
                  marginRight: '0px !important',
                  borderTop: value === data.value ? 'none' : '1px solid #d3d3d3',
                  borderLeft: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                  borderRight: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                  // borderBottom: value === data.value ? '1px solid #d3d3d3' : '1px solid #d3d3d3',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
            );
          })}
        </Tabs>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ClientNewRowProps = {
  row: RowProps | any;
  value?: any;
};

function ClientNewRow({ row, value }: ClientNewRowProps) {
  const popover = usePopover();

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
      {value === 0 && (
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderLeft: 'none' }}>
            {row.userId?.ID}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px' }}>{row.ticket}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px' }}>
            {row.importMonthName}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.positionType}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px', width: '10px' }}>
            {row.quantity}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.positionType === 'BUY' ? row.buyPrice : row.sellPrice}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row?.livePrice}
          </StyledTableCell>
        </StyledTableRow>
      )}

      {value === 1 && (
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderLeft: 'none' }}>
            {row.ID}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px' }}>{row.name}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.balance}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.credit}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px', borderRight: 'none' }}>
            {row.equity}
          </StyledTableCell>
        </StyledTableRow>
      )}

      {value === 2 && (
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderLeft: 'none' }}>
            {row.login}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>{row.group}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>{row.name}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.client}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.version}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>{row.ip}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px', borderRight: 'none' }}>
            {row.equity}
          </StyledTableCell>
        </StyledTableRow>
      )}

      {value === 3 && (
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderLeft: 'none' }}>
            {row?.userId?.ID}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.ticket}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.importMonthName}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>{row.time}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.positionType}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.quantity}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.positionType === 'BUY' ? row.buyPrice : row.sellPrice}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px', borderRight: 'none' }}>
            {row.livePrice}
          </StyledTableCell>
        </StyledTableRow>
      )}

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
