import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';
import { useMutation } from '@tanstack/react-query';
import exchangeService from 'src/services/exchangeService';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { isAxiosError } from 'axios';
import { STATUS_OF_EXCHANGE, STOP_LOSS } from 'src/_mock/_exchange';
import { IExchangeItem } from 'src/types/exchange';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  isView?: any;
  currentUser?: IExchangeItem;
  getFunction?: any;
};

export default function ExchangeQuickEditForm({
  getFunction,
  currentUser,
  open,
  onClose,
  isView,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  console.log({ currentUser });

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    statusOfExchange: Yup.string().required('Status Of Exchange is required'),
    stAndTp: Yup.string().required('Stop Loss is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      statusOfExchange: currentUser?.statusOfExchange || '',
      stAndTp: currentUser?.stAndTp || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  //create exhange
  const { mutate: createExchange } = useMutation(exchangeService.addExchange, {
    onSuccess: (data) => {
      getFunction();
      enqueueSnackbar(data?.message, { variant: 'success' });
      onClose();
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  //update exchnage
  const { mutate: updateExchange } = useMutation(exchangeService.updateSymbol, {
    onSuccess: (data) => {
      onClose();
      getFunction();
      enqueueSnackbar(data?.message, { variant: 'success' });
      console.log('inside success functiono');
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      console.log(error);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    try {
      if (currentUser) {
        updateExchange({ data, _id: currentUser?._id });
      } else {
        createExchange(data);
      }
    } catch (error) {
      console.log({ error });
    }
  });

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser?.name || '');
    }
  }, [currentUser, setValue]);

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 500 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{currentUser ? 'Update Exchange' : 'Add Exchange'}</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            mt={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          >
            {/* <RHFSelect name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect> */}

            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}

            <RHFTextField name="name" label="Name" />
            {/* <RHFTextField name="email" label="Email Address" /> */}
            {/* <RHFTextField name="phoneNumber" label="Phone Number" /> */}

            <RHFAutocomplete
              name="statusOfExchange"
              label="Status Of Exchange"
              control={control}
              isReadOnly={isView ? true : false}
              options={STATUS_OF_EXCHANGE.map((data) => data.label)}
              data={STATUS_OF_EXCHANGE}
              getOptionLabel={(option: any) => option}
              renderOption={(props, option) => {
                const { label } = STATUS_OF_EXCHANGE.filter((data) => data.label === option)[0];

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
              name="stAndTp"
              label="Stop Loss"
              control={control}
              isReadOnly={isView ? true : false}
              options={STOP_LOSS.map((data) => data.label)}
              data={STOP_LOSS}
              getOptionLabel={(option: any) => option}
              renderOption={(props, option) => {
                const { label } = STOP_LOSS.filter((data) => data.label === option)[0];

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

            {/* <RHFAutocomplete
              name="country"
              label="Country"
              options={countries.map((country) => country.label)}
              getOptionLabel={(option) => option}
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

            {/* <RHFTextField name="state" label="State/Region" /> */}
            {/* <RHFTextField name="city" label="City" /> */}
            {/* <RHFTextField name="address" label="Address" /> */}
            {/* <RHFTextField name="zipCode" label="Zip/Code" /> */}
            {/* <RHFTextField name="company" label="Company" /> */}
            {/* <RHFTextField name="role" label="Role" /> */}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentUser ? 'Update' : 'Add'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
