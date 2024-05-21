/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import Container from '@mui/material/Container';
import { Box, Card, Table, TableBody, Typography, TableContainer } from '@mui/material';

import useAuth from 'src/hooks/useAuth';
import { useBoolean } from 'src/hooks/use-boolean';

import adminService from 'src/services/adminService';
import { useSocket } from 'src/context/SocketContext';
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { useTable, TableNoData, TableHeadCustom } from 'src/components/table';

import PendingPostionModalComponent from 'src/sections/overview/Dialog/PendingPositionModal';

import UserTradeTableRow from '../User/user-trade-table-row';
import PersonDetailsViewLayout from './person-detials-view-layout';
import UserPendingPostionTableRow from '../User/UserFinantials/user-pending-position-row';

// ----------------------------------------------------------------------

type Props = {
  currentUser: any;
};

const TABLE_HEAD = [
  { id: 'symbol', label: 'Symbol' },
  { id: 'type', label: 'Type' },
  { id: 'volume', label: 'Volume' },
  { is: 'price', label: 'Price' },
  { is: 'livePrice', label: 'Live Price' },
  { is: 'profit', label: 'Profit' },
  { is: 'Close Position', label: 'Close Position' },
];

const PENDING_POSTION_TABLE_HEAD = [
  { id: 'symbol', label: 'Symbol' },
  { id: 'type', label: 'Type' },
  { id: 'volume', label: 'Volume' },
  { is: 'price', label: 'Price' },
  { is: 'livePrice', label: 'Live Price' },
  { is: 'Close Position', label: 'Close Position' },

  // { is: 'Close Position', label: 'Close Position' },
  // { is: 'Update Position', label: 'Update Position' },
];

