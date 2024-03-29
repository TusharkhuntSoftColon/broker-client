/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { isAxiosError } from 'axios';
import isEqual from 'lodash/isEqual';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { ClientList } from 'src/_mock';
import adminService from 'src/services/adminService';
import { addBrokerage } from 'src/store/slices/admin';
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';

import { RHFAutocomplete } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import { useRouter } from '../../../routes/hooks';
import Scrollbar from '../../../components/scrollbar';
import BrokerageTableRow from '../brokerage-table-row';
import { useBoolean } from '../../../hooks/use-boolean';
import BrokerageQuickEditForm from '../brokerage-edit-form';
import BrokerageTableToolbar from '../brokerage-table-toolbar';
import { ConfirmDialog } from '../../../components/custom-dialog';
import { useSettingsContext } from '../../../components/settings';
import BrokerageTableFiltersResult from '../brokerage-table-filters-result';
import {
  IProductItem,
  IProductTableFilters,
  IProductTableFilterValue,
} from '../../../types/exchange';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';

const TABLE_HEAD = [
  { id: 'template', label: 'Template', width: 160 },
  { id: 'date', label: 'Date', width: 160 },
  { id: 'exchangeCode', label: 'Exchange Code', width: 160 },
  { is: 'symbol', label: 'Symbol' },
  { is: 'brokerage_call_option', label: 'BCO' },
  { is: 'brokerage_call_method', label: 'BCM' },
  { is: 'brokerage_rate', label: 'BRKG Rate' },
  { is: 'brokerage_per', label: 'BRKG Per' },
  { id: '', width: 88 },
];

const defaultFilters: IProductTableFilters = {
  name: '',
  publish: [],
  stock: [],
  status: null,
  dateRange: [],
};

// ----------------------------------------------------------------------

export default function BrokerageListView({ currentUser, fields }: any) {
  const table = useTable();
  const quickEdit = useBoolean();
  const dispatch = useDispatch();
  const settings = useSettingsContext();
  const router = useRouter();
  const role = useSelector((data: any) => data.auth.role);

  const [filters, setFilters] = useState(defaultFilters);
  const [currentBrokerage, setCurrentBrokerage] = useState<any>();

  const [tableData, setTableData] = useState([]);

  const exchangeList = useSelector((data: any) => data?.exchange?.exchangeList);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentUser) {
      getAllBrokerages(currentUser?._id);
    } else {
      getAllBrokerages('d');
    }
  }, []);

  const confirm = useBoolean();
  const defaultValues = {
    template: ClientList.find((item) => item.label === 'Template 1') || null,
  };
  const methods = useForm<any>({
    defaultValues,
  });

  const { watch } = methods;

  const value: any = watch();

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    value,
  });

  const denseHeight = table.dense ? 60 : 80;
  const canReset = !isEqual(defaultFilters, filters);

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

  const handleDeleteRow = (data: any) => {
    const filteredData = tableData.filter(
      (item: any) =>
        !(
          item.exchangeId === data.exchangeId &&
          item.symbol === data.symbol &&
          item.template === data.template
        )
    );
    setTableData(filteredData);
  };

  const handleDeleteRows = useCallback(() => {
    // const deleteRows = table.selected;
    // deleteBrokerage(deleteRows);
  }, [table]);

  const handleEditRow = (data: any) => {
    const SelectedBrokerage = tableData.find(
      (obj: any) =>
        obj.exchangeId === data.exchangeId &&
        obj.symbol === data.symbol &&
        obj.template === data.template
    );

    setCurrentBrokerage(SelectedBrokerage);
  };

  const handleViewRow = useCallback((id: string) => {}, [router]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const getBrokerageByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return currentUser
          ? adminService.getBrokerageListForUserUpdate
          : adminService.getBrokerageList;
      case 'SUPER_MASTER':
        return currentUser
          ? superMasterService.getBrokerageListForUserUpdate
          : superMasterService.getBrokerageList;
      case 'MASTER':
        return currentUser
          ? masterService.getBrokerageListForUserUpdate
          : masterService.getBrokerageList;
      default:
        return currentUser
          ? masterService.getBrokerageListForUserUpdate
          : masterService.getBrokerageList;
    }
  };

  const { mutate: getAllBrokerages } = useMutation(getBrokerageByRole(role), {
    onSuccess: (data) => {
      setTableData(data?.data?.rows);
      dispatch(addBrokerage(data?.data?.rows));
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Card>
          <BrokerageTableToolbar
            mutate={getAllBrokerages}
            currentUser={currentUser}
            currentBrokerage={currentBrokerage}
            setCurrentBrokerage={setCurrentBrokerage}
            fields={fields}
            tableData={tableData}
            setTableData={setTableData}
          />
          <FormProvider methods={methods}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                p: 2,
              }}
            >
              <RHFAutocomplete
                name="template"
                label="Template"
                id="template"
                sx={{
                  width: '100%',
                }}
                options={ClientList}
                isLabled={false}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.label}>
                    {option.label}
                  </li>
                )}
                value={methods.watch('template')}
              />
            </Box>
          </FormProvider>
          {canReset && (
            <BrokerageTableFiltersResult
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
                  tableData?.map((row: any) => row._id)
                )
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
                      tableData?.map((row: any) => row._id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    ?.slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any) => (
                      <BrokerageTableRow
                        key={row?._id}
                        row={row}
                        exchangeList={exchangeList}
                        selected={table.selected.includes(row?._id)}
                        onSelectRow={() => table.onSelectRow(row?._id)}
                        onDeleteRow={() => handleDeleteRow(row)}
                        onEditRow={() => handleEditRow(row)}
                        onViewRow={() => handleViewRow(row?._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, exchangeList.length)}
                  />

                  {/* <TableNoData notFound={notFound} /> */}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered?.length}
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

      <BrokerageQuickEditForm
        // getFunction={() => getAllBrokerages()}
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
  value,
}: {
  inputData: IProductItem | any;
  comparator: (a: any, b: any) => number;
  value: any;
}) {
  const stabilizedThis = inputData?.map((el: any, index: any) => [el, index] as const);

  stabilizedThis?.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el: any) => el[0]);

  if (value.template) {
    inputData = inputData.filter((item: any) => item.template === value.template.value);
  }

  return inputData;
}
