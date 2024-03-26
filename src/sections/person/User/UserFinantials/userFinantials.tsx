/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-useless-fragment */
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import Container from '@mui/material/Container';
import { Box, Grid, Table, TableBody, TableContainer } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useTable, TableNoData, TableHeadCustom } from 'src/components/table';

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
  { date: 'Gold', type: 'balance', amount: 2000, comment: 'This is comment' },
  { date: 'Silver', type: 'credit', amount: 2000, comment: 'This is comment' },
  { date: 'TATA', type: 'balance', amount: 2000, comment: 'This is comment' },
];
export default function UserFinantials() {
  const settings = useSettingsContext();
  const table = useTable();

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
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  console.log({ values });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });

    try {
      //   setUsdPrice(data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container>
            <Grid xs={12}>
              <Card sx={{ p: 6 }}>
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
                    // data={Role}
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
                      loading={isSubmitting}
                    >
                      Deposit
                    </LoadingButton>
                    <LoadingButton
                      fullWidth
                      // color="info"
                      size="medium"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Withdrawal
                    </LoadingButton>
                  </Box>
                </Box>
                <TableContainer sx={{ position: 'relative', overflow: 'unset', mt: 4 }}>
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
                        {dummyData.map((row: any, index: any) => (
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
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}
