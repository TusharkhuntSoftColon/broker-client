import * as Yup from 'yup';
import { useMemo } from 'react';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { STOP_LOSS } from 'src/_mock/_symbol';
import symbolService from 'src/services/symbolService';
import { addSymbol, updateSymbol } from 'src/store/slices/symbol';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { ISymbolItem } from 'src/types/symbol';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: ISymbolItem | any;
  isView?: boolean;
};

export default function SymbolNewEditForm({ currentUser, isView }: Props) {
  console.log({ currentUser });
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    contractSize: Yup.string().required('Contract size is required'),
    currency: Yup.string().required('Currency is required'),
    spread: Yup.number().required('Spread is required'),
    stopLevel: Yup.number().required('Stop Level is required'),
    // calculation: Yup.string().required('Calculation is required'),
    tickSize: Yup.number().required('Tick Size is required'),
    tickValue: Yup.number().required('Tick Value is required'),
    initialMargin: Yup.number().required('InitialMargin is required'),
    maintenanceMargin: Yup.number().required('Maintenance Margin is required'),
    minVolume: Yup.number().required('Minimum Volume is required'),
    maxVolume: Yup.number().required('Maximum Volume is required'),
    // startTradeSessions: Yup.string().required('Maintenance Margin is required'),
    // endTradeSessions: Yup.string().required('Maintenance Margin is required'),
    // startingHour: Yup.string().required('Maintenance Margin is required'),
    // endingHour: Yup.string().required('Maintenance Margin is required'),
    // statusOfScripts: Yup.string().required('Maintenance Margin is required'),
    stAndTp: Yup.mixed<any>().nullable().required('stAndTp is required'),
  });

  // const value = STOP_LOSS.find((data) => data.value === currentUser?.stAndTp)?.value;

  // console.log({ value });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      contractSize: currentUser?.contractSize || '',
      currency: currentUser?.currency || '',
      spread: currentUser?.spread || '',
      stopLevel: currentUser?.stopLevel || '',
      tickSize: currentUser?.tickSize || '',
      tickValue: currentUser?.tickValue || '',
      initialMargin: currentUser?.initialMargin || '',
      maintenanceMargin: currentUser?.maintenanceMargin || '',
      minVolume: currentUser?.minVolume || '',
      maxVolume: currentUser?.maxVolume || '',
      stAndTp: currentUser?.stAndTp || null,
      limitOfAddUser: currentUser?.limitOfAddUser || '',
      leverageX: currentUser?.leverageX || '',
      leverageY: currentUser?.leverageY || '',
    }),
    [currentUser]
  );

  const dispatch = useDispatch();

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

  // const value = watch();

  // useEffect(() => {
  //   if (currentUser) {
  //     setValue('name', currentUser?.name || '');
  //     setValue('contractSize', currentUser?.contractSize || '');
  //     setValue('currency', currentUser?.currency || '');
  //     setValue('spread', currentUser?.spread || '');
  //     setValue('stopLevel', currentUser?.stopLevel || '');
  //     // setValue('calculation', currentUser?.calculation || '');
  //     setValue('tickSize', currentUser?.tickSize || '');
  //     setValue('tickValue', currentUser?.tickValue || '');
  //     setValue('initialMargin', currentUser?.initialMargin || '');
  //     setValue('maintenanceMargin', currentUser?.maintenanceMargin || '');
  //     setValue('minVolume', currentUser?.minVolume || '');
  //     setValue('maxVolume', currentUser?.maxVolume || '');
  //     // setValue('startTradeSessions', currentUser?.startTradeSessions || '');
  //     // setValue('endTradeSessions', currentUser?.endTradeSessions || '');
  //     // setValue('startingHour', currentUser?.startingHour || '');
  //     // setValue('endingHour', currentUser?.endingHour || '');
  //     // setValue('statusOfScripts', currentUser?.statusOfScripts || '');
  //     setValue('stAndTp', currentUser?.stAndTp || '');
  //   }
  // }, [currentUser]);

  // create symbol
  const { mutate: createSymbol } = useMutation(symbolService.addSymbol, {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(paths.dashboard.symbol.root);
    },
    onError: (error: any) => {
      console.log({ error });
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  // create symbol
  // const { mutate: updateSymbol } = useMutation(symbolService.updateSymbol, {
  //   onSuccess: (data) => {
  //     enqueueSnackbar(data?.message, { variant: 'success' });
  //     router.push(paths.dashboard.symbol.root);
  //   },
  //   onError: (error: any) => {
  //     if (isAxiosError(error)) {
  //       enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
  //     }
  //   },
  // });

  const onSubmit = handleSubmit(async (data: any) => {
    // console.log('Worked');
    try {
      console.log({ data });

      if (currentUser) {
        // await updateSymbol({ data, _id: currentUser._id });
        dispatch(updateSymbol({ id: currentUser?.id, updatedData: data }));
      } else {
        // await createSymbol(data);
        dispatch(addSymbol(data));
      }
      router.push(paths.dashboard.symbol.root);

      // currentUser == undefined ? await createSymbol(data) : await updateSymbol(data);
    } catch (error) {
      console.log({ error });
    }
    // const values = watch();
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
              <RHFTextField isReadOnly={!!isView} name="contractSize" label="Contract Size" />
              <RHFTextField isReadOnly={!!isView} name="currency" label="Currency" />
              <RHFTextField isReadOnly={!!isView} type="number" name="spread" label="Spread" />
              <RHFTextField
                isReadOnly={!!isView}
                type="number"
                name="stopLevel"
                label="Stop Level"
              />
              {/* <RHFTextField isReadOnly={!!isView} name="calculation" label="Calculation" /> */}
              <RHFTextField isReadOnly={!!isView} type="number" name="tickSize" label="Tick Size" />
              <RHFTextField
                isReadOnly={!!isView}
                type="number"
                name="tickValue"
                label="Tick Value"
              />
              <RHFTextField
                isReadOnly={!!isView}
                type="number"
                name="initialMargin"
                label="Inrial Margin"
              />
              <RHFTextField
                isReadOnly={!!isView}
                name="maintenanceMargin"
                label="Maintenance Margin"
                type="number"
              />
              <RHFTextField
                isReadOnly={!!isView}
                type="number"
                name="minVolume"
                label="Minimum Volume"
              />
              <RHFTextField
                isReadOnly={!!isView}
                type="number"
                name="maxVolume"
                label="Maximum Volume"
              />

              {/* <RHFAutocomplete
                name="exhangeGroup"
                label="Exchange Group"
                options={[].map((data) => data)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (data) => data.label === option
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

              {/* <RHFAutocomplete
                name="startTradeSessions"
                isReadOnly={!!isView}
                label="Start Trade Sessions"
                options={TRADE_SESSIONS_DAYS.map((data) => data.label)}
                getOptionLabel={(option: any) => option}
                renderOption={(props, option) => {
                  const { label } = TRADE_SESSIONS_DAYS.filter((data) => data.label === option)[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      {label}
                    </li>
                  );
                }}
              /> */}

              {/* <RHFAutocomplete
                name="startTradeSessions"
                label="Start Trade Sessions"
                control={control}
                options={TRADE_SESSIONS_DAYS.map((data) => data.label)}
                getOptionLabel={(option: any) => option}
                renderOption={(props, option) => {
                  const { value, label } = TRADE_SESSIONS_DAYS.filter(
                    (data) => data.label === option
                  )[0];
                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={value}>
                      {label}
                    </li>
                  );
                }}
              />
              <RHFAutocomplete
                name="endTradeSessions"
                label="End Trade Sessions"
                control={control}
                isReadOnly={isView ? true : false}
                options={TRADE_SESSIONS_DAYS.map((data) => data.label)}
                getOptionLabel={(option: any) => option}
                renderOption={(props, option) => {
                  const { label } = TRADE_SESSIONS_DAYS.filter((data) => data.label === option)[0];

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
                control={control}
                isReadOnly={isView ? true : false}
                options={TRADE_HOURS.map((data) => data.label)}
                getOptionLabel={(option: any) => option}
                renderOption={(props, option) => {
                  const { label } = TRADE_HOURS.filter((data) => data.label === option)[0];

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
                control={control}
                isReadOnly={isView ? true : false}
                options={TRADE_HOURS.map((data) => data.label)}
                getOptionLabel={(option: any) => option}
                renderOption={(props, option) => {
                  const { label } = TRADE_HOURS.filter((data) => data.label === option)[0];

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
                control={control}
                label="Status Of Scripts"
                isReadOnly={isView ? true : false}
                options={STATUS_OF_SCRIPTS.map((data) => data.label)}
                getOptionLabel={(option: any) => option}
                renderOption={(props, option) => {
                  const { label } = STATUS_OF_SCRIPTS.filter(
                    (country) => country.label === option
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
              /> */}

              <RHFAutocomplete
                name="stAndTp"
                label="Stop Loss"
                // control={control}
                isReadOnly={!!isView}
                options={STOP_LOSS}
                isLabled={false}
                // value={STOP_LOSS.find((data) => data.value === currentUser?.stAndTp)?.label}
                // data={STOP_LOSS}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {currentUser === undefined ? 'Create Symbol' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
