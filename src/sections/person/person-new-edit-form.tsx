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
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';
import { addExchanges } from 'src/store/slices/admin';
import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem | any;
  isView?: any;
  path?: any;
};

export default function PersonNewEditForm({ currentUser, isView, path }: Props) {
  const ExchangeOptions: any = [];
  const role = useSelector((data: any) => data.auth.role);
  const ExchangeList = useSelector((data) => data?.admin?.exchangeList);
  const router = useRouter();

  const [exchangeData, setExchangeData] = useState<any>();

  const Exchange: { label: any; value: any }[] = [];
  for (let i = 0; i < ExchangeList?.length; i++) {
    Exchange.push({
      label: ExchangeList[i]?.name,
      value: ExchangeList[i]?._id,
    });
  }

  const defaultAllowedExchange = useMemo(() => {
    if (!currentUser) return [];
    return Exchange.filter((option: any) => currentUser?.allowedExchange?.includes(option.value));
  }, [currentUser]);

  const defaultExchangeOptions = useMemo(() => {
    if (!currentUser) return [];
    return EXCHANGE_GROUP.filter(
      (option: any) => currentUser?.exchangeGroup?.includes(option.value)
    );
  }, [currentUser]);

  console.log({ currentUser });

  const [roleOption, setRoleOption] = useState<any>('');

  for (let i = 0; i < exchangeData?.length; i++) {
    ExchangeOptions.push({
      label: exchangeData[i]?.name,
      value: exchangeData[i]?._id,
    });
  }

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
    investorPassword: Yup.string().required('Invester Password is required'),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentUser?.name || '',
      password: currentUser?.password || '',
      ID: currentUser?.ID || '',
      exchangeGroup: defaultExchangeOptions || [],
      allowedExchange: defaultAllowedExchange || [],
      insertCustomBet: currentUser?.insertCustomBet || false,
      editBet: currentUser?.editBet || false,
      role: currentUser?.role || '',
      deleteBet: currentUser?.deleteBet || false,
      leverageX: currentUser?.leverageX || '',
      leverageY: currentUser?.leverageY || '',
      isActive: currentUser?.isActive || null,
      limitOfAddUser: currentUser?.limitOfAddUser || null,
      limitOfAddMaster: currentUser?.limitOfAddMaster || null,
      brokerage: currentUser?.brokerage || null,
      investorPassword: currentUser?.investorPassword || null,
    }),
    [defaultAllowedExchange, defaultExchangeOptions]
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

  console.log({ currentUser });

  // console.log(ExchangeOptions);

  const demo = ExchangeOptions?.filter((item: any) => {
    return currentUser?.allowedExchange.includes(item.value);
  });

  console.log({ demo });

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

  console.log({ value });
  console.log({ currentUser });

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
    if (currentUser) {
      setRoleOption(value.role);
    } else {
      setRoleOption(value.role.value);
    }
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
  }, [defaultValues, setValue, value.role]);

  const getExchangeListForPerson: any = (role: any) => {
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

  const updateMasterByRole: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.updateMaster;
      case 'SUPER_MASTER':
        return superMasterService.updateMaster;
      default:
        return paths; // Return a default path if role doesn't match
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
  const { mutate: createMaster } = useMutation(createMasterByRole(role), {
    onSuccess: (data: any) => {
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
  const { mutate: createUser } = useMutation(createUserByRole(role), {
    onSuccess: (data: any) => {
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

  const { mutate: updateUser } = useMutation(updateUserByRole(role), {
    onSuccess: (data: any) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.symbol.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });
  const { mutate: updateMaster } = useMutation(updateMasterByRole(role), {
    onSuccess: (data: any) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.symbol.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const { mutate: updateSuperMaster } = useMutation(adminService.updateSuperMaster, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      // router.push(paths.dashboard.symbol.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  // get exchange list
  const { mutate } = useMutation(getExchangeListForPerson(role), {
    onSuccess: (data: any) => {
      setExchangeData(data?.data?.allowedExchange);
      dispatch(addExchanges(data?.data?.allowedExchange));
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (roleOption === 'SUPER_MASTER') {
        if (currentUser) {
          updateSuperMaster({ data, _id: currentUser._id });
        } else {
          createSuperMaster(data);
        }
      }

      if (roleOption === 'MASTER') {
        if (currentUser) {
          updateMaster({ data, _id: currentUser._id });
        } else {
          createMaster(data);
        }
      }

      if (roleOption === 'USER') {
        if (currentUser) {
          updateUser({ data, _id: currentUser._id });
        } else {
          createUser(data);
        }
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
                isReadOnly={!!isView || currentUser}
                options={Role}
                defaultValue={Role.find((data: any) => data.value === currentUser?.role)}
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
              <RHFTextField isReadOnly={!!isView || currentUser} name="ID" label="User Id" />
              {!currentUser && (
                <RHFTextField
                  isReadOnly={!!isView || currentUser}
                  name="password"
                  type="password"
                  label="Password"
                />
              )}
              {roleOption === 'USER' && (
                <>
                  {' '}
                  <RHFTextField
                    isReadOnly={!!isView || currentUser}
                    name="investorPassword"
                    type="password"
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
              {roleOption === 'SUPER_MASTER' && (
                <RHFTextField
                  isReadOnly={!!isView}
                  name="limitOfAddMaster"
                  type="number"
                  label="Limit Of Add Master"
                />
              )}

              {roleOption !== 'USER' && (
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
                defaultValue={defaultExchangeOptions}
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
                defaultValue={defaultAllowedExchange}
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

              {roleOption !== 'USER' && (
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
                  name="isActive"
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
                <LoadingButton type="submit" variant="contained">
                  {!currentUser
                    ? `Create ${
                        roleOption === 'SUPER_MASTER'
                          ? 'Super Master'
                          : roleOption === 'MASTER'
                          ? 'Master'
                          : roleOption === 'USER'
                          ? 'User'
                          : 'Person'
                      }`
                    : 'Save Changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
