/* eslint-disable react-hooks/exhaustive-deps */
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import Container from '@mui/material/Container';
import { Box, Table, TableBody, Typography, TableContainer } from '@mui/material';

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
  const [tableData1, setTableData1] = useState();

  console.log({ tableData1 });

  const { enqueueSnackbar } = useSnackbar();

  console.log({ exchangeData });

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
      // dispatch(addBrokerage(data?.data?.rows));
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

  const dummyData = [
    { symbolName: 'Gold', type: 'sell', volume: 5, price: 3000, livePrice: 1000, profit: 2000 },
    { symbolName: 'Silver', type: 'buy', volume: 5, price: 3000, livePrice: 2000, profit: -1000 },
    { symbolName: 'TATA', type: 'sell', volume: 5, price: 3000, livePrice: 1000, profit: 2000 },
  ];
  const [tableData] = useState(dummyData);

  const notFound = !tableData?.length;

  console.log({ currentUser });

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
              {tableData.map((row: any, index: any) => (
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
