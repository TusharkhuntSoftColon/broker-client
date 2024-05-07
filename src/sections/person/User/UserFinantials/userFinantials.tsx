/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-useless-fragment */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import Container from '@mui/material/Container';
import { Box, Grid, Table, TableBody, Typography, TableContainer } from '@mui/material';

import useAuth from 'src/hooks/useAuth';

import userFinancialsService from 'src/services/userFinancialsService';

import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import UserBalanceTableRow from './user-balance-table-row';

const FinantialTypes = [
  {
    label: 'Balance',
    value: 'BALANCE',
  },
  {
    label: 'Credit',
    value: 'CREDIT',
  },
];

const TABLE_HEAD = [
  { id: 'date', label: 'Date' },
  { id: 'type', label: 'Type' },
  { id: 'comment', label: 'Comment' },
  { id: 'amount', label: 'Amount' },
];

const dummyData = [
  { date: 'Date', type: 'balance', amount: 2000, comment: 'This is comment' },
  { date: 'Date', type: 'credit', amount: 2000, comment: 'This is comment' },
  { date: 'Date', type: 'balance', amount: 2000, comment: 'This is comment' },
];

export default function UserFinantials({ currentUser }: any) {
  const settings = useSettingsContext();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState<any>();
  const [isWithDrow, setIsWithDrow] = useState<boolean>(false);
  const [userBalanceDetails, setUserBalanceDetails] = useState<any>({});
  const { role } = useAuth();

  const { id }: any = useParams();

  const notFound = !dummyData?.length;

  const defaultValues = useMemo(
    () => ({
      Balance: 0,
      Credit: 0,
      operation: {
        label: 'Balance',
        value: 'BALANCE',
      },
      comment: '',
    }),
    []
  );

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        Balance: Yup.number().required('Price is required'),
        comment: Yup.string().required('Comment is required'),
        Credit: Yup.number().required('Price is required'),
        operation: Yup.mixed<any>().nullable().required('Operation is required'),
      })
    ),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    setValue('Credit', 0);
    setValue('comment', '');
    setValue('Balance', 0);
  }, [values?.operation?.value]);

  const getBalanceHistoryByRole: any = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return userFinancialsService.getBalanceHistoryByAdmin(id);
      case 'SUPER_MASTER':
        return userFinancialsService.getBalanceHistoryBySuperMaster(id);
      case 'MASTER':
        return userFinancialsService.getBalanceHistoryByMaster(id);
      default:
        return userFinancialsService.getBalanceHistoryByMaster(id);
    }
  };
  const addDepositByRole: any = (role1: any, data: any) => {
    switch (role1) {
      case 'ADMIN':
        return userFinancialsService.addDepositeByAdmin(data, id);
      case 'SUPER_MASTER':
        return userFinancialsService.addDepositeBySuperMaster(data, id);
      case 'MASTER':
        return userFinancialsService.addDepositeByMaster(data, id);
      default:
        return userFinancialsService.addDepositeByMaster(data, id);
    }
  };
  const addWithdrawByRole: any = (role1: any, data: any) => {
    switch (role1) {
      case 'ADMIN':
        return userFinancialsService.addWithdrawByAdmin(data, id);
      case 'SUPER_MASTER':
        return userFinancialsService.addWithdrawBySuperMaster(data, id);
      case 'MASTER':
        return userFinancialsService.addWithdrawByMaster(data, id);
      default:
        return userFinancialsService.addWithdrawByMaster(data, id);
    }
  };

  const { mutate: getBalanceHistory } = useMutation(() => getBalanceHistoryByRole(role), {
    onSuccess: (data: any) => {
      console.log({ data });

      setTableData(data?.data?.data?.balanceHistoryDetails);
      setUserBalanceDetails(data?.data?.data?.BalancelDetail?.user_balance);
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  const { mutate: addDeposite } = useMutation((data) => addDepositByRole(role, data), {
    onSuccess: (data: any) => {
      getBalanceHistory(id);
      if (values?.operation?.value === 'CREDIT')
        setValue('operation', {
          label: 'Balance',
          value: 'BALANCE',
        });
      setValue('Credit', null);
      setValue('Balance', null);
      reset();
    },
    onError: (error: any) => {
      console.log({ error });
    },
  });

  const { mutate: addWithDrow } = useMutation((data) => addWithdrawByRole(role, data), {
    onSuccess: (data: any) => {
      getBalanceHistory(id);
      setValue('Credit', null);
      setValue('Balance', null);
      reset();
    },

    onError: (error: any) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isWithDrow) {
      addWithDrow(data, id);
    } else {
      addDeposite(data, id);
    }
  });

  useEffect(() => {
    getBalanceHistory(id);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container>
            <Grid xs={12}>
              <Card sx={{ p: 4 }}>
                <Box sx={{ marginBottom: 4, display: 'flex', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography sx={{ fontSize: '14px' }}>Balance : </Typography>
                    <Typography sx={{ fontSize: '14px' }}>{userBalanceDetails?.balance}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography sx={{ fontSize: '14px' }}>Credit Limit : </Typography>
                    <Typography sx={{ fontSize: '14px' }}>
                      {userBalanceDetails?.creditLimit}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFAutocomplete
                    name="operation"
                    label="Operation"
                    // control={control}
                    options={FinantialTypes}
                    defaultValue={{
                      label: 'Balance',
                      value: 'BALANCE',
                    }}
                    value={values?.operation}
                    isLabled={false}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    getOptionLabel={(option: any) => option.label}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                  />

                  <RHFTextField
                    name={values?.operation?.label}
                    type="number"
                    label={values?.operation?.label}
                    // defaultValue={usdList[0]?.usdInrPrice}
                  />

                  <RHFTextField
                    name="comment"
                    label="Comment"
                    // defaultValue={usdList[0]?.usdInrPrice}
                  />

                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                    <LoadingButton
                      fullWidth
                      // color="info"
                      size="medium"
                      type="submit"
                      variant="contained"
                      onClick={() => setIsWithDrow(false)}
                      loading={isSubmitting}
                    >
                      {values?.operation?.value === 'CREDIT' ? 'Add' : 'Deposit'}
                    </LoadingButton>
                    <LoadingButton
                      fullWidth
                      disabled={values?.operation?.value === 'CREDIT'}
                      // color="info"
                      size="medium"
                      type="submit"
                      variant="contained"
                      onClick={() => setIsWithDrow(true)}
                      loading={isSubmitting}
                    >
                      Withdrawal
                    </LoadingButton>
                  </Box>
                </Box>
                <Card sx={{ mt: 2 }}>
                  <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <Scrollbar>
                      <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                        <TableHeadCustom
                          order={table.order}
                          orderBy={table.orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={dummyData?.length}
                          numSelected={table.selected.length}
                          onSort={table.onSort}
                        />

                        <TableBody>
                          {tableData?.map((row: any, index: any) => (
                            <UserBalanceTableRow key={row._id} row={row} />
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
                  <TablePaginationCustom
                    count={tableData?.length}
                    page={table.page}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                    //
                    dense={table.dense}
                    onChangeDense={table.onChangeDense}
                  />
                </Card>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}
