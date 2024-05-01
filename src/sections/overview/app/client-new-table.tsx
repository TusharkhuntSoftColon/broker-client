/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { newClientsOnlineTableData } from 'src/_mock';
import { useSocket } from 'src/context/SocketContext';

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
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const orders = accountData?.reduce((acc: any, user: any) => {
      return acc.concat(user.order);
    }, []);

    setAllOrders(orders);
  }, [accountData]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [updatedPositionsData, setUpdatedPositionsData] = useState([]);
  const [updatedOrdersData, setUpdatedOrdersData] = useState([]);
  const [updatedAccountData1, setUpdatedAccountData1] = useState([]);
  const { socket, connect, disconnect, subscribeToMarket, joinUserRoom, marketWatch } = useSocket();
  const [socketData, setSocketData] = useState<any>([]);

  console.log({ updatedAccountData1 });

  useEffect(() => {
    if (socket) {
      connect();
      const subscribingData =
        value === 1 ? positionsData : value === 3 ? ordersData : value === 0 ? allOrders : [];
      subscribeToMarket('client', subscribingData); // Subscribe to market when the component mounts
      joinUserRoom('client', subscribingData); // Join user room when the component mounts

      socket.on('disconnect', (reason: any) => {
        console.log('[socket] Disconnected:', reason);
      });

      socket.on('error', (error: any) => {
        console.log('[socket] Error:', error);
        // Handle error event
      });

      marketWatch(setSocketData);
    }

    return () => {
      if (socket) {
        disconnect(); // Call disconnect method when the component unmounts
      }
    };
  }, [socket, connect, disconnect, subscribeToMarket, joinUserRoom, ordersData, value]);

  useEffect(() => {
    const updateLivePrice = async (socketData1: any) => {
      const userTableData = value === 1 ? positionsData : value === 3 ? ordersData : [];
      const updatedPositions = userTableData?.map((position: any) => {
        const socketItem = socketData1?.find(
          (item: any) => item?.InstrumentIdentifier === position.scriptName
        );

        if (socketItem) {
          if (position.positionType === 'BUY') {
            return {
              ...position,
              livePrice: socketItem.BuyPrice,
              oldBuyPrice: socketItem?.oldBuyPrice,
              oldSellPrice: socketItem?.oldSellPrice,
              color: socketItem.BuyPrice > socketItem?.oldBuyPrice ? 'red' : 'blue',
            };
          } else if (position.positionType === 'SELL') {
            return {
              ...position,
              livePrice: socketItem.SellPrice,
              oldBuyPrice: socketItem?.oldBuyPrice,
              oldSellPrice: socketItem?.oldSellPrice,
              color: socketItem.BuyPrice < socketItem?.oldBuyPrice ? 'blue' : 'red',
            };
          }
        }
        return position;
      });
      if (updatedPositions !== undefined && value === 1) {
        setUpdatedPositionsData(updatedPositions);
      } else if (updatedPositions !== undefined && value === 3) {
        setUpdatedOrdersData(updatedPositions);
      }
    };
    updateLivePrice(socketData);
  }, [socketData]);

  const calculateTotalsAndProfit = (socketData1: any, accountData1: any) => {
    const updatedAccountData = accountData1?.map((user: any) => {
      let totalProfit = 0;
      const updatedOrders = user.order?.map((order: any) => {
        const socketItem = socketData1?.find(
          (item: any) => item?.InstrumentIdentifier === order?.scriptName
        );
        if (socketItem) {
          let profit = 0;
          if (order.positionType === 'BUY') {
            profit =
              (socketItem.BuyPrice - order.buyPrice) *
              order.tickValue *
              order.quantity *
              order.calculationValue;
          } else if (order.positionType === 'SELL') {
            profit =
              (order.sellPrice - socketItem.SellPrice) *
              order.tickValue *
              order.quantity *
              order.calculationValue;
          }
          totalProfit += profit; // Accumulating profit for each order
          return {
            ...order,
            profit,
          };
        }
        return order;
      });
      const equity = user.user_balance.balance + totalProfit + user.user_balance.PnL;
      return {
        ...user,
        order: updatedOrders,
        totalProfit: parseFloat(totalProfit.toFixed(2)),
        equity,
      };
    });
    return updatedAccountData;
  };
  useEffect(() => {
    const data = calculateTotalsAndProfit(socketData, accountData);
    setUpdatedAccountData1(data);
  }, [socketData, value, accountData]);

  const tabs = [
    {
      label: 'Accounts',
      value: 0,
      title: 'Accounts Table',
      tableDatas: updatedAccountData1,
      tableLabel: [
        {
          id: 'ID',
          label: 'Login',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'name',
          label: 'Name',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'leverage',
          label: 'Leverage',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'balance',
          label: 'Balance',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'credit',
          label: 'Credit',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'equity',
          label: 'Equity',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'margin',
          label: 'Margin',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'profit',
          label: 'Profit',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
      ],
    },
    {
      label: 'Positions',
      value: 1,
      title: 'Users',
      tableDatas: updatedPositionsData,
      tableLabel: [
        {
          id: 'login',
          label: 'Login',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'position',
          label: 'Position',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'symbol',
          label: 'Symbol',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'time',
          label: 'Time',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'type',
          label: 'Type',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'volume',
          label: 'Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
          width: '10px',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'price1',
          label: 'Price',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'livePrice',
          label: 'Current Price',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
      ],
    },

    {
      label: 'Online',
      value: 2,
      title: 'Online Table',
      tableDatas: newClientsOnlineTableData,
      tableLabel: [
        {
          id: 'login',
          label: 'Login',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'group',
          label: 'Group',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'name',
          label: 'Name',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'client',
          label: 'Client',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'version',
          label: 'Version',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'ip',
          label: 'IP',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'equity',
          label: 'Equity',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
      ],
    },
    {
      label: 'Orders',
      value: 3,
      title: 'Orders Table',
      tableDatas: updatedOrdersData,
      tableLabel: [
        {
          id: 'ID',
          label: 'Login',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'order',
          label: 'Order',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'symbol',
          label: 'Symbol',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'time',
          label: 'Time',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'type',
          label: 'Type',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'volume',
          label: 'Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'price1',
          label: 'Price',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
        },
        {
          id: 'livePrice',
          label: 'Current Price',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '5px',
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
      <Box sx={{ margin: '5px', border: '1px solid #d3d3d3' }}>
        <Box>
          {tabs.map((data) => {
            return (
              <CustomTabPanel
                key={data?.value}
                value={value}
                index={data.value}
                styles={{ overflow: 'hidden' }}
              >
                <CardHeader title={data.title} sx={{ padding: '12px !important' }} />
                <TableContainer sx={{ overflow: 'unset', height: '36.1vh' }}>
                  <Scrollbar>
                    <Table stickyHeader>
                      <TableHeadCustom
                        sx={{ fontSize: '13px !important', padding: '0px !important' }}
                        headLabel={data.tableLabel}
                      />

                      <TableBody key={data?.value}>
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
            height: '10px !important',
            minHeight: '30px !important',
          }}
        >
          {tabs.map((data: any) => {
            return (
              <Tab
                key={data?.value}
                label={data.label}
                {...a11yProps(data.value)}
                sx={{
                  width: '15%',
                  fontSize: '13px',
                  marginRight: '0px !important',
                  borderTop: value === data.value ? 'none' : '1px solid #d3d3d3',
                  borderLeft: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                  borderRight: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                  // borderBottom: value === data.value ? '1px solid #d3d3d3' : '1px solid #d3d3d3',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  minHeight: '30px !important',
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
  const router = useRouter();
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
  const PositionTime = new Date(row?.timeOpen).toDateString();

  return (
    <>
      {value === 0 && (
        <StyledTableRow onDoubleClick={() => router.push(paths.dashboard.person.edit(row?._id))}>
          <StyledTableCell
            sx={{ textAlign: 'left', fontSize: '13px', padding: '5px', borderLeft: 'none' }}
          >
            {row.ID}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', fontSize: '13px', padding: '5px' }}>
            {row.name}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', fontSize: '13px', padding: '5px' }}>
            {row?.leverageXY}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row?.user_balance?.balance}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row?.user_balance?.creditLimit}
          </StyledTableCell>
          <StyledTableCell
            sx={{ textAlign: 'right', fontSize: '13px', padding: '5px', borderRight: 'none' }}
          >
            {row.equity}
          </StyledTableCell>
          <StyledTableCell
            sx={{ textAlign: 'right', fontSize: '13px', padding: '5px', borderRight: 'none' }}
          >
            {row.margin}
          </StyledTableCell>
          <StyledTableCell
            sx={{ textAlign: 'right', fontSize: '13px', padding: '5px', borderRight: 'none' }}
          >
            {row?.totalProfit}
          </StyledTableCell>
        </StyledTableRow>
      )}
      {value === 1 && (
        <StyledTableRow
          onDoubleClick={() => router.push(paths.dashboard.person.edit(row?.userId?._id))}
          style={{ cursor: 'pointer' }}
        >
          <StyledTableCell
            sx={{ textAlign: 'left', fontSize: '13px', padding: '5px', borderLeft: 'none' }}
          >
            {row.userId?.ID}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', fontSize: '13px', padding: '5px' }}>
            {row.ticket}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', fontSize: '13px', padding: '5px' }}>
            {row.importMonthName}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', fontSize: '13px', padding: '5px' }}>
            {PositionTime}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.positionType}
          </StyledTableCell>
          <StyledTableCell
            sx={{ textAlign: 'right', fontSize: '13px', padding: '5px', width: '10px' }}
          >
            {row.quantity}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.positionType === 'BUY' ? row.buyPrice : row.sellPrice}
          </StyledTableCell>
          <StyledTableCell
            sx={{
              textAlign: 'right',
              fontSize: '13px',
              padding: '5px',
              color: row?.color,
            }}
          >
            {row?.livePrice}
          </StyledTableCell>
        </StyledTableRow>
      )}

      {value === 2 && (
        <StyledTableRow>
          <StyledTableCell
            sx={{ textAlign: 'left', fontSize: '13px', padding: '5px', borderLeft: 'none' }}
          >
            {row.login}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.group}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.name}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.client}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.version}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.ip}
          </StyledTableCell>
          <StyledTableCell
            sx={{ textAlign: 'right', fontSize: '13px', padding: '5px', borderRight: 'none' }}
          >
            {row.equity}
          </StyledTableCell>
        </StyledTableRow>
      )}

      {value === 3 && (
        <StyledTableRow>
          <StyledTableCell
            sx={{ textAlign: 'left', fontSize: '13px', padding: '5px', borderLeft: 'none' }}
          >
            {row?.userId?.ID}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.ticket}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.importMonthName}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row?.time && new Date(row?.time).toDateString()}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.positionType}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.quantity}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', fontSize: '13px', padding: '5px' }}>
            {row.positionType === 'BUY' ? row.buyPrice : row.sellPrice}
          </StyledTableCell>
          <StyledTableCell
            sx={{ textAlign: 'right', fontSize: '13px', padding: '5px', borderRight: 'none' }}
          >
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
