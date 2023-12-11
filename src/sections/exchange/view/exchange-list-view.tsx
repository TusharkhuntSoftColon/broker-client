import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { isWithinInterval, parse } from 'date-fns';
import isEqual from 'lodash/isEqual';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import exchangeService from 'src/services/exchangeService';

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
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';

import { IProductItem, IProductTableFilters, IProductTableFilterValue } from 'src/types/exchange';

import ExchangeQuickEditForm from '../exchange-edit-form';
import ExchangeTableRow from '../exchange-table-row';
import ProductTableFiltersResult from '../product-table-filters-result';
import ProductTableToolbar from '../product-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', width: 160 },
  { id: 'name', label: 'Name', width: 160 },
  { is: 'createdAt', label: 'Created At' },
  { is: 'updatedAt', label: 'Updated At' },
  { is: 'status', label: 'Status' },
  // { id: 'createdAt', label: 'Create at', width: 160 },
  // { id: 'inventoryType', label: 'Stock', width: 160 },
  // { id: 'price', label: 'Price', width: 140 },
  // { id: 'publish', label: 'Publish', width: 110 },
  { id: '', width: 88 },
];

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const defaultFilters: IProductTableFilters = {
  name: '',
  publish: [],
  stock: [],
  status: null,
  dateRange: [],
};

// ----------------------------------------------------------------------

export default function ExchangeListView() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const table = useTable();

  const quickEdit = useBoolean();

  const dispatch = useDispatch();

  const settings = useSettingsContext();

  const exchangeList = useSelector((data: any) => data?.exchange?.exchangeList);

  const [filters, setFilters] = useState(defaultFilters);

  // const { products, productsLoading, productsEmpty } = useGetProducts();

  const [tableData, setTableData] = useState([]);

  const confirm = useBoolean();

  // useEffect(() => {
  //   if (products.length) {
  //     setTableData(products);
  //   }
  // }, [products]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const canReset = !isEqual(defaultFilters, filters);

  // const notFound = (!dataFiltered.length && canReset) || productsEmpty;

  const handleFilters = useCallback(
    (name: string, value: IProductTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = (id: any) => {
    console.log(id);

    deleteTableRow(id);
    // dispatch(deleteExchange(id));
    // enqueueSnackbar('Deleted Successfully', { variant: 'success' });
    // table.onUpdatePageDeleteRow(dataInPage.length);
  };

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row: any) => !table.selected.includes(row.id));
    // setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.exchange.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.exchange.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // get exchange list
  const { mutate } = useMutation(exchangeService.getExchangeList, {
    onSuccess: (data) => {
      setTableData(data?.data?.rows);
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  //delete row API
  const { mutate: deleteTableRow } = useMutation(exchangeService.deleteExchange, {
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

  // const { mutate: deleteExchange } = useMutation(exchangeService.deleteExchange, {
  //   onSuccess: (data) => {
  //     enqueueSnackbar(data?.message, { variant: 'success' });
  //     mutate();
  //   },
  //   onError: (error) => {
  //     if (isAxiosError(error)) {
  //       enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
  //     }
  //   },
  // });

  useEffect(() => {
    mutate();
  }, []);
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Admstr', href: paths.dashboard.root },
            {
              name: 'Exchange',
              href: paths.dashboard.exchange.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              // component={RouterLink}
              onClick={quickEdit.onTrue}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Exchange
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            stockOptions={PRODUCT_STOCK_OPTIONS}
            publishOptions={PUBLISH_OPTIONS}
          />

          {canReset && (
            <ProductTableFiltersResult
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
                      <ExchangeTableRow
                        key={row?._id}
                        row={row}
                        selected={table.selected.includes(row?._id)}
                        onSelectRow={() => table.onSelectRow(row?._id)}
                        onDeleteRow={() => handleDeleteRow(row?._id)}
                        onEditRow={() => handleEditRow(row?._id)}
                        onViewRow={() => handleViewRow(row?._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  {/* <TableNoData notFound={notFound} /> */}
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

      <ExchangeQuickEditForm
        getFunction={() => mutate()}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />

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
}: {
  inputData: IProductItem | any;
  comparator: (a: any, b: any) => number;
  filters: IProductTableFilters;
}) {
  const { name, stock, publish, status, dateRange } = filters;

  const stabilizedThis = inputData.map((el: any, index: any) => [el, index] as const);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (product: any) => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (stock.length) {
    inputData = inputData.filter((product: any) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product: any) => publish.includes(product.publish));
  }

  if (status) {
    inputData = inputData.filter((_el: any) => status.value === _el?.isActive);
  }

  if (dateRange.length > 0) {
    inputData = inputData.filter((item: any) => {
      const createdAtDate = parse(item.createdAt, 'EEE MMM dd yyyy', new Date());
      return isWithinInterval(createdAtDate, { start: dateRange[0], end: dateRange[1] });
    });
  }

  return inputData;
}
