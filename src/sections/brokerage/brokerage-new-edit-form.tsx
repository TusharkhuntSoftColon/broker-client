/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { brokerageCallMethod, brokerageCallOptions } from 'src/_mock/_brokerage';

import { CustomDatePicker } from 'src/components/custom-datePicker';

import { IBrokerage } from 'src/types/brokerage';

import { useRouter } from '../../routes/hooks';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from '../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  currentExchange?: IBrokerage | any;
};

export default function BrokerageNewEditForm({ currentExchange }: Props) {
  const router = useRouter();
  const location = useLocation();

  console.log({ location });
  const { enqueueSnackbar } = useSnackbar();
  const ExchangeList = useSelector((data: any) => data?.admin?.exchangeList);

  const symbolList = useSelector((data: any) => data?.symbol?.symbolList);

  const NewUserSchema = Yup.object().shape({
    exchangeCode: Yup.mixed<any>().nullable().required('Exchange is required'),
  });
  const defaultValues = useMemo(
    () => ({
      date: currentExchange?.date || '',
      exchangeCode: currentExchange?.exchangeCode || '',
      bco: currentExchange?.bco || '',
      bcm: currentExchange?.bcm || '',
      brkgRate: currentExchange?.brkgRate || '',
      brkgRatePer: currentExchange?.brkgRatePer || 1,
    }),
    [currentExchange]
  );

  const Exchange: { label: any; value: any }[] = [];
  for (let i = 0; i < ExchangeList?.length; i++) {
    Exchange.push({
      label: ExchangeList[i]?.name,
      value: ExchangeList[i]?._id,
    });
  }

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const value: any = watch();
  const symbolOptionsArray = symbolList.filter(
    (data: any) => data.exchange === value.exchangeCode?.value
  );
  const symbolOptions: any = [];

  for (let i = 0; i < symbolOptionsArray?.length; i++) {
    symbolOptions.push({
      label: symbolOptionsArray[i]?.name,
      value: symbolOptionsArray[i]?._id,
    });
  }

  useEffect(() => {
    if (value.bcm.value === 'Q') {
      setValue('brkgRatePer', 1);
    } else if (value.bcm?.value === 'P') {
      setValue('brkgRatePer', 100000);
    }
  }, [value.bcm]);

  // const { mutate: CreateBrokerage } = useMutation(adminService.createBrokerage, {
  //   onSuccess: (data) => {
  //     enqueueSnackbar(data?.message, { variant: 'success' });
  //     router.push(paths.dashboard.import_month.root);
  //   },

  //   onError: (error: any) => {
  //     if (isAxiosError(error)) {
  //       enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
  //     }
  //   },
  // });

  // UPDATE IMPORT MONTH
  // const { mutate: updateBrokerage } = useMutation(adminService.updateBrokerage, {
  //   onSuccess: (data: any) => {
  //     enqueueSnackbar(data?.message, { variant: 'success' });
  //     router.push(paths.dashboard.import_month.root);
  //   },
  //   onError: (error: any) => {
  //     if (isAxiosError(error)) {
  //       enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
  //     }
  //   },
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (currentExchange) {
        const adminID: any = currentExchange._id;
        // updateBrokerage({ _id: adminID, data });
      } else {
        // dispatch(addAdmin(data));
        // CreateBrokerage(data);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <CustomDatePicker
                views={['day', 'month', 'year']}
                label="Set Date"
                name="date"
                format="dd MMM yyyy"
                // defaultValue={currentUser && new Date(currentUser?.date)}
                onChange={(newValue) => {
                  setValue('date', newValue);

                  // Handle the value change in the parent component state or context
                }}
              />
              <RHFAutocomplete
                name="exchangeCode"
                label="Exchange"
                // control={control}
                // isReadOnly={!!isView || currentExchange}
                options={Exchange}
                // defaultValue={currentExchange && defaultExchangeOptions}
                data={Exchange}
                isLabled={false}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
              <RHFAutocomplete
                name="symbol"
                label="Symbol"
                // control={control}
                // isReadOnly={!!isView || currentExchange}
                options={symbolOptions}
                // defaultValue={currentExchange && defaultSymbolOptions}
                data={symbolOptions}
                isLabled={false}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
              <RHFAutocomplete
                name="bco"
                label="Brokerage Call Option"
                // control={control}
                // isReadOnly={!!isView || currentExchange}
                options={brokerageCallOptions}
                // defaultValue={currentExchange && defaultSymbolOptions}
                data={brokerageCallOptions}
                isLabled={false}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />

              <RHFAutocomplete
                name="bcm"
                label="Brokerage Call Method"
                // control={control}
                // isReadOnly={!!isView || currentExchange}
                options={brokerageCallMethod}
                // defaultValue={currentExchange && defaultSymbolOptions}
                data={brokerageCallMethod}
                isLabled={false}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />

              <RHFTextField name="brkgRate" label="Brokerage Rate" />
              <RHFTextField
                name="brkgRatePer"
                defaultValue={value.brkgRatePer}
                isReadOnly
                label="Brokerage Rate Per"
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentExchange ? 'Create Brokerage' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
