/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { io } from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js';

import Card from '@mui/material/Card';
import { Box, Table, TextField, TableBody, InputAdornment, TableContainer } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deleteAdmin } from 'src/store/slices/admin';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useTable, getComparator, TableHeadCustom } from 'src/components/table';

import { IUserItem, IUserTableFilters } from 'src/types/user';

import SymbolLiveTableRow from '../symbol-live-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'symbol', label: 'Symbol', width: 100 },
  { id: 'bid', label: 'Bid', width: 90, align: 'right' },
  { id: 'ask', label: 'Ask', width: 90, align: 'right' },
  { id: 'dailyChange', label: 'Daily Change', width: 150, align: 'right' },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------
export default function xxSymbolLiveList() {
  const table = useTable();
  const [tableData, setTableData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [rows, setRow] = useState<any>([]);

  const dispatch = useDispatch();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const socketConnection = async () => {
    setIsLoading(true);
    try {
      const socket = io('ws://127.0.0.1:3111');

      socket.on('connect', () => {
        console.log('[socket] Connected');
        socket.emit('subscribeToServerMarket', [
          'GOLD-I',
          'NATURALGAS-I',
          'SILVER-I',
          'TATASTEEL',
          'HDFCBANK',
          'TCS',
          'SBIN',
          'WIPRO',
          'IRCTC',
        ]);
      });

      socket.emit('joinRoom', [
        'GOLD-I',
        'NATURALGAS-I',
        'SILVER-I',
        'TATASTEEL',
        'HDFCBANK',
        'TCS',
        'SBIN',
        'WIPRO',
        'IRCTC',
      ]);

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
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    socketConnection();
  }, []);

  useEffect(() => {
    const symbolTableDashboard = [];
    for (const data of tableData) {
      symbolTableDashboard.push({
        id: data.InstrumentIdentifier,
        symbol: data.InstrumentIdentifier,
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

  useEffect(() => {}, [rows]);

  const [filters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: rows,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      console.log('delete row works');
      dispatch(deleteAdmin(id));
      enqueueSnackbar('Deleted Successfully', { variant: 'success' });
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dispatch, enqueueSnackbar, table, dataInPage.length]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.person.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.person.details(id));
    },
    [router]
  );

  return (
    <>
      <Box sx={{ height: '42px', borderBottom: '4px solid #e0e3eb' }}>
        <TextField
          fullWidth
          autoComplete="off"
          name="symbol"
          value=""
          sx={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0px !important',
            '.MuiInputBase-input': { p: 1 },
            '.MuiInputBase-root': { borderRadius: '0px', height: '100%' },
          }}
          placeholder="Search symbol"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Card
        sx={{
          width: '100%',
          borderRadius: '0px',
          bgcolor: 'white',
        }}
      >
        <TableContainer sx={{ position: 'relative', overflow: 'unset', height: '100%' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={rows?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                // onSelectAllRows={(checked) =>
                //   table.onSelectAllRows(
                //     checked,
                //     rows.map((row: any) => row.id)
                //   )
                // }
              />

              <TableBody>
                {rows.map((row: any, index: any) => (
                  <SymbolLiveTableRow
                    key={row?.id}
                    row={row}
                    selected={table.selected.includes(row?.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IUserItem[] | any;
  comparator: (a: any, b: any) => number;
  filters: IUserTableFilters;
}) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData?.map((el: any, index: any) => [el, index] as const);

  stabilizedThis?.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el: any) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user: any) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user: any) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user: any) => role.includes(user.role));
  }

  return inputData;
}
