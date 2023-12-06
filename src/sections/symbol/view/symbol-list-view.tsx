import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';

import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { fTimestamp } from 'src/utils/format-time';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';

import { ISymbolTableFilters, ISymbolTableFilterValue } from 'src/types/symbol';

import SymbolTableFiltersResult from '../symbol-table-filters-result';
import SymbolTableRow from '../symbol-table-row';
import SymbolTableToolbar from '../symbol-table-toolbar';

import { useDispatch } from 'react-redux';
import symbolService from 'src/services/symbolService';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'currency', label: 'Currency' },
  {
    id: 'contractSize',
    label: 'Contract Size',
  },

  { id: 'tickSize', label: 'Tick Size' },
  {
    id: 'tickValue',
    label: 'Tick Value',
  },
  { is: 'status', label: 'Status' },

  { id: '', width: 88 },
];

const defaultFilters: ISymbolTableFilters = {
  name: '',
  currency: null,
  status: null,
  startDate: null,
  endDate: null,
  tickSize: null,
};

// ----------------------------------------------------------------------

export default function SymbolListView() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const { enqueueSnackbar } = useSnackbar();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const dispatch = useDispatch();

  // const symbolData = useSelector((data: any) => data?.symbol?.symbolList);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset =
    !!filters.name ||
    filters.currency !== null ||
    filters.status !== null ||
    filters.tickSize !== null ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: ISymbolTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  // delete row API
  const { mutate: deleteTableRow } = useMutation(symbolService.deleteSymbol, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      mutate();
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const handleDeleteRow = (id: any) => {
    console.log({ id });
    // dispatch(deleteSymbol(id));
    deleteTableRow(id);
  };

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row: any) => !table.selected.includes(row.id));

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.symbol.details(id));
    },
    [router]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.symbol.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  // list view page API
  const { mutate } = useMutation(symbolService.getSymbolList, {
    onSuccess: (data) => {
      setTableData(data?.data?.rows);
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });
  useEffect(() => {
    mutate();
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            {
              name: 'Admstr',
              href: paths.dashboard.root,
            },
            {
              name: 'Symbol',
              href: paths.dashboard.symbol.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.symbol.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Symbol
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          {/* <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'completed' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'cancelled' && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && _orders.length}
                    {tab.value === 'completed' &&
                      _orders.filter((order) => order.status === 'completed').length}

                    {tab.value === 'pending' &&
                      _orders.filter((order) => order.status === 'pending').length}
                    {tab.value === 'cancelled' &&
                      _orders.filter((order) => order.status === 'cancelled').length}
                    {tab.value === 'refunded' &&
                      _orders.filter((order) => order.status === 'refunded').length}
                  </Label>
                }
              />
            ))}
          </Tabs> */}

          <SymbolTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            canReset={canReset}
            onResetFilters={handleResetFilters}
          />

          {canReset && (
            <SymbolTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row: any) => row.id)
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
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any) => (
                      <SymbolTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onEditRow={() => handleEditRow(row._id)}
                        onViewRow={() => handleViewRow(row._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: any;
  comparator: (a: any, b: any) => number;
  filters: ISymbolTableFilters;
  dateError: boolean;
}) {
  const { currency, name, startDate, endDate, status, tickSize } = filters;

  const stabilizedThis = inputData.map((el: any, index: any) => [el, index] as const);

  stabilizedThis.sort((a: any, b: any) => {
    const symbol = comparator(a[0], b[0]);
    if (symbol !== 0) return symbol;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any) => el[0]);

  if (name) {
    inputData = inputData.filter((symbol: any) => {
      return (
        symbol.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
        // symbol.currency.toLowerCase().indexOf(name.toLowerCase()) !== -1
        // order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
      );
    });
  }

  if (currency !== null) {
    inputData = inputData.filter(
      (symbol: any) =>
        symbol.currency.label.toLowerCase().trim() === currency.label.toLowerCase().trim()
    );
  }

  if (status !== null) {
    inputData = inputData.filter((user: any) => {
      return user?.isActiveSymbol === status?.value;
    });
  }

  if (tickSize !== null) {
    inputData = inputData.filter((data: any) => {
      return data.tickSize > tickSize.value[0] && data.tickSize < tickSize.value[1];
    });
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (symbol: any) =>
          fTimestamp(symbol.createdAt) >= fTimestamp(startDate) &&
          fTimestamp(symbol.createdAt) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
