/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, Typography, AccordionDetails, AccordionSummary } from '@mui/material';

import { paths } from 'src/routes/paths';

import { addUser } from 'src/store/slices/person';
import adminService from 'src/services/adminService';
import { addExchanges } from 'src/store/slices/admin';
import masterService from 'src/services/masterService';
import { EXCHANGE_GROUP, LEVERAGE_OPTIONS } from 'src/_mock';
import superMasterService from 'src/services/superMasterService';
import { ADMIN_ROLE, MASTER_ROLE, SUPER_MASTER_ROLE } from 'src/_mock/_person';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFCheckbox,
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem | any;
  isView?: any;
  path?: any;
  setTabValue?: any;
};

export default function PersonNewEditForm({ currentUser, isView, path, setTabValue }: Props) {
  const ExchangeOptions: any = [];
  const role = useSelector((data: any) => data.auth.role);
  const ExchangeList = useSelector((data: any) => data?.admin?.exchangeList);

  const [exchangeData, setExchangeData] = useState<any>();

  const personList = useSelector((data: any) => data?.person?.personData);
  console.log('personList : ', personList);

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

  console.log({ currentUser });

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

      console.log({ data });
      return data;
    },
    [currentUser, personList, EXCHANGE_GROUP]
  );

  console.log({ defaultExchangeOptions });

  const defaultLeverageOptions = useMemo(() => {
    const data = currentUser
      ? LEVERAGE_OPTIONS.filter(
          (option: any) => currentUser?.leverageXY.slice(1, -1) === option.value
        )[0]
      : LEVERAGE_OPTIONS.filter(
          (option: any) => personList?.leverageXY?.value === option?.value
        )[0];
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

  const NewSuperMasterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    role: Yup.mixed<any>().nullable().required('Role is required'),
    exchangeGroup: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
    allowedExchange: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
    limitOfAddMaster: Yup.number().required('Limit Of Add Master is required'),
    limitOfAddUser: Yup.number().required('Limit Of Add User is required'),
    leverageXY: Yup.mixed<any>().nullable().required('Leverage  is required'),
  });
  const NewMasterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    role: Yup.mixed<any>().nullable().required('Role is required'),
    exchangeGroup: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
    allowedExchange: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
    limitOfAddUser: Yup.number().required('Limit Of Add User is required'),
    leverageXY: Yup.mixed<any>().nullable().required('Leverage  is required'),
  });
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    role: Yup.mixed<any>().nullable().required('Role is required'),
    exchangeGroup: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
    allowedExchange: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
    leverageXY: Yup.mixed<any>().nullable().required('Leverage  is required'),
    // brokerageTemplate:Yup.string().required('Brokerage Template is required'),
  });
  console.log(personList);

  const defaultValues: any = useMemo(
    () => ({
      password: personList?.password || '',
      investorPassword: personList?.investorPassword || '',
      name: currentUser?.name || personList?.name || '',
      ID: currentUser?.ID || personList?.ID || '',
      exchangeGroup: defaultExchangeOptions || '',
      allowedExchange: defaultAllowedExchange || [],
      insertCustomBet: currentUser?.insertCustomBet || personList?.insertCustomBet || false,
      exchangeList: [],
      editBet: currentUser?.editBet || personList?.editBet || false,
      role: currentUser?.role || personList?.role?.label,
      deleteBet: currentUser?.deleteBet || personList?.deleteBet || false,
      leverageXY: defaultLeverageOptions || '',
      isActive: currentUser?.isActive || null,
      limitOfAddUser: currentUser?.limitOfAddUser || personList?.limitOfAddUser || null,
      limitOfAddMaster: currentUser?.limitOfAddMaster || personList?.limitOfAddMaster || null,
      brokerageTemplate: currentUser?.brokerageTemplate || personList?.brokerageTemplate || null,
    }),
    [defaultAllowedExchange, defaultExchangeOptions]
  );

  const allowedExchangeComponent = (index: any) => (
    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
      <RHFAutocomplete
        sx={{ width: '100%' }}
        name="allowedExchange"
        label="Allowed Exchange"
        // control={control}
        isReadOnly={!!isView}
        options={ExchangeOptions}
        freeSolo
        data={ExchangeOptions}
        defaultValue={currentUser && defaultAllowedExchange(index)}
        isLabled={false}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option: any) => option.label}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        )}
      />
      <RHFAutocomplete
        sx={{ width: '100%' }}
        name="exchangeGroup"
        label="Exchange Group"
        // control={control}
        isReadOnly={!!isView}
        options={EXCHANGE_GROUP}
        freeSolo
        defaultValue={currentUser && defaultExchangeOptions(index)}
        data={EXCHANGE_GROUP}
        isLabled={false}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option: any) => option.label}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        )}
      />
    </Box>
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
    watch,
    control,
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

  const { append, remove } = useFieldArray({
    name: 'exchangeList',
    control,
  });
  const [brokerageDataList, setBrokerageDataList] = useState([]);

  const [components, setComponents] = useState([]);

  const addNewComponent = () => {
    const newComponents: any = [...components];
    if (value.allowedExchange?.label && value?.exchangeGroup.label) {
      append({
        allowedExchange: value?.allowedExchange?.value,
        exchangeGroup: value?.exchangeGroup?.value,
      });
      setValue('allowedExchange', {});
      setValue('exchangeGroup', {});
      setComponents(newComponents);
    }
  };

  const removeComponent = () => {
    const lastPos = value?.exchangeList[value?.exchangeList.length - 1];

    const lastValueOfAllowedExchange = Exchange.filter(
      (data) => data.value === lastPos.allowedExchange
    )[0];
    const lastValueOfExchangeGroup = Exchange.filter(
      (data) => data.value === lastPos.exchangeGroup
    )[0];

    if (value.exchangeList?.length >= 1) {
      if (
        !(value.exchangeList.length < components.length) ||
        value.exchangeList.length === components.length
      ) {
        setValue('allowedExchange', lastValueOfAllowedExchange);
        setValue('exchangeGroup', lastValueOfExchangeGroup);
        remove(value.exchangeList.length - 1);
      }
    } else {
      alert('At least one component must remain!');
    }
  };

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
      // Add other cases for different roles with their respective paths
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  // get exchange list
  const { mutate } = useMutation(getExchangeListForPerson(role), {
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

  const getBrokerageByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.getBrokerageList;
      case 'SUPER_MASTER':
        return superMasterService.getBrokerageList;
      case 'MASTER':
        return masterService.getBrokerageList;
      default:
        return masterService.getBrokerageList;
    }
  };

  // Get All Brokerage
  const { mutate: brokerageList } = useMutation(getBrokerageByRole(role), {
    onSuccess: (data) => {
      setBrokerageDataList(data?.data?.rows);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    try {
      dispatch(addUser(data));
      setTabValue(1);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    mutate();
    brokerageList();
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
                      {allowedExchangeComponent(0)}
                      {value?.exchangeList?.map((data: any, index: any) =>
                        allowedExchangeComponent(index + 1)
                      )}
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
                          disabled={!(Exchange.length - 1 > value.exchangeList?.length)}
                          onClick={() => addNewComponent()}
                        >
                          ADD EXCHANGE
                        </LoadingButton>
                        <LoadingButton
                          disabled={!(value.exchangeList?.length >= 1)}
                          variant="contained"
                          onClick={() => removeComponent()}
                        >
                          REMOVE EXCHANGE
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
