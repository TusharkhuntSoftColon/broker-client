/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { Box, Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ClientList } from 'src/_mock';
import { addUser } from 'src/store/slices/person';
import { addSymbol } from 'src/store/slices/symbol';
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
  currentUser: any;
  fields?: any;
};

export default function BrokerageTableToolbar({
  // mutate,
  currentUser,
  currentBrokerage,
  // setCurrentBrokerage,
  fields,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const symbolList = useSelector((data: any) => data?.symbol?.symbolList);
  const ExchangeList = useSelector((data: any) => data?.admin?.exchangeList);
  const dispatch = useDispatch();
  const role = useSelector((data: any) => data.auth.role);
  const usersData = useSelector((state: any) => state?.person?.personData);

  const [roleOption] = useState<any>(currentUser ? usersData?.role : usersData?.role?.value);

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

  const symbolOptionsArray = symbolList?.filter(
    (data: any) => data.exchange === value.exchangeCode?.value
  );
  const symbolOptions: any = [];

  for (let i = 0; i < symbolOptionsArray?.length; i++) {
    symbolOptions.push({
      label: symbolOptionsArray[i]?.name,
      value: symbolOptionsArray[i]?._id,
    });
  }

  const createUserByRole: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.createUser;
      case 'SUPER_MASTER':
        return superMasterService.createUser;
      case 'MASTER':
        return masterService.createUser;
      default:
        return paths;
    }
  };

  const updateUserByRole: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.updateUser;
      case 'SUPER_MASTER':
        return superMasterService.updateUser;
      case 'MASTER':
        return masterService.updateUser;
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  const getSymbolByRole: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getSymbolListAdmin;
      case 'SUPER_MASTER':
        return superMasterService.getSymbolListSuperMaster;
      case 'MASTER':
        return masterService.getSymbolListMaster;
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  // get symbol list
  const { mutate: getSymbol } = useMutation(getSymbolByRole(role), {
    onSuccess: (data: any) => {
      dispatch(addSymbol(data?.data?.rows));
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  // create USER
  const { mutate: createUser }: any = useMutation(createUserByRole(role), {
    onSuccess: (data: any) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(paths.dashboard.person.root);
      dispatch(addUser([]));
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  // update USER
  const { mutate: updateUser }: any = useMutation(updateUserByRole(role), {
    onSuccess: (data: any) => {
      console.log({ data });
      enqueueSnackbar(data?.message ?? 'Data Updated Successfully', { variant: 'success' });
      router.push(paths.dashboard.person.root);
      dispatch(addUser([]));
    },
    onError: (error: any) => {
      console.log({ error });
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    try {
      // if (roleOption === 'SUPER_MASTER') {
      //   if (currentUser) {
      //     await updateSuperMaster({ ...usersData, ...data, _id: currentUser?._id });
      //   } else {
      //     await createSuperMaster({ ...usersData, ...data });
      //   }
      // }
      // if (roleOption === 'MASTER') {
      //   if (currentUser) {
      //     await updateMaster({ ...usersData, ...data, _id: currentUser?._id });
      //   } else {
      //     await createMaster({ ...usersData, ...data });
      //   }
      // }
      if (roleOption === 'USER') {
        if (currentUser) {
          await updateUser({ ...usersData, ...data, _id: currentUser?._id, fields });
        } else {
          await createUser({ ...usersData, ...data, fields });
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (value.bcm?.value === 'Q') {
      setValue('brkgRatePer', 1);
    } else if (value.bcm?.value === 'P') {
      setValue('brkgRatePer', 100000);
    }
  }, [value.bcm]);

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

  useEffect(() => {
    getSymbol();
  }, []);

  useEffect(() => {
    if (!currentBrokerage) {
      setValue('symbol', {
        label: '',
        value: '',
      });
    }
  }, [value.exchangeCode]);

  const [addBrokerageClicked, setAddBrokerageClicked] = useState(false);

  const handleAddBrokerageClick = () => {
    setAddBrokerageClicked(true);
  };

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
                id="template"
                options={ClientList}
                isLabled={false}
                value={value.template}
                defaultValue={defaultTemplate}
                data={ClientList}
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
              }}
            />
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
          <LoadingButton variant="contained" onClick={handleAddBrokerageClick}>
            {currentUser ? 'Update Brokerage' : 'Add Brokerage'}
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!addBrokerageClicked}
          >
            {currentUser ? 'Update User' : 'Create User'}
          </LoadingButton>
        </Stack>
      </Stack>
      <Divider
        sx={{
          width: '100%',
          height: 1,
          backgroundColor: '#D9DBE9',
          margin: '3px 5px',
        }}
      />
    </FormProvider>
  );
}
