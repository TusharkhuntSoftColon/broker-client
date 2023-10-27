import * as Yup from 'yup';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import symbolService from 'src/services/symbolService';
import exchangeService from 'src/services/exchangeService';
import { STOP_LOSS, STATUS_OF_EXCHANGE } from 'src/_mock/_exchange';
import { addExchange, updateExchange } from 'src/store/slices/exchange';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

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

  const dispatch = useDispatch();

  const [symbolData, setSymbolData] = useState<any>([]);

  console.log({ currentUser });

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    statusOfExchange: Yup.mixed<any>().nullable().required('Status Of Exchange is required'),
    stAndTp: Yup.mixed<any>().nullable().required('stAndTp is required'),
    symbol: Yup.mixed<any>().nullable().required('Symbol is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      statusOfExchange: currentUser?.statusOfExchange || null,
      stAndTp: currentUser?.stAndTp || null,
      symbol: currentUser?.symbol || null,
      isActiveExchange: currentUser?.isActiveExchange || true,
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

  // create exhange
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

  // update exchnage
  // const { mutate: updateExchange } = useMutation(exchangeService.updateExchange, {
  //   onSuccess: (data) => {
  //     getFunction();
  //     enqueueSnackbar(data?.message, { variant: 'success' });
  //     onClose();
  //     console.log('inside success functiono');
  //   },
  //   onError: (error: any) => {
  //     if (isAxiosError(error)) {
  //       enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
  //     }
  //     console.log(error);
  //   },
  // });

  // Get symbol API
  const { mutate } = useMutation(symbolService.getSymbolList, {
    onSuccess: (data) => {
      setSymbolData(data?.data?.rows);
      enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    try {
      if (currentUser) {
        // updateExchange({ data, _id: currentUser?._id });
        dispatch(updateExchange({ id: currentUser?._id, updatedData: data }));
        console.log({ data });
      } else {
        // createExchange(data);
        dispatch(addExchange(data));
        reset();
      }
      onClose();
    } catch (error) {
      console.log({ error });
    }
  });

  useEffect(() => {
    mutate();
  }, []);

  const SymbolOption: any = [];

  for (let i = 0; i < symbolData?.length; i++) {
    SymbolOption.push({
      label: symbolData[i]?.name,
      value: symbolData[i]?._id,
    });
  }

  // console.log({ SymbolOption });
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
              // control={control}
              isLabled
              isReadOnly={!!isView}
              options={STATUS_OF_EXCHANGE}
              // data={STATUS_OF_EXCHANGE}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option: any) => option.label}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
            />

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

            <RHFAutocomplete
              name="symbol"
              label="Symbol"
              control={control}
              isReadOnly={!!isView}
              options={SymbolOption?.map((data: any) => data.label)}
              isLabled
              data={SymbolOption}
              getOptionLabel={(option: any) => option}
              renderOption={(props, option) => {
                const { label } = SymbolOption?.filter((data: any) => data.label === option)[0];

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

            {currentUser && (
              <RHFSwitch
                name="isActiveExchange"
                labelPlacement="start"
                label={
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Active or In Active Exchange
                  </Typography>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            )}
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
