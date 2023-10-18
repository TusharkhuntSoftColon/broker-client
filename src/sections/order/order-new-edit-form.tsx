import * as Yup from 'yup';
import { useMemo } from 'react';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import symbolService from 'src/services/symbolService';
import { STOP_LOSS, TRADE_HOURS, STATUS_OF_SCRIPTS, TRADE_SESSIONS_DAYS } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { IOrderItem } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IOrderItem | any;
  isView?: any;
};

export default function OrderNewEditForm({ currentUser, isView }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    contractSize: Yup.string().required('Contract size is required'),
    currency: Yup.string().required('Currency is required'),
    spread: Yup.string().required('Spread is required'),
    stopsLevel: Yup.string().required('StopsLevel is required'),
    calculation: Yup.string().required('Calculation is required'),
    tickSize: Yup.string().required('Tick Size is required'),
    tickValue: Yup.string().required('Tick Value is required'),
    inrialMargin: Yup.string().required('inrialMargin is required'),
    maintenanceMargin: Yup.string().required('Maintenance Margin is required'),
    minimumVolume: Yup.string().required('Minimum Volume is required'),
    maximumVolume: Yup.string().required('Maximum Volume is required'),
    startTradeSessions: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    endTradeSessions: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    startingHour: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    endingHour: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    statusOfScripts: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    stopLoss: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    // leverage: Yup.string().required("Leverage is required")
  });

  console.log(currentUser);
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      contractSize: currentUser?.contractSize || '',
      currency: currentUser?.currency || '',
      spread: currentUser?.spread || '',
      stopLevel: currentUser?.stopLevel || '',
      calculation: currentUser?.calculation || '',
      tickSize: currentUser?.tickSize || '',
      tickValue: currentUser?.tickValue || '',
      inrialMargin: currentUser?.inrialMargin || '',
      maintenanceMargin: currentUser?.maintenanceMargin || '',
      mimVolume: currentUser?.mimVolume || '',
      maxVolume: currentUser?.maxVolume || '',
      startTradeSessions: currentUser?.startTradeSessions || '',
      endTradeSessions: currentUser?.endTradeSessions || '',
      startingHour: currentUser?.startingHour || '',
      endingHour: currentUser?.endingHour || '',
      statusOfScripts: currentUser?.statusOfScripts || '',
      stopLoss: currentUser?.stopLoss || '',
    }),
    [currentUser]
  );

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
    formState: { isSubmitting },
  } = methods;

  // create symbol
  const { mutate: createSymbol } = useMutation(symbolService.addSymbol, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(paths.dashboard.symbol.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  // create symbol
  const { mutate: updateSymbol } = useMutation(symbolService.updateSymbol, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(paths.dashboard.symbol.root);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    // const values = watch();
    // console.log({ values });
    currentUser == undefined ? createSymbol(data) : updateSymbol(data);
    // try {

    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
    //   router.push(paths.dashboard.user.list);
    //   console.info('DATA', data);
    // } catch (error) {
    //   console.error(error);
    // }
  });

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
              <RHFTextField isReadOnly={!!isView} name="name" label="Name" />
              <RHFTextField
                isReadOnly={!!isView}
                name="contractSize"
                label="Contract Size"
              />
              <RHFTextField isReadOnly={!!isView} name="currency" label="Currency" />
              <RHFTextField isReadOnly={!!isView} name="spread" label="Spread" />
              <RHFTextField
                isReadOnly={!!isView}
                name="stopLevel"
                label="Stops Level"
              />
              <RHFTextField
                isReadOnly={!!isView}
                name="calculation"
                label="Calculation"
              />
              <RHFTextField isReadOnly={!!isView} name="tickSize" label="Tick Size" />
              <RHFTextField
                isReadOnly={!!isView}
                name="tickValue"
                label="Tick Value"
              />
              <RHFTextField
                isReadOnly={!!isView}
                name="inrialMargin"
                label="I-nrial Margin"
              />
              <RHFTextField
                isReadOnly={!!isView}
                name="maintenanceMargin"
                label="Maintenance Margin"
              />
              <RHFTextField
                isReadOnly={!!isView}
                name="mimVolume"
                label="Minimum Volume"
              />
              <RHFTextField
                isReadOnly={!!isView}
                name="maxVolume"
                label="Maximum Volume"
              />

              {/* <RHFAutocomplete
                name="exhangeGroup"
                label="Exchange Group"
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
                name="startTradeSessions"
                label="Start Trade Sessions"
                options={TRADE_SESSIONS_DAYS}
                defaultValue={[TRADE_SESSIONS_DAYS[0]]}
                getOptionLabel={(option: any) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => {
                  const { label } = TRADE_SESSIONS_DAYS.filter(
                    (country) => country.label === option.label
                  )[0];

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
                name="endTradeSessions"
                label="End Trade Sessions"
                options={TRADE_SESSIONS_DAYS}
                defaultValue={[TRADE_SESSIONS_DAYS[0]]}
                getOptionLabel={(option: any) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => {
                  const { label } = TRADE_SESSIONS_DAYS.filter(
                    (country) => country.label === option.label
                  )[0];

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
                name="startingHour"
                label="Starting hour"
                options={TRADE_HOURS}
                defaultValue={[TRADE_HOURS[0]]}
                getOptionLabel={(option: any) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => {
                  const { label } = TRADE_HOURS.filter(
                    (country) => country.label === option.label
                  )[0];

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
                name="endingHour"
                label="Ending Hour"
                options={TRADE_HOURS}
                defaultValue={[TRADE_HOURS[0]]}
                getOptionLabel={(option: any) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => {
                  const { label } = TRADE_HOURS.filter(
                    (country) => country.label === option.label
                  )[0];

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
                name="statusOfScripts"
                label="Status Of Scripts"
                options={STATUS_OF_SCRIPTS}
                defaultValue={[STATUS_OF_SCRIPTS[0]]}
                getOptionLabel={(option: any) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => {
                  const {label} = STATUS_OF_SCRIPTS.filter(
                    (country) => country.label === option.label
                  )[0];

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
                name="stopLoss"
                label="Stop Loss"
                options={STOP_LOSS}
                defaultValue={[STOP_LOSS[0]]}
                getOptionLabel={(option: any) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => {
                  const { label } = STOP_LOSS.filter(
                    (country) => country.label === option.label
                  )[0];

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
            </Box>

            {!isView && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create Symbol' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
