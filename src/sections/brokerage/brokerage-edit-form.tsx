/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
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

import { IExchangeItem } from '../../types/exchange';
import { useSnackbar } from '../../components/snackbar';
import symbolService from '../../services/symbolService';
import { STOP_LOSS, STATUS_OF_EXCHANGE } from '../../_mock/_exchange';
import { addExchange, updateExchange } from '../../store/slices/exchange';
import FormProvider, { RHFSwitch, RHFTextField, RHFAutocomplete } from '../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  isView?: any;
  currentUser?: IExchangeItem | any;
  getFunction?: any;
};

export default function BrokerageQuickEditForm({
  getFunction,
  currentUser,
  open,
  onClose,
  isView,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [symbolData, setSymbolData] = useState<any>([]);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    statusOfExchange: Yup.mixed<any>().nullable().required('Status Of Exchange is required'),
    stAndTp: Yup.mixed<any>().nullable().required('stAndTp is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      statusOfExchange: currentUser?.statusOfExchange || null,
      stAndTp: currentUser?.stAndTp || null,
      isActiveExchange: currentUser?.isActiveExchange || null,
    }),
    [currentUser]
  );

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Get symbol API
  const { mutate } = useMutation(symbolService.getSymbolList, {
    onSuccess: (data) => {
      setSymbolData(data?.data?.rows);
      // enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        // updateExchange({ data, _id: currentUser?._id });
        dispatch(updateExchange({ id: currentUser?._id, updatedData: data }));
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
            <RHFTextField name="name" label="Name" />

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
                <li {...props} key={option.label}>
                  {option.label}
                </li>
              )}
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
