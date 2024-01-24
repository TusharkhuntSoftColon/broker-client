import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import { Box, TableBody } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleteAdmin } from 'src/store/slices/admin';
import { newClientsTableData } from 'src/_mock/_trade';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import {
  useTable,
  getComparator,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';

import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

import TradeTableRow from '../trade-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'symbol', label: 'Symbol' },
  { id: 'ticket', label: 'Ticket' },
  { id: 'time', label: 'Time' },
  { id: 'type', label: 'Type' },
  { id: 'volume', label: 'Volume' },
  { id: 'price1', label: 'Price', width: 180 },
  { id: 'sl', label: 'S / L', width: 180 },
  { id: 'tp', label: 'T / P', width: 180 },
  { id: 'price2', label: 'Price', width: 180 },
  { id: 'swap', label: 'Swap' },
  { id: 'profit', label: 'Profit' },
  { id: 'comment', label: 'Comment' },
  { id: '', width: 88 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  role: [],
  status: 'all',
  exchange: [],
  dateRange: undefined,
};

// ----------------------------------------------------------------------

export default function TradeHistory() {
  const table = useTable();

  const dispatch = useDispatch();

  const confirm = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: newClientsTableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

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
      dispatch(deleteAdmin(id));
      enqueueSnackbar('Deleted Successfully', { variant: 'success' });
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dispatch, enqueueSnackbar, table, dataInPage.length]
  );

  const handleEditRow = useCallback((id: string) => {
    // router.push(paths.dashboard.user.edit(id));
  }, []);

  const handleViewRow = useCallback((id: string) => {
    // router.push(paths.dashboard.user.details(id));
  }, []);

  return (
    <Box display="flex" height="100%">
      <Box sx={{ width: '58px', borderRight: '4px solid #e0e3eb' }} />
      <Card
        sx={{
          width: '100%',
          borderTop: '2px solid #e0e3eb',
          borderRadius: '0px',
          bgcolor: 'white',
        }}
      >
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={newClientsTableData?.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                newClientsTableData.map((row: any) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={newClientsTableData?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}

                // onSelectAllRows={(checked) =>
                //   table.onSelectAllRows(
                //     checked,
                //     newClientsTableData.map((row: any) => row.id)
                //   )
                // }
              />

              <TableBody>
                {newClientsTableData.map((row: any) => (
                  <TradeTableRow
                    key={row?.id}
                    row={row}
                    selected={table.selected.includes(row?.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                  />
                ))}
              </TableBody>
            </Table>
            <Box sx={{ bgcolor: '#f0f5f9', px: '14px', py: 1, fontSize: 12 }}>
              Balance: 90.456 Equity: 90.654 Margin: 100.0 Free Margin: 90 745.57 Level: 90 847.07%
            </Box>
          </Scrollbar>
        </TableContainer>
      </Card>
    </Box>
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
