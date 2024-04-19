/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, Typography, AccordionDetails, AccordionSummary } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';

import { addUser } from 'src/store/slices/person';
import adminService from 'src/services/adminService';
import { addExchanges } from 'src/store/slices/admin';
import masterService from 'src/services/masterService';
import { EXCHANGE_GROUP, LEVERAGE_OPTIONS } from 'src/_mock';
import superMasterService from 'src/services/superMasterService';
import { STATUS, ADMIN_ROLE, MASTER_ROLE, SUPER_MASTER_ROLE } from 'src/_mock/_person';
import { NewUserSchema, NewMasterSchema, NewSuperMasterSchema } from 'src/schema/personSchema';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFCheckbox,
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';

import AllowedExchangeComponent, { AllowedExChangeInterface } from './AllowedExchangeComponenet';

type Props = {
  currentUser?: IUserItem | any;
  isView?: any;
  path?: any;
  setTabValue?: any;
  setFieldsValue?: any;
};

export default function PersonNewEditForm({
  currentUser,
  isView,
  path,
  setTabValue,
  setFieldsValue,
}: Props) {
  const ExchangeOptions: any = [];
  const { role } = useAuth();
  const ExchangeList = useSelector((data: any) => data?.admin?.exchangeList);
  const router = useRouter();

  const [exchangeData, setExchangeData] = useState<any>();

  const personList = useSelector((data: any) => data?.person?.personData);
  const Exchange: { label: any; value: any }[] = [];
  for (let i = 0; i < ExchangeList?.length; i++) {
    Exchange.push({
      label: ExchangeList[i]?.name,
      value: ExchangeList[i]?._id,
    });
  }

  const defaultAllowedExchange = (index: number) => {
    if (!currentUser) return [];
    return Exchange.filter(
      (option: any) => currentUser?.exchangeList[index]?.allowedExchange === option.value
    )[0];
  };

  const defaultExchangeOptions = useMemo(
    () => (index: number) => {
      const data = currentUser
        ? EXCHANGE_GROUP.filter(
            (option: any) => currentUser?.exchangeList[index]?.exchangeGroup === option.value
          )[0]
        : EXCHANGE_GROUP.filter((option: any) =>
            personList?.exchangeList?.length > 0
              ? personList?.exchangeList?.exchangeGroup?.value === option?.value
              : personList?.exchangeGroup?.value === option?.value
          )[0];
      return data;
    },
    [currentUser, personList, EXCHANGE_GROUP]
  );

  const defaultLeverageOptions = useMemo(() => {
    const data = currentUser
      ? LEVERAGE_OPTIONS.filter((option: any) => currentUser?.leverageXY === option.value)[0]
      : { value: '1:100', label: '1:100' };
    return data;
  }, [currentUser, personList]);

  const defaultStatus = useMemo(() => {
    const data = currentUser
      ? STATUS.find((option: any) => currentUser?.status === option.value)
      : { value: 'OPEN', label: 'Open' };
    return data;
  }, [currentUser, personList]);

  const [roleOption, setRoleOption] = useState<any>('');

  for (let i = 0; i < exchangeData?.length; i++) {
    ExchangeOptions.push({
      label: exchangeData[i]?.name,
      value: exchangeData[i]?._id,
    });
  }

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: any = useMemo(
    () => ({
      password: personList?.password || '',
      investorPassword: personList?.investorPassword || '',
      name: currentUser?.name || personList?.name || '',
      ID: currentUser?.ID || personList?.ID || '',
      positionMinTime: currentUser?.positionMinTime || personList?.positionMinTime || 0,
      exchangeGroup: defaultExchangeOptions || '',
      allowedExchange: defaultAllowedExchange || [],
      insertCustomBet: currentUser?.insertCustomBet || personList?.insertCustomBet || false,
      exchangeList: [],
      editBet: currentUser?.editBet || personList?.editBet || false,
      creditLimit: currentUser?.user_balance?.creditLimit || 0,
      role: currentUser?.role || personList?.role?.label,
      deleteBet: currentUser?.deleteBet || personList?.deleteBet || false,
      leverageXY: defaultLeverageOptions || '',
      isActive: currentUser?.isActive || null,
      status: defaultStatus || '',
      isBrokerageAllowed: currentUser?.isBrokerageAllowed || false,
      limitOfAddUser: currentUser?.limitOfAddUser || personList?.limitOfAddUser || null,
      limitOfAddMaster: currentUser?.limitOfAddMaster || personList?.limitOfAddMaster || null,
      brokerageTemplate: currentUser?.brokerageTemplate || personList?.brokerageTemplate || null,
    }),
    [defaultAllowedExchange, defaultExchangeOptions]
  );

  const [fields, setFields] = useState<AllowedExChangeInterface[]>(() => {
    if (currentUser) {
      return currentUser?.exchangeList.map(({ allowedExchange, exchangeGroup }: any) => ({
        allowedExchange,
        exchangeGroup,
        index: uuidv4(),
      }));
    }
    return [{ allowedExchange: '', exchangeGroup: '', index: uuidv4() }];
  });

  const handleChange = (index: string, event: any) => {
    const { name, value } = event.target;

    const newFields = [...fields];

    const fieldToUpdate: any = newFields.find((field) => field.index === index);
    if (fieldToUpdate) {
      fieldToUpdate[name] = value;
      setFields(newFields);
    }
  };
  const handleAddField = () => {
    setFields([...fields, { allowedExchange: '', exchangeGroup: '', index: uuidv4() }]);
  };
  const handleRemoveExchange = (index: string) => {
    const updatedFields = fields.filter((field) => field.index !== index);
    setFields(updatedFields);
  };

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
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  useEffect(() => {
    if (currentUser) {
      setValue('exchangeList', currentUser?.exchangeList);
    }
  }, []);

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
      setRoleOption(value?.role);
    } else {
      setRoleOption(value?.role?.value);
    }
    if (value?.role?.value === 'SUPER_MASTER') {
      setValue('limitOfAddMaster', currentUser?.limitOfAddMaster || '');
      setValue('limitOfAddUser', currentUser?.limitOfAddUser || '');
    }
    if (value?.role?.value === 'MASTER') {
      setValue('limitOfAddUser', currentUser?.limitOfAddUser || '');
    }
    if (value?.role?.value === 'USER') {
      setValue('brokerage', currentUser?.brokerage || '');
      setValue('investorPassword', currentUser?.investorPassword || '');
    }
  }, [setValue, value.role]);

  const getExchangeListForPerson: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getExchangeListForSuperMaster;
      case 'SUPER_MASTER':
        return adminService.getExchangeListForMaster;
      case 'MASTER':
        return adminService.getExchangeListForUser;
      default:
        return paths;
    }
  };

  // get exchange list
  const { mutate } = useMutation(getExchangeListForPerson(role), {
    onSuccess: (data: any) => {
      setExchangeData(data?.data?.rows);
      dispatch(addExchanges(data?.data?.rows));
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });
  const createMasterByRole: any = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.createMaster;
      case 'SUPER_MASTER':
        return superMasterService.createMaster;
      default:
        return paths;
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
        return paths;
    }
  };

  // CREATE SUPER_MASTER
  const { mutate: createSuperMaster } = useMutation(adminService.createSuperMaster, {
    onSuccess: (data) => {
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

  // UPDATE SUPER_MASTER
  const { mutate: updateSuperMaster } = useMutation(adminService.updateSuperMaster, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message ?? 'Data Updated Successfully', { variant: 'success' });
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

  // CREATE MASTER
  const { mutate: createMaster } = useMutation(createMasterByRole(role), {
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

  // UPDATE MASTER
  const { mutate: updateMaster }: any = useMutation(updateMasterByRole(role), {
    onSuccess: (data: any) => {
      enqueueSnackbar(data?.message ?? 'Data Updated Successfully', { variant: 'success' });
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

  // CREATE USER
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

  // UPDATE USER
  const { mutate: updateUser }: any = useMutation(updateUserByRole(role), {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (roleOption === 'SUPER_MASTER') {
        if (currentUser) {
          await updateSuperMaster({ ...data, _id: currentUser?._id, fields });
        } else {
          await createSuperMaster({ ...data, fields });
        }
      }
      if (roleOption === 'MASTER') {
        if (currentUser) {
          await updateMaster({ ...data, _id: currentUser?._id, fields });
        } else {
          await createMaster({ ...data, fields });
        }
      }
      if (roleOption === 'USER') {
        if (value.isBrokerageAllowed) {
          setFieldsValue(fields);
          dispatch(addUser(data));
          setTabValue(1);
        } else {
          if (currentUser) {
            updateUser({ ...data, _id: currentUser?._id, fields });
          } else {
            createUser({ ...data, fields });
          }
        }
        // reset();
      }
    } catch (error) {
      console.log(error);
    }
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
      default:
        return paths;
    }
  };

  const Role: any = RolesOptions(role);

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
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
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
                  {currentUser?.role !== 'USER' && (
                    <RHFTextField
                      isReadOnly={!!isView || currentUser}
                      name="investorPassword"
                      type="password"
                      label="Investor Password"
                    />
                  )}
                </>
              )}
              {roleOption === 'SUPER_MASTER' && (
                <RHFTextField
                  isReadOnly={!!isView}
                  name="limitOfAddMaster"
                  type="number"
                  max={99}
                  label="Limit Of Add Master"
                />
              )}

              {roleOption !== 'USER' && (
                <RHFTextField
                  isReadOnly={!!isView}
                  name="limitOfAddUser"
                  type="number"
                  max={
                    value?.role?.value === 'SUPER_MASTER'
                      ? 5000
                      : value?.role?.value === 'MASTER'
                        ? 500
                        : null
                  }
                  label="Limit Of Add User"
                />
              )}
              {roleOption === 'USER' && (
                <>
                  {/* <RHFTextField
                    isReadOnly={!!isView}
                    name="creditLimit"
                    type="number"
                    label="Credit"
                  /> */}
                  <RHFTextField
                    isReadOnly={!!isView}
                    name="positionMinTime"
                    type="number"
                    defaultValue={currentUser?.positionMinTime ?? null}
                    // value={currentUser?.positionMinTime ?? null}
                    label="Position Min Time"
                  />
                </>
              )}
              <RHFAutocomplete
                name="leverageXY"
                label="Leverage"
                // control={control}
                isReadOnly={!!isView}
                options={LEVERAGE_OPTIONS}
                defaultValue={defaultLeverageOptions}
                data={LEVERAGE_OPTIONS}
                isLabled={false}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />

              {roleOption !== 'USER' && (
                <>
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
                <RHFAutocomplete
                  name="status"
                  label="Status"
                  options={STATUS}
                  defaultValue={defaultStatus}
                  isLabled={false}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  getOptionLabel={(option: any) => option.label}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                />
              )}

              {roleOption === 'USER' && (
                <RHFSwitch
                  name="isBrokerageAllowed"
                  labelPlacement="start"
                  label={
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Brokerage
                    </Typography>
                  }
                  sx={{ width: 0.5 }}
                />
              )}
            </Box>

            <Stack sx={{ mt: 3 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ marginBottom: 1 }}>Allow Exchanges</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexWrap: 'wrap' }}>
                      {fields?.map((field: AllowedExChangeInterface) => (
                        <AllowedExchangeComponent
                          allowedExchange={field?.allowedExchange}
                          exchangeGroup={field?.exchangeGroup}
                          index={field?.index}
                          Exchange={Exchange}
                          handleChange={handleChange}
                          fields={fields}
                          handleRemoveExchange={handleRemoveExchange}
                        />
                      ))}
                    </Box>
                    <Grid xs={6}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                          mt: 1,
                        }}
                      >
                        <LoadingButton
                          variant="contained"
                          disabled={
                            !fields.every(
                              (field) => field.allowedExchange && field.exchangeGroup
                            ) || fields.length === Exchange.length
                          }
                          onClick={() => handleAddField()}
                        >
                          ADD EXCHANGE
                        </LoadingButton>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Stack>

            {!isView && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser
                    ? `Create ${
                        roleOption === 'SUPER_MASTER'
                          ? 'Super Master'
                          : roleOption === 'MASTER'
                            ? 'Master'
                            : roleOption === 'USER'
                              ? 'User'
                              : 'User'
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
