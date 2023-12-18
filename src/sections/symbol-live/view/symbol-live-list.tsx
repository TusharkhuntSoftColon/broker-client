import isEqual from 'lodash/isEqual';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, InputAdornment, TableBody, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { _mock, USER_STATUS_OPTIONS } from 'src/_mock';
import { _tradeList } from 'src/_mock/_trade';
import { deleteAdmin } from 'src/store/slices/admin';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { getComparator, TableHeadCustom, useTable } from 'src/components/table';

import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

import SymbolLiveTableRow from '../symbol-live-table-row';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

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
  exchange: [],
  dateRange: undefined,
};

// ----------------------------------------------------------------------

export default function xxSymbolLiveList() {
  const table = useTable();

  const dispatch = useDispatch();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  console.log({ _tradeList });

  // const symbolTableDashboard = useSelector((data: any) => data?.admin?.adminList);

  const symbolTableDashboard = [...Array(10)].map((_, index) => {
    const symbol = [
      'USDSDK',
      'USDWSF',
      'USDWIUF',
      'USDASD',
      'USDOKI',
      'USDNMJ',
      'USDDVC',
      'USDASE',
      'USDTGY',
      'USDLKO',
      'USDLKn',
      'USDSNK',
      'USDSTR',
      'USDSSR',
      'USDLMN',
    ][index];
    const bid = [123, 446, 533, 23234, 675, 3234, 8784, 8858, 485, 7, 5458, 5, 554, 548, 8, 5, 5][
      index
    ];

    const ask = [12324, 444, 6554, 7451, 14554, 5444, 6565, 65, 65, 6956, 65, 6, 95, 2, 5][index];
    const dailyChange = [
      '0.12%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
      '0.53%',
    ][index];

    return {
      id: _mock.id(index),
      symbol,
      bid,
      ask,
      dailyChange,
    };
  });

  console.log({ symbolTableDashboard });

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: symbolTableDashboard,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered?.length && canReset) || !dataFiltered?.length;

  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
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

  const handleDeleteRows = useCallback(() => {
    const deleteRows = symbolTableDashboard.filter((row: any) => !table.selected.includes(row.id));
    // setsymbolTableDashboard(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: symbolTableDashboard.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered?.length, dataInPage?.length, table, symbolTableDashboard]);

  const handleEditRow = useCallback(
    (id: string) => {
      console.log({ id });
      // router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      console.log({ id });
      // router.push(paths.dashboard.user.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

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
          // onChange={handleFilterName}
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
          // height: 'calc(100% - 40px)',
        }}
      >
        <TableContainer sx={{ position: 'relative', overflow: 'unset', height: '100%' }}>
          {/* <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={symbolTableDashboard?.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                symbolTableDashboard.map((row: any) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          /> */}

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={symbolTableDashboard?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    symbolTableDashboard.map((row: any) => row.id)
                  )
                }
              />

              <TableBody>
                {symbolTableDashboard.map((row: any, index: any) => (
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

                {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, symbolTableDashboard.length)}
                  /> */}

                {/* <TableNoData notFound={notFound} /> */}
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
    inputData = inputData.filter((user: any) => {
      console.log({ user });
      return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
  }

  if (status !== 'all') {
    inputData = inputData.filter((user: any) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user: any) => role.includes(user.role));
  }

  return inputData;
}
