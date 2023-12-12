import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Checkbox, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { EXCHANGE_GROUP } from 'src/_mock';

import FormProvider, {
  RHFAutocomplete,
  RHFCheckbox,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

import { ADMIN_ROLE, MASTER_ROLE, SUPER_MASTER_ROLE } from 'src/_mock/_person';
import adminService from 'src/services/adminService';
import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem | any;
  isView?: any;
  path?: any;
};

export default function PersonNewEditForm({ currentUser, isView, path }: Props) {
  console.log({ path });

  const role = useSelector((data: any) => data.auth.role);
  console.log({ role });
  const router = useRouter();

  const [exchangeData, setExchangeData] = useState<any>();

  const [roleOption, setRoleOption] = useState<any>('');

  const adminData = useSelector((data: any) => data?.admin?.adminList);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const NewSuperMasterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.mixed<any>().nullable().required('Role is required'),
    exchangeGroup: Yup.array().min(1, 'Must have at least 1 exchange'),
    allowedExchange: Yup.array().min(1, 'Must have at least 1 exchange'),
    limitOfAddMaster: Yup.number().required('Limit Of Add Master is required'),
    limitOfAddUser: Yup.number().required('Limit Of Add User is required'),
    leverageX: Yup.number().required('Leverage X is required'),
    leverageY: Yup.number().required('Leverage Y is required'),
  });
  const NewMasterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.mixed<any>().nullable().required('Role is required'),
    exchangeGroup: Yup.array().min(1, 'Must have at least 1 exchange'),
    allowedExchange: Yup.array().min(1, 'Must have at least 1 exchange'),
    limitOfAddUser: Yup.number().required('Limit Of Add User is required'),
    leverageX: Yup.number().required('Leverage X is required'),
    leverageY: Yup.number().required('Leverage Y is required'),
  });
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.mixed<any>().nullable().required('Role is required'),
    exchangeGroup: Yup.array().min(1, 'Must have at least 1 exchange'),
    allowedExchange: Yup.array().min(1, 'Must have at least 1 exchange'),
    leverageX: Yup.number().required('Leverage X is required'),
    leverageY: Yup.number().required('Leverage Y is required'),
    brokerage: Yup.number().required('Brokerage is required'),
    investorPassword: Yup.number().required('Invester Password is required'),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentUser?.name || '',
      password: currentUser?.password || '',
      ID: currentUser?.ID || '',
      exchangeGroup: currentUser?.exchangeGroup || [],
      allowedExchange: currentUser?.allowedExchange || [],
      insertCustomBet: currentUser?.insertCustomBet || false,
      editBet: currentUser?.editBet || false,
      role: currentUser?.role || '',
      deleteBet: currentUser?.deleteBet || false,
      leverageX: currentUser?.leverageX || '',
      leverageY: currentUser?.leverageY || '',
      isActiveAdmin: currentUser?.isActiveAdmin || true,
    }),
    [currentUser]
  );
  const getValidationSchema = (role: any) => {
    switch (role) {
      case 'SUPER_MASTER':
        return NewSuperMasterSchema;
      case 'MASTER':
        return NewMasterSchema;
      case 'USER':
        return NewUserSchema;
      default:
        return Yup.object().shape({});
    }
  };

  const methods = useForm({
    resolver: yupResolver(getValidationSchema(roleOption)),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const value = watch();

  useEffect(() => {
    const fieldsToReset: any = [
      'name',
      'ID',
      'password',
      'exchangeGroup',
      'allowedExchange',
      'insertCustomBet',
      'editBet',
      'deleteBet',
      'leverageX',
      'leverageY',
    ];

    fieldsToReset.forEach((field: any) => {
      if (field !== 'role') {
        setValue(field, defaultValues[field]);
      }
    });

    setRoleOption(value.role.value);

    if (value.role.value === 'SUPER_MASTER') {
      setValue('limitOfAddMaster', currentUser?.limitOfAddMaster || '');
      setValue('limitOfAddUser', currentUser?.limitOfAddUser || '');
    }
    if (value.role.value === 'MASTER') {
      setValue('limitOfAddUser', currentUser?.limitOfAddUser || '');
    }
    if (value.role.value === 'USER') {
      setValue('brokerage', currentUser?.brokerage || '');
      setValue('investorPassword', currentUser?.investorPassword || '');
    }
  }, [defaultValues, setValue, value.role.value]);

  console.log({ value });

  const getExchangeListForPerson = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getExchangeListForSuperMaster;
      case 'SUPER_MASTER':
        return adminService.getExchangeListForMaster;
      case 'MASTER':
        return adminService.getExchangeListForUser;
      // Add other cases for different roles with their respective paths
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  // create SUPER_MASTER
  const { mutate: createSuperMaster } = useMutation(adminService.createSuperMaster, {
    onSuccess: (data) => {
      console.log({ data });
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.superMaster.list);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  //create MASTER
  const { mutate: createMaster } = useMutation(adminService.createMaster, {
    onSuccess: (data) => {
      console.log({ data });
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.superMaster.list);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  //create USER
  const { mutate: createUser } = useMutation(adminService.createUser, {
    onSuccess: (data) => {
      console.log({ data });
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.superMaster.list);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  // get exchange list
  const { mutate } = useMutation(getExchangeListForPerson(role), {
    onSuccess: (data) => {
      console.log({ data });
      setExchangeData(data?.data?.allowedExchange);
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    console.log({ value });
    try {
      if (value?.role.value === 'SUPER_MASTER') {
        createSuperMaster(data);
      }

      if (value?.role.value === 'MASTER') {
        createMaster(data);
      }

      if (value?.role.value === 'USER') {
        createUser(data);
      }
    } catch (error) {
      console.log(error);
    }

    router.push(path.person.list);

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
    //   // await createAdmin(data);
    //   if (currentUser) {
    //     const adminID = currentUser.id;
    //     // dispatch(updateAdmin({ id: adminID, updatedData: data }));
    //   } else {
    //     // dispatch(addAdmin(data));
    //     createSuperMaster(data);
    //   }
    //   console.info('DATA', data);
    // } catch (error) {
    //   console.error(error);
    // }
  });

  useEffect(() => {
    mutate();
  }, []);

  const ExchangeOptions: any = [];

  for (let i = 0; i < exchangeData?.length; i++) {
    ExchangeOptions.push({
      label: exchangeData[i]?.name,
      value: exchangeData[i]?._id,
    });
  }

  console.log({ ExchangeOptions });

  const ExchangeOption = [
    { label: 'NYSE', value: 'abcdefg' },
    { label: 'NASDAQ', value: 'abcdef' },
    { label: 'LSE', value: 'abcdeased' },
    { label: 'TSE', value: 'abcdefgh' },
    { label: 'HKEX', value: 'absdffg' },
    { label: 'SSE', value: 'absdfefg' },
    { label: 'TSX', value: 'absdfefg' },
    { label: 'BSE', value: 'absdfefg' },
    { label: 'BIST', value: 'absdfefg' },
  ];

  const RolesOptions = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return ADMIN_ROLE;
      case 'SUPER_MASTER':
        return SUPER_MASTER_ROLE;
      case 'MASTER':
        return MASTER_ROLE;
      // Add other cases for different roles with their respective paths
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  const Role = RolesOptions(role);

  console.log({ Role });

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
              <RHFAutocomplete
                name="role"
                label="Role"
                // control={control}
                isReadOnly={!!isView}
                options={Role}
                data={Role}
                isLabled={false}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  );
                }}
              />
              <RHFTextField isReadOnly={!!isView} name="name" label="Full Name" />
              <RHFTextField isReadOnly={!!isView} name="ID" label="User Id" />
              <RHFTextField
                isReadOnly={!!isView}
                name="password"
                type="password"
                label="Password"
              />
              {value.role.value === 'USER' && (
                <>
                  {' '}
                  <RHFTextField
                    isReadOnly={!!isView}
                    name="investorPassword"
                    type="number"
                    label="Investor Password"
                  />
                  <RHFTextField
                    isReadOnly={!!isView}
                    name="brokerage"
                    type="number"
                    label="Brokerage"
                  />
                </>
              )}
              {value.role.value === 'SUPER_MASTER' && (
                <RHFTextField
                  isReadOnly={!!isView}
                  name="limitOfAddMaster"
                  type="number"
                  label="Limit Of Add Master"
                />
              )}

              {value.role.value !== 'USER' && (
                <RHFTextField
                  isReadOnly={!!isView}
                  name="limitOfAddUser"
                  type="number"
                  label="Limit Of Add User"
                />
              )}

              <RHFTextField
                isReadOnly={!!isView}
                name="leverageX"
                type="number"
                label="Leverage X"
              />

              <RHFTextField
                isReadOnly={!!isView}
                name="leverageY"
                type="number"
                label="Leverage Y"
              />

              <RHFAutocomplete
                name="exchangeGroup"
                label="Exchange Group"
                // control={control}
                isReadOnly={!!isView}
                options={EXCHANGE_GROUP}
                freeSolo
                data={EXCHANGE_GROUP}
                isLabled={false}
                multiple
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option, { selected }) => {
                  return (
                    <li {...props} key={option.value}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  );
                }}
              />

              <RHFAutocomplete
                name="allowedExchange"
                label="Allowed Exchange"
                // control={control}
                isReadOnly={!!isView}
                options={ExchangeOptions}
                freeSolo
                data={ExchangeOptions}
                isLabled={false}
                multiple
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option, { selected }) => {
                  return (
                    <li {...props} key={option.value}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  );
                }}
              />

              {value.role.value !== 'USER' && (
                <>
                  {' '}
                  <RHFCheckbox
                    isReadOnly={!!isView}
                    name="insertCustomBet"
                    label="Insert Custom Bet"
                  />
                  <RHFCheckbox isReadOnly={!!isView} name="editBet" label="Edit Bet" />
                  <RHFCheckbox isReadOnly={!!isView} name="deleteBet" label="Delete Bet" />
                </>
              )}

              {currentUser && (
                <RHFSwitch
                  name="isActiveAdmin"
                  labelPlacement="start"
                  label={
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Active or In Active Super Master
                    </Typography>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              )}
            </Box>

            {!isView && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create Super Master' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