export default function PersonDetailsView({ currentUser }: Props) {
  const settings = useSettingsContext();
  const table = useTable();

  // pending states and modal functions
  const PendingPostionModal = useBoolean();
  const [selectedPendingOrder, setSelectedPendingOrder] = useState<any>();

  const { role } = useAuth();
  const exchangeData = useSelector((data: any) => data?.admin?.exchangeList);

  const [tableData1, setTableData1] = useState<any>([]);
  const [pendingOrderTableData1, setPendingOrderTableData1] = useState<any>([]);
  const [userBalance, setUserBalance] = useState<any>({});
  const [socketData, setSocketData] = useState<any>([]);

  const { socket, connect, disconnect, subscribeToMarket, joinUserRoom, marketWatch } = useSocket();

  useEffect(() => {
    if (socket) {
      connect();
      subscribeToMarket('personDetails', tableData1); // Subscribe to market when the component mounts
      subscribeToMarket('personDetails', pendingOrderTableData1); // Subscribe to market when the component mounts
      joinUserRoom('personDetails', tableData1); // Join user room when the component mounts

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
  }, [socket, connect, disconnect, subscribeToMarket, joinUserRoom, tableData1]);

  const { enqueueSnackbar } = useSnackbar();

  const getUsersBetPositionByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return adminService.getUserBetPositions;
      case 'SUPER_MASTER':
        return superMasterService.getUserBetPositions;
      case 'MASTER':
        return masterService.getUserBetPositions;
      default:
        return masterService.getUserBetPositions;
    }
  };

  const getUserBalanceByRole = (role2: any) => {
    switch (role2) {
      case 'ADMIN':
        return adminService.getUserBalance;
      case 'SUPER_MASTER':
        return superMasterService.getUserBalance;
      case 'MASTER':
        return masterService.getUserBalance;
      default:
        return masterService.getUserBalance;
    }
  };

  const getUsersPendingPositionByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return adminService.getUserPendingPostionByAdmin;
      case 'SUPER_MASTER':
        return superMasterService.getUserPendingPostionBySuperMaster;
      case 'MASTER':
        return masterService.getUserPendingPostionByMaster;
      default:
        return masterService.getUserPendingPostionByMaster;
    }
  };
  const closeOpenPositionByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return adminService.closeOpenPostionByAdmin;
      case 'SUPER_MASTER':
        return superMasterService.closeOpenPostionBySuperMaster;
      case 'MASTER':
        return masterService.closeOpenPostionByMaster;
      default:
        return masterService.closeOpenPostionByMaster;
    }
  };

  const { mutate: getUserPosition } = useMutation(getUsersBetPositionByRole(role), {
    onSuccess: (data) => {
      setTableData1(data?.data?.rows);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  const { mutate: getUserPendingPostion } = useMutation(getUsersPendingPositionByRole(role), {
    onSuccess: (data) => {
      setPendingOrderTableData1(data?.data?.rows);
    },
    onError: (error: any) => {
      // if (isAxiosError(error)) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      // }
      // enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });
  const { mutate: getUserBalance } = useMutation(getUserBalanceByRole(role), {
    onSuccess: (data) => {
      setUserBalance(data?.data);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  const { mutate: closePosition } = useMutation(closeOpenPositionByRole(role), {
    onSuccess: (data) => {
      getUserPosition(currentUser?._id);
    },
    onError: (error: any) => {
      // if (isAxiosError(error)) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      // }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  useEffect(() => {
    getUserPosition(currentUser?._id);
    getUserBalance(currentUser?._id);
    getUserPendingPostion(currentUser?._id);
  }, []);

  const calculateTotals = () => {
    let totalProfit = 0;
    tableData1.forEach((item: any) => {
      totalProfit += parseFloat(item.profit);
    });
    totalProfit = parseFloat(totalProfit?.toFixed(2));
    return {
      totalProfit,
    };
  };

  const totals = calculateTotals();

  // for open position
  useEffect(() => {
    const updateLivePrice = async (socketData1: any) => {
      const updatedPositions = tableData1?.map((position: any) => {
        const socketItem = socketData1?.find(
          (item: any) => item.InstrumentIdentifier === position.scriptName
        );
        if (socketItem) {
          if (position.positionType === 'BUY') {
            return {
              ...position,
              livePrice: socketItem.BuyPrice,
              profit:
                (socketItem.BuyPrice - position?.buyPrice) *
                position?.tickValue *
                position?.quantity *
                position?.calculationValue,
            };
          } else if (position.positionType === 'SELL') {
            return {
              ...position,
              livePrice: socketItem.SellPrice,
              profit:
                (position?.sellPrice - socketItem.SellPrice) *
                position?.tickValue *
                position?.quantity *
                position?.calculationValue,
            };
          }
        }
        return position;
      });
      setTableData1(updatedPositions);
    };
    updateLivePrice(socketData);
  }, [socketData]);

  // for pending postion
  useEffect(() => {
    const updateLivePrice = async (socketData1: any) => {
      const updatedPositions = pendingOrderTableData1?.map((position: any) => {
        const socketItem = socketData1?.find(
          (item: any) => item.InstrumentIdentifier === position.scriptName
        );
        if (socketItem) {
          if (position.positionType === 'BUY') {
            return {
              ...position,
              livePrice: socketItem.BuyPrice,
              profit:
                (socketItem.BuyPrice - position?.buyPrice) *
                position?.tickValue *
                position?.quantity *
                position?.calculationValue,
            };
          } else if (position.positionType === 'SELL') {
            return {
              ...position,
              livePrice: socketItem.SellPrice,
              profit:
                (position?.sellPrice - socketItem.SellPrice) *
                position?.tickValue *
                position?.quantity *
                position?.calculationValue,
            };
          }
        }
        return position;
      });
      setPendingOrderTableData1(updatedPositions);
    };
    updateLivePrice(socketData);
  }, [socketData]);

  const notFound = !tableData1?.length;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <PersonDetailsViewLayout title="ID" name={`${currentUser?.ID} ( ${currentUser?.name} )`} />
        <PersonDetailsViewLayout
          title="Allowed Exchanges"
          name={currentUser?.exchangeList?.map((_el: any) => {
            const data = exchangeData?.filter((el: any) => el._id === _el.allowedExchange);
            return (
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Label variant="soft" color="default">
                  {data[0]?.name} * {_el?.exchangeGroup}
                </Label>
              </Box>
            );
          })}
        />
        <PersonDetailsViewLayout title="Leverage" name={currentUser?.leverageXY} />
        <PersonDetailsViewLayout
          title="Created At"
          name={new Date(currentUser?.createdAt).toDateString()}
        />
      </Box>
      {currentUser?.role === 'USER' && (
        <>
          <Typography sx={{ fontSize: '18px', fontWeight: '600', pt: '1rem' }}>
            Open Positions
          </Typography>
          <Card sx={{ mt: 2 }}>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    // rowCount={tableData?.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                  />

                  <TableBody>
                    {tableData1?.length >= 0 &&
                      tableData1?.map((row: any, index: any) => (
                        <UserTradeTableRow closePosition={closePosition} key={row._id} row={row} />
                      ))}

                    <TableNoData notFound={notFound} sx={{ py: 1 }} />
                  </TableBody>
                </Table>
                <Box sx={{ backgroundColor: 'lightgrey', padding: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography
                        sx={{ fontWeight: 'bold', fontSize: '13px' }}
                      >{`Balance : ${userBalance?.UserBalance}`}</Typography>
                      <Typography
                        sx={{ fontWeight: 'bold', fontSize: '13px' }}
                      >{`Credit : ${userBalance?.UserCreditLimit}`}</Typography>
                      <Typography
                        sx={{ fontWeight: 'bold', fontSize: '13px' }}
                      >{`Equity : ${userBalance?.UserPnl + totals?.totalProfit + userBalance?.UserBalance}`}</Typography>
                      <Typography
                        sx={{ fontWeight: 'bold', fontSize: '13px' }}
                      >{`Margin : ${userBalance?.UserMargin?.toFixed(2)}`}</Typography>
                      <Typography
                        sx={{ fontWeight: 'bold', fontSize: '13px' }}
                      >{`Free Margin : ${(userBalance?.UserPnl + totals?.totalProfit + userBalance?.UserBalance - userBalance?.UserMargin)?.toFixed(2)}`}</Typography>
                      <Typography
                        sx={{ fontWeight: 'bold', fontSize: '13px' }}
                      >{`Margin Level : ${(((userBalance?.UserPnl + totals?.totalProfit + userBalance?.UserBalance) / userBalance?.UserMargin) * 100)?.toFixed(2)}%`}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '13px', marginRight: 10 }}>
                        {`Total Profit : ${totals?.totalProfit?.toFixed(2)}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Scrollbar>
            </TableContainer>
          </Card>
        </>
      )}
      {pendingOrderTableData1?.length !== 0 && currentUser?.role === 'USER' && (
        <>
          <Typography sx={{ fontSize: '18px', fontWeight: '600', pt: '1rem' }}>
            Pending Orders
          </Typography>
          <Card sx={{ mt: 2 }}>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={PENDING_POSTION_TABLE_HEAD}
                    // rowCount={tableData?.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                  />

                  <TableBody>
                    {pendingOrderTableData1?.length >= 0 &&
                      pendingOrderTableData1?.map((row: any, index: any) => (
                        <UserPendingPostionTableRow
                          key={row._id}
                          currentUser={currentUser}
                          getUserPendingPostionAPI={getUserPendingPostion}
                          openModel={PendingPostionModal.onTrue}
                          setSelectedPendingOrder={setSelectedPendingOrder}
                          row={row}
                        />
                      ))}

                    <TableNoData notFound={notFound} sx={{ py: 1 }} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Card>
        </>
      )}

      <PendingPostionModalComponent
        row={selectedPendingOrder}
        currentUser={currentUser}
        getUserPendingPostion={getUserPendingPostion}
        socketData={socketData}
        open={PendingPostionModal.value}
        onClose={PendingPostionModal.onFalse}
      />
    </Container>
  );
}
