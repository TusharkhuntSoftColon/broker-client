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
import exchangeService from 'src/services/exchangeService';

import FormProvider, {
  RHFAutocomplete,
  RHFCheckbox,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

import { SUPER_MASTER_ROLE } from 'src/_mock/_superMaster';
import superMasterService from 'src/services/superMasterService';
import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem | any;
  isView?: any;
};

export default function SuperMasterNewEditForm({ currentUser, isView }: Props) {
  const router = useRouter();

  const [exchangeData, setExchangeData] = useState<any>();

  const [exchange, setExchange] = useState<any>([]);

  const adminData = useSelector((data: any) => data?.admin?.adminList);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const NewSuperMasterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    exchangeGroup: Yup.string().required('Leverage Y is required'),
    allowedExchange: Yup.array().min(1, 'Must have at least 1 exchange'),
    limitOfAddMaster: Yup.number().required('Limit Of Add Master is required'),
    limitOfAddUser: Yup.number().required('Limit Of Add User is required'),
    leverageX: Yup.number().required('Leverage X is required'),
    leverageY: Yup.number().required('Leverage Y is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      password: currentUser?.password || '',
      ID: currentUser?.ID || '',
      exchangeGroup: currentUser?.exchangeGroup || '',
      allowedExchange: currentUser?.allowedExchange || [],
      insertCustomBet: currentUser?.insertCustomBet || false,
      editBet: currentUser?.editBet || false,
      role: currentUser?.role || '',
      deleteBet: currentUser?.deleteBet || false,
      limitOfAddMaster: currentUser?.limitOfAddMaster || null,
      limitOfAddUser: currentUser?.limitOfAddUser || null,
      leverageX: currentUser?.leverageX || null,
      leverageY: currentUser?.leverageY || null,
      isActiveAdmin: currentUser?.isActiveAdmin || true,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewSuperMasterSchema),
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

  // create ADMIN
  const { mutate: createSuperMaster } = useMutation(superMasterService.createSuperMaster, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(paths.dashboard.superMaster.list);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  // get exchange list
  const { mutate } = useMutation(exchangeService.getExchangeList, {
    onSuccess: (data) => {
      setExchangeData(data?.data?.rows);
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // await createAdmin(data);
      if (currentUser) {
        const adminID = currentUser.id;
        // dispatch(updateAdmin({ id: adminID, updatedData: data }));
      } else {
        // dispatch(addAdmin(data));
        createSuperMaster(data);
      }
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
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

  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  // const handleFilterRole = useCallback(
  //   (event: SelectChangeEvent<string[]>) => {
  //     onFilters(
  //       'role',
  //       typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
  //     );
  //   },
  //   [onFilters]
  // );

  // const Data = ExchangeOptions.find((data: any) => data.value === currentUser?.allowedExchange)
  //   ?.value;

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
              <RHFTextField isReadOnly={!!isView} name="name" label="Full Name" />
              <RHFTextField isReadOnly={!!isView} name="ID" label="User Id" />
              <RHFTextField
                isReadOnly={!!isView}
                name="password"
                type="password"
                label="Password"
              />
              <RHFTextField
                isReadOnly={!!isView}
                name="limitOfAddMaster"
                type="number"
                label="Limit Of Add Master"
              />

              <RHFTextField
                isReadOnly={!!isView}
                name="limitOfAddUser"
                type="number"
                label="Limit Of Add User"
              />

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
                options={EXCHANGE_GROUP.map((data) => data.label)}
                data={EXCHANGE_GROUP}
                isReadOnly={!!isView}
                getOptionLabel={(option: any) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { label } = EXCHANGE_GROUP.filter((data) => data.label === option)[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      {label}
                    </li>
                  );
                }}
              />

              <RHFAutocomplete
                name="allowedExchange"
                label="Allowed Exchange"
                // control={control}
                isReadOnly={!!isView}
                options={ExchangeOption.map((data: any) => data.label)}
                freeSolo
                data={ExchangeOption}
                isLabled={false}
                multiple
                getOptionLabel={(option: any) => option}
                renderOption={(props, option, { selected }) => {
                  const { label } = ExchangeOption.filter((data: any) => data.label === option)[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {label}
                    </li>
                  );
                }}
              />

              <RHFAutocomplete
                name="role"
                label="Role"
                options={SUPER_MASTER_ROLE.map((data) => data.label)}
                data={SUPER_MASTER_ROLE}
                isReadOnly={!!isView}
                getOptionLabel={(option: any) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { label } = SUPER_MASTER_ROLE.filter((data) => data.label === option)[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      {label}
                    </li>
                  );
                }}
              />
              <RHFCheckbox isReadOnly={!!isView} name="insertCustomBet" label="Insert Custom Bet" />
              <RHFCheckbox isReadOnly={!!isView} name="editBet" label="Edit Bet" />
              <RHFCheckbox isReadOnly={!!isView} name="deleteBet" label="Delete Bet" />

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
