import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete, RHFCheckbox } from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';
import { ALLOWED_EXCHANGE, EXCHANGE_GROUP, Exchanges, USER_ROLE } from 'src/_mock';
import { useMutation } from '@tanstack/react-query';
import adminService from 'src/services/adminService';
import { isAxiosError } from 'axios';
import { Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import exchangeService from 'src/services/exchangeService';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, updateAdmin } from 'src/store/slices/admin';
import OutlinedInput from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem | any;
  isView?: any;
};

export default function UserNewEditForm({ currentUser, isView }: Props) {
  const router = useRouter();

  const [exchangeData, setExchangeData] = useState<any>();

  const [exchange, setExchange] = useState<any>([]);

  const adminData = useSelector((data: any) => data?.admin?.adminList);

  // console.log({ adminData });

  console.log({ currentUser });

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ID: Yup.string().required('User Id is required'),
    role: Yup.string().required('Role is required'),
    exchangeGroup: Yup.string().required('Leverage Y is required'),
    allowedExchange: Yup.string().required('Allowed Exchange Y is required'),
    Domain: Yup.string().required('Domain is required'),
    // insertCustomBet: Yup.string().required('Insert Custom Bet is required'),
    // editBet: Yup.string().required('Edit Bet is required'),
    // deleteBet: Yup.string().required('Delete Bet is required'),
    limitOfAddSuperMaster: Yup.number().required('Limit Of Add Super Master Bet is required'),
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
      Domain: currentUser?.Domain || '',
      insertCustomBet: currentUser?.insertCustomBet || false,
      editBet: currentUser?.editBet || false,
      role: currentUser?.role || '',
      deleteBet: currentUser?.deleteBet || false,
      limitOfAddSuperMaster: currentUser?.limitOfAddSuperMaster || null,
      limitOfAddMaster: currentUser?.limitOfAddMaster || null,
      limitOfAddUser: currentUser?.limitOfAddUser || null,
      leverageX: currentUser?.leverageX || null,
      leverageY: currentUser?.leverageY || null,
    }),
    [currentUser]
  );

  // console.log({ currentUser });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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

  // console.log({ errors });
  // const values = watch();

  // console.log({ values });

  useEffect(() => {
    if (currentUser) {
      setValue('insertCustomBet', currentUser?.insertCustomBet || false);
      setValue('deleteBet', currentUser?.deleteBet || false);
      setValue('editBet', currentUser?.editBet || false);
    }
  }, [currentUser, setValue]);

  // create ADMIN
  const { mutate: createAdmin } = useMutation(adminService.createAdmin, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(paths.dashboard.user.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  //get exchange list
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
    console.log({ data });
    console.log({ currentUser });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // await createAdmin(data);
      // console.log({ currentUser });
      if (currentUser) {
        console.log('UPDATE CALLED');
        const adminID = currentUser.id;
        dispatch(updateAdmin({ id: adminID, updatedData: data }));
      } else {
        console.log('ADD CALLED');
        dispatch(addAdmin(data));
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

  // console.log({ exchangeData });

  const ExchangeOptions: any = [];

  for (let i = 0; i < exchangeData?.length; i++) {
    ExchangeOptions.push({
      label: exchangeData[i]?.name,
      value: exchangeData[i]?._id,
    });
  }

  console.log({ ExchangeOptions });

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
  //     console.log(event.target.value);
  //     onFilters(
  //       'role',
  //       typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
  //     );
  //   },
  //   [onFilters]
  // );

  const handleFilterRole = (e: any) => {
    console.log(e.target.value);

    exchange.push(e.target.value);
  };

  // const Data = ExchangeOptions.find((data: any) => data.value === currentUser?.allowedExchange)
  //   ?.value;

  // console.log({ Data });
  const handleAllowedExchange = (e: any) => {
    console.log(e);
  };
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid> */}

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
              <RHFTextField isReadOnly={isView ? true : false} name="name" label="Full Name" />
              <RHFTextField isReadOnly={isView ? true : false} name="ID" label="User Id" />
              <RHFTextField
                isReadOnly={isView ? true : false}
                name="password"
                type="password"
                label="Password"
              />
              <RHFTextField isReadOnly={isView ? true : false} name="Domain" label="Domain" />
              <RHFTextField
                isReadOnly={isView ? true : false}
                name="limitOfAddSuperMaster"
                type="number"
                label="Limit Of Add Super Master"
              />

              <RHFTextField
                isReadOnly={isView ? true : false}
                name="limitOfAddMaster"
                type="number"
                label="Limit Of Add Master"
              />

              <RHFTextField
                isReadOnly={isView ? true : false}
                name="limitOfAddUser"
                type="number"
                label="Limit Of Add User"
              />

              <RHFTextField
                isReadOnly={isView ? true : false}
                name="leverageX"
                type="number"
                label="Leverage X"
              />

              <RHFTextField
                isReadOnly={isView ? true : false}
                name="leverageY"
                type="number"
                label="Leverage Y"
              />

              <RHFAutocomplete
                name="exchangeGroup"
                label="Exchange Group"
                options={EXCHANGE_GROUP.map((data) => data.label)}
                data={EXCHANGE_GROUP}
                isReadOnly={isView ? true : false}
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
                control={control}
                isReadOnly={isView ? true : false}
                options={ExchangeOptions.map((data: any) => data.label)}
                data={ExchangeOptions}
                isLabled={true}
                // defaultValue={
                //   ExchangeOptions.find((data: any) => data.value === currentUser?.allowedExchange)
                //     ?.label
                // }
                getOptionLabel={(option: any) => option}
                renderOption={(props, option, { selected }) => {
                  const { label } = ExchangeOptions.filter((data: any) => data.label === option)[0];

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

              {/* <FormControl
                sx={{
                  flexShrink: 0,
                  width: { xs: 1, md: 200 },
                }}
              >
                <InputLabel>Exchange</InputLabel>

                <Select
                  multiple
                  name="allowedExchange"
                  value={currentUser ? currentUser.allowedExchange : []}
                  onChange={(e) => handleFilterRole(e)}
                  input={<OutlinedInput label="Exchange" />}
                  renderValue={(selected) => selected?.map((value: any) => value).join(', ')}
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 240 },
                    },
                  }}
                >
                  {Exchanges.map((option: any) => (
                    <MenuItem key={option.label} value={option.label}>
                      <Checkbox
                        disableRipple
                        size="small"
                        checked={Exchanges.includes(option.label)}
                      />
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}

              {/* <RHFAutocomplete
                name="leverage"
                label="Leverage"
                isReadOnly={isView ? true : false}
                options={[].map((country) => country)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              /> */}

              <RHFAutocomplete
                name="role"
                label="Role"
                options={USER_ROLE.map((data) => data.label)}
                data={USER_ROLE}
                isReadOnly={isView ? true : false}
                getOptionLabel={(option: any) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { label } = USER_ROLE.filter((data) => data.label === option)[0];

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
              <RHFCheckbox
                isReadOnly={isView ? true : false}
                name="insertCustomBet"
                label="Insert Custom Bet"
              />
              <RHFCheckbox isReadOnly={isView ? true : false} name="editBet" label="Edit Bet" />
              <RHFCheckbox isReadOnly={isView ? true : false} name="deleteBet" label="Delete Bet" />
            </Box>

            {!isView && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create Admin' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
