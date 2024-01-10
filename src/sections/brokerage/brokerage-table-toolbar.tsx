/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import FormControl from '@mui/material/FormControl';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ClientList } from 'src/_mock';
import adminService from 'src/services/adminService';
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';
import { brokerageCallMethod, brokerageCallOptions } from 'src/_mock/_brokerage';

import FormProvider from 'src/components/hook-form/form-provider';
import { CustomDatePicker } from 'src/components/custom-datePicker';
import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  mutate: any;
  currentBrokerage: any;
  setCurrentBrokerage: any;
};

export default function BrokerageTableToolbar({
  mutate,
  currentBrokerage,
  setCurrentBrokerage,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const ExchangeList = useSelector((data: any) => data?.admin?.exchangeList);

  const symbolList = useSelector((data: any) => data?.symbol?.symbolList);
  console.log({ symbolList });
  const NewUserSchema = Yup.object().shape({
    exchangeCode: Yup.mixed<any>().nullable().required('Exchange is required'),
    // symbol: Yup.mixed<any>().nullable().required('Symbol is required'),
    date: Yup.date().required('Date is required'),
    template: Yup.mixed<any>().nullable().required('Template is required'),
    bco: Yup.mixed<any>().nullable().required('Brokerage call option is required'),
    bcm: Yup.mixed<any>().nullable().required('Brokerage call method is required'),
    brkgRate: Yup.number().required('BrokerageRate is required'),
    brkgRatePer: Yup.number().required('BrokerageRatePer is required'),
  });
  const role = useSelector((data: any) => data.auth.role);

  const usersData = useSelector((state: any) => state?.person?.personData);
  console.log({ usersData });
  const defaultTemplate = ClientList.find(
    (data: any) => data?.value === currentBrokerage?.template
  );
  const Exchange: { label: any; value: any }[] = [];
  for (let i = 0; i < ExchangeList?.length; i++) {
    Exchange.push({
      label: ExchangeList[i]?.name,
      value: ExchangeList[i]?._id,
    });
  }

  const Symbol: { label: any; value: any }[] = [];
  for (let i = 0; i < symbolList?.length; i++) {
    Symbol.push({
      label: symbolList[i]?.name,
      value: symbolList[i]?._id,
    });
  }
  const defaultExchnageCode = Exchange.filter(
    (data: any) => data?.value === currentBrokerage?.exchangeCode
  )[0];
  const defaultSymbol = Symbol.find((data: any) => data?.value === currentBrokerage?.symbol);

  const defaultBcm = brokerageCallMethod.find((data: any) => data?.value === currentBrokerage?.bcm);

  const defaultBco = brokerageCallOptions.find(
    (data: any) => data?.value === currentBrokerage?.bco
  );

  useEffect(() => {
    setValue('brkgRate', currentBrokerage?.brkgRate || '');
    setValue(
      'template',
      defaultTemplate || {
        label: '',
        value: '',
      }
    );
    setValue(
      'exchangeCode',
      defaultExchnageCode || {
        label: '',
        value: '',
      }
    );
    setValue(
      'symbol',
      defaultSymbol || {
        label: '',
        value: '',
      }
    );
    setValue(
      'bco',
      defaultBco || {
        label: '',
        value: '',
      }
    );
    setValue(
      'bcm',
      defaultBcm || {
        label: '',
        value: '',
      }
    );
  }, [currentBrokerage]);

  const defaultValues = {
    date: new Date(),
    template: {
      label: '',
      value: '',
    },
    exchangeCode: {
      label: '',
      value: '',
    },
    symbol: {
      label: '',
      value: '',
    },
    bco: {
      label: '',
      value: '',
    },
    bcm: {
      label: '',
      value: '',
    },
    brkgRate: currentBrokerage?.brkgRate || '',
    brkgRatePer: currentBrokerage?.brkgRatePer || 0,
  };

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
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
    if (value.bcm?.value === 'Q') {
      setValue('brkgRatePer', 1);
    } else if (value.bcm?.value === 'P') {
      setValue('brkgRatePer', 100000);
    }
  }, [value.bcm]);

  const createMasterByRole: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.createMaster;
      case 'SUPER_MASTER':
        return superMasterService.createMaster;
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  const createUserByRole: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.createUser;
      case 'SUPER_MASTER':
        return superMasterService.createUser;
      case 'MASTER':
        return masterService.createUser;
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  // create SUPER_MASTER
  const { mutate: createSuperMaster } = useMutation(adminService.createSuperMaster, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(paths.dashboard.person.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  // create MASTER
  const { mutate: createMaster } = useMutation(createMasterByRole(role), {
    onSuccess: (data: any) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.superMaster.list);
      router.push(paths.user.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  // create USER
  const { mutate: createUser }: any = useMutation(createUserByRole(role), {
    onSuccess: (data: any) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.superMaster.list);
      router.push(paths.dashboard.person.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    try {
      // if (roleOption === 'Super Master') {
      await createSuperMaster({ ...usersData, ...data });
      // }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <FormControl
            sx={{
              flexShrink: 0,
              width: { xs: 1, md: 200 },
            }}
          >
            <Stack spacing={1.5}>
              <RHFAutocomplete
                name="template"
                label="Template"
                // isReadOnly={!!currentBrokerage}
                id="template"
                options={ClientList}
                isLabled={false}
                value={value.template}
                defaultValue={defaultTemplate}
                data={ClientList}
                // isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.label}>
                    {option.label}
                  </li>
                )}
              />
            </Stack>
          </FormControl>
          <Stack
            sx={{
              flexShrink: 0,
            }}
            spacing={1.5}
            display="flex"
            flexDirection="row"
          >
            <CustomDatePicker
              views={['day', 'month', 'year']}
              label="Set Date"
              name="date"
              format="dd MMM yyyy"
              value={value.date}
              // defaultValue={currentUser && new Date(currentUser?.date)}
              onChange={(newValue: any) => {
                setValue('date', newValue);

                // Handle the value change in the parent component state or context
              }}
            />{' '}
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <Stack spacing={1.5}>
                <RHFAutocomplete
                  name="exchangeCode"
                  label="Exchange Code"
                  options={Exchange}
                  id="exchangeCode"
                  isLabled={false}
                  value={value.exchangeCode}
                  data={Exchange}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  getOptionLabel={(option: any) => option.label}
                  renderOption={(props, option) => (
                    <li {...props} key={option.label}>
                      {option.label}
                    </li>
                  )}
                />
              </Stack>
            </FormControl>
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <Stack spacing={1.5}>
                <RHFAutocomplete
                  name="symbol"
                  label="Symbol"
                  id="symbol"
                  options={symbolOptions}
                  isLabled={false}
                  value={value.symbol}
                  data={symbolOptions}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  getOptionLabel={(option: any) => option.label}
                  renderOption={(props, option) => (
                    <li {...props} key={option.label}>
                      {option.label}
                    </li>
                  )}
                />
              </Stack>
            </FormControl>
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <Stack spacing={1.5}>
                <RHFAutocomplete
                  name="bco"
                  label="BCO"
                  id="bco"
                  options={brokerageCallOptions}
                  isLabled={false}
                  value={value.bco}
                  data={brokerageCallOptions}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  getOptionLabel={(option: any) => option.label}
                  renderOption={(props, option) => (
                    <li {...props} key={option.label}>
                      {option.label}
                    </li>
                  )}
                />
              </Stack>
            </FormControl>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pt: 0,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <FormControl
            sx={{
              flexShrink: 0,
              width: { xs: 1, md: 180 },
            }}
          >
            <Stack spacing={1.5}>
              <RHFAutocomplete
                name="bcm"
                label="BCM"
                id="bcm"
                options={brokerageCallMethod}
                isLabled={false}
                value={value.bcm}
                data={brokerageCallMethod}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.label}>
                    {option.label}
                  </li>
                )}
              />
            </Stack>
          </FormControl>
          <Box display="flex" gap={2} width="100%">
            <RHFTextField sx={{ width: '100%' }} type="number" name="brkgRate" label="BRKG Rate" />
            <RHFTextField sx={{ width: '100%' }} name="brkgRatePer" isReadOnly label="BRKG Per" />
          </Box>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Create User
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
