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
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import symbolService from 'src/services/symbolService';
import { STOP_LOSS, SYMBOL_CURRENCY } from 'src/_mock/_symbol';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { ISymbolItem } from 'src/types/symbol';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: ISymbolItem | any;
  isView?: boolean;
};

export default function SymbolNewEditForm({ currentUser, isView }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    contractSize: Yup.string().required('Contract size is required'),
    currency: Yup.mixed<any>().nullable().required('Currency is required'),
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
      currency: currentUser?.currency || null,
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
      isActive: currentUser?.isActive || null,
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

  const onSubmit = handleSubmit(async (data: any) => {
    // console.log('Worked');
    try {
      if (currentUser) {
        await updateSymbol({ data, _id: currentUser._id });
        // dispatch(updateSymbol({ id: currentUser?.id, updatedData: data }));
      } else {
        await createSymbol(data);
        // dispatch(addSymbol(data));
      }
      router.push(paths.dashboard.symbol.root);

      // currentUser == undefined ? await createSymbol(data) : await updateSymbol(data);
    } catch (error) {
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
              {/* <RHFTextField isReadOnly={!!isView} name="currency" label="Currency" /> */}
              <RHFAutocomplete
                name="currency"
                label="Currency"
                // control={control}
                isReadOnly={!!isView}
                options={SYMBOL_CURRENCY}
                isLabled={false}
                defaultValue={SYMBOL_CURRENCY.find((data) => data.value === currentUser?.currency)}
                // data={STOP_LOSS}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
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
                label="Initial Margin"
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

              <RHFAutocomplete
                name="stAndTp"
                label="Stop Loss"
                // control={control}
                isReadOnly={!!isView}
                options={STOP_LOSS}
                isLabled={false}
                defaultValue={STOP_LOSS.find((data) => data.value === currentUser?.stAndTp)}
                // data={STOP_LOSS}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />

              {currentUser && (
                <RHFSwitch
                  name="isActive"
                  labelPlacement="start"
                  label={
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Active or In Active Symbol
                    </Typography>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              {!isView && (
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {currentUser === undefined ? 'Create Symbol' : 'Save Changes'}
                </LoadingButton>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
