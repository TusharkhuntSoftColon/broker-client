/* eslint-disable no-else-return */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import Container from '@mui/material/Container';
import { Box, Table, TableBody, Typography, TableContainer } from '@mui/material';

import { useSocket } from 'src/hooks/use-socket';

import adminService from 'src/services/adminService';
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';

import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { useTable, TableNoData, TableHeadCustom } from 'src/components/table';

import UserTradeTableRow from '../User/user-trade-table-row';
import PersonDetailsViewLayout from './person-detials-view-layout';

// ----------------------------------------------------------------------

type Props = {
  currentUser: any;
};

const TABLE_HEAD = [
  { id: 'symbol', label: 'Symbol' },
  { id: 'type', label: 'Type' },
  { id: 'volume', label: 'Volume' },
  { is: 'price', label: 'Price' },
  { is: 'livePrice', label: 'Live Pice' },
  { is: 'profit', label: 'Profit' },
];

export default function PersonDetailsView({ currentUser }: Props) {
  const settings = useSettingsContext();
  const table = useTable();
  const role = useSelector((data: any) => data.auth.role);
  const exchangeData = useSelector((data: any) => data?.admin?.exchangeList);
  const [tableData1, setTableData1] = useState<any>([]);

  const { tableData, socketConnection } = useSocket('personDetails');

  const { enqueueSnackbar } = useSnackbar();

  const getBrokerageByRole = (role1: any) => {
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

  const { mutate: getUserPosition } = useMutation(getBrokerageByRole(role), {
    onSuccess: (data) => {
      setTableData1(data?.data?.rows);
      socketConnection(data?.data?.rows);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  useEffect(() => {
    getUserPosition(currentUser?._id);
  }, []);

  useEffect(() => {
    const updateLivePrice = async (socketData: any) => {
      const updatedPositions = tableData1?.map((position: any) => {
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
      setTableData1(updatedPositions);
    };
    updateLivePrice(tableData);
  }, [tableData]);

  const notFound = !tableData?.length;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <PersonDetailsViewLayout title="ID" name={currentUser?.name} />
        <PersonDetailsViewLayout
          title="Allowed Exchanges"
          name={currentUser?.exchangeList?.map((_el: any) => {
            const data = exchangeData?.filter((el: any) => el._id === _el.allowedExchange);
            return <Typography>{data[0]?.name}</Typography>;
          })}
        />
        <PersonDetailsViewLayout title="Leverage" name={currentUser?.leverageXY} />
        <PersonDetailsViewLayout
          title="Created At"
          name={new Date(currentUser?.createdAt).toDateString()}
        />
      </Box>
      <TableContainer sx={{ position: 'relative', overflow: 'unset', mt: 4 }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData?.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {tableData1?.length >= 0 &&
                tableData1?.map((row: any, index: any) => (
                  <UserTradeTableRow key={row._id} row={row} />
                ))}

              {/* <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered?.length)}
              /> */}

              <TableNoData notFound={notFound} sx={{ py: 10 }} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Container>
  );
}
