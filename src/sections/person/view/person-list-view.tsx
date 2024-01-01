/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-plusplus */
import { isAxiosError } from 'axios';
import isEqual from 'lodash/isEqual';
import { useSnackbar } from 'notistack';
import { parse, isWithinInterval } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import adminService from 'src/services/adminService';
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';
import { addPerson, addExchanges } from 'src/store/slices/admin';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

import PersonTableRow from '../person-table-row';
import UserTableToolbar from '../person-table-toolbar';
import UserTableFiltersResult from '../person-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'userId', label: 'User Id' },
  { id: 'exchange', label: 'Exchange' },
  { is: 'createdAt', label: 'Created At' },
  { is: 'status', label: 'Status' },
  { id: '', width: 88 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  exchange: [],
  status: null,
  dateRange: [],
};

// ----------------------------------------------------------------------

export default function PersonListView({ path }: { path: any }) {
  const table = useTable();
  const role = useSelector((data: any) => data.auth.role);

  const dispatch = useDispatch();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const personData = useSelector((data: any) => data?.admin?.personList);

  const [tableData, setTableData] = useState([]);
  const [exchangeData, setExchangeData] = useState<any>();

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const ExchangeOptions: any = [];

  for (let i = 0; i < exchangeData?.length; i++) {
    ExchangeOptions.push({
      label: exchangeData[i]?.name,
      value: exchangeData[i]?._id,
    });
  }

  const getExchangeListForPerson: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getExchangeListForSuperMaster;
      case 'SUPER_MASTER':
        return adminService.getExchangeListForMaster;
      case 'MASTER':
        return adminService.getExchangeListForUser;
      default:
        return adminService.getExchangeListForSuperMaster;
    }
  };

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

  const getAllPersonSByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getAllPersons;
      case 'SUPER_MASTER':
        return superMasterService.getAllPersons;
      case 'MASTER':
        return masterService.getAllPersons;
      // Add other cases for different roles with their respective paths
      default:
        return masterService.getAllPersons; // Return a default path if role doesn't match
    }
  };

  const deleteMasterByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.deleteMaster;
      case 'SUPER_MASTER':
        return superMasterService.deleteMaster;
      // Add other cases for different roles with their respective paths
      default:
        return masterService.deleteUser; // Return a default path if role doesn't match
    }
  };

  const deleteUserByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.deleteUser;
      case 'SUPER_MASTER':
        return superMasterService.deleteUser;
      case 'MASTER':
        return masterService.deleteUser;
      // Add other cases for different roles with their respective paths
      default:
        return masterService.deleteUser; // Return a default path if role doesn't match
    }
  };

  // GET ALL PERSONS

  const { mutate } = useMutation(getAllPersonSByRole(role), {
    onSuccess: (data) => {
      setTableData(data?.data?.rows);
      // dispatch(addExchanges(data?.data?.allowedExchange));
      dispatch(addPerson(data?.data?.rows));
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const { mutate: getAllExchanges } = useMutation(getExchangeListForPerson(role), {
    onSuccess: (data: any) => {
      setExchangeData(data?.data?.rows);
      dispatch(addExchanges(data?.data?.rows));
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const { mutate: deleteSuperMaster } = useMutation(adminService.deleteSuperMaster, {
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

  const { mutate: deleteMaster } = useMutation(deleteMasterByRole(role), {
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

  const { mutate: deleteUser } = useMutation(deleteUserByRole(role), {
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

  useEffect(() => {
    mutate();
    getAllExchanges();
  }, []);

  const handleDeleteRow = useCallback(
    (id: string, role: string) => {
      // dispatch(deleteAdmin(id));
      if (role === 'SUPER_MASTER') {
        deleteSuperMaster(id);
      } else if (role === 'MASTER') {
        deleteMaster(id);
      } else if (role === 'USER') {
        deleteUser(id);
      }

      // enqueueSnackbar(`${role} Deleted Successfully`, { variant: 'success' });
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dispatch, enqueueSnackbar, table, dataInPage.length]
  );

  const handleDeleteRows = useCallback(() => {
    table.onUpdatePageDeleteRows({
      totalRows: personData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered?.length, dataInPage?.length, table, personData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(path.person.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(path.person.details(id));
    },
    [router]
  );

  const { mutate: getPerson } = useMutation(adminService.getAllPersonById, {
    onSuccess: (data) => {
      // enqueueSnackbar(data?.message, { variant: 'success' });
      setTableData(data?.data?.rows);
      dispatch(addPerson(data?.data?.rows));
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const handleGetUsers = (userId: string) => {
    getPerson(userId);
  };

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Admin', href: path.root },
            { name: 'Person', href: path.person.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={path.person.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Person
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={ExchangeOptions}
          />

          {canReset && (
            <UserTableFiltersResult
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
              rowCount={personData?.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  personData.map((row: any) => row.id)
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
                  rowCount={personData?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      personData.map((row: any) => row.id)
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
                      <PersonTableRow
                        key={row._id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id, row.role)}
                        onEditRow={() => handleEditRow(row._id)}
                        onViewRow={() => handleViewRow(row._id)}
                        onGetPersonRow={() => handleGetUsers(row._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, personData?.length)}
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
}: {
  inputData: IUserItem[] | any;
  comparator: (a: any, b: any) => number;
  filters: IUserTableFilters;
}) {
  const { name, status, exchange, dateRange } = filters;

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

  if (status?.label?.length > 0) {
    inputData = inputData.filter((user: any) => user?.isActive === status?.value);
  }

  if (exchange.length) {
    inputData = inputData.filter((user: any) =>
      user.exchangeList.some((data: any) => exchange.includes(data?.allowedExchange))
    );
  }

  if (dateRange.length > 0) {
    inputData = inputData.filter((item: any) => {
      const createdAtDate = parse(item.createdAt, 'EEE MMM dd yyyy', new Date());
      return isWithinInterval(createdAtDate, { start: dateRange[0], end: dateRange[1] });
    });
  }

  return inputData;
}
