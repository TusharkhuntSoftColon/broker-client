import { useCallback, useEffect, useMemo } from 'react';
import * as Yup from 'yup';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ExchangeStatus, SYMBOL_CURRENCY, SYMBOL_TICK_SIZE } from 'src/_mock';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { RHFAutocomplete } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import Iconify from 'src/components/iconify';
import { ISymbolTableFilterValue, ISymbolTableFilters } from 'src/types/symbol';

// ----------------------------------------------------------------------

type Props = {
  filters: ISymbolTableFilters;
  onFilters: (name: string, value: ISymbolTableFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
};

export default function SymbolTableToolbar({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
}: Props) {
  const popover = usePopover();

  const NewJobSchema = Yup.object().shape({});

  const defaultValues = useMemo(
    () => ({
      name: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const value: any = watch();

  useEffect(() => {
    handleStatusChange();
  }, [value?.status]);

  useEffect(() => {
    handleCurrencyChange();
  }, [value?.currency]);

  useEffect(() => {
    handleTickSizeChange();
  }, [value?.tickSize]);

  const handleStatusChange = useCallback(() => {
    value.status && onFilters('status', value?.status);
  }, [value?.status]);

  const handleCurrencyChange = useCallback(() => {
    value.currency && onFilters('currency', value?.currency);
  }, [value?.currency]);

  const handleTickSizeChange = useCallback(() => {
    value.tickSize && onFilters('tickSize', value?.tickSize);
  }, [value?.tickSize]);

  console.log({ value });

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue: Date | null) => {
      onFilters('startDate', newValue);
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue: Date | null) => {
      onFilters('endDate', newValue);
    },
    [onFilters]
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack
          spacing={2}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{
            p: 2.5,
            pr: { xs: 2.5, md: 1 },
          }}
        >
          {/* <DatePicker
          label="Start date"
          value={filters.startDate}
          onChange={handleFilterStartDate}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
          sx={{
            maxWidth: { md: 200 },
          }}
        />

        <DatePicker
          label="End date"
          value={filters.endDate}
          onChange={handleFilterEndDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{
            maxWidth: { md: 200 },
          }}
        /> */}

          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
            <TextField
              fullWidth
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search symbol"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Stack spacing={2} sx={{ width: 0.2 }}>
              <RHFAutocomplete
                name="currency"
                label="Currency"
                options={SYMBOL_CURRENCY}
                isLabled={false}
                // value={SYMBOL_CURRENCY.map((data) => data.value)}
                data={SYMBOL_CURRENCY}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.label}>
                    {option.label}
                  </li>
                )}
              />
            </Stack>

            <Stack spacing={2} sx={{ width: 0.2 }}>
              <RHFAutocomplete
                name="tickSize"
                label="Tick Size"
                options={SYMBOL_TICK_SIZE}
                isLabled={false}
                // value={filters?.tickSize}
                data={SYMBOL_TICK_SIZE}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.label}>
                    {option.label}
                  </li>
                )}
              />
            </Stack>

            <Stack spacing={2} sx={{ width: 0.2 }}>
              <RHFAutocomplete
                name="status"
                label="Status"
                options={ExchangeStatus}
                isLabled={false}
                // value={ExchangeStatus.map((data) => data.value)}
                data={ExchangeStatus}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option: any) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.label}>
                    {option.label}
                  </li>
                )}
              />
            </Stack>

            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>

          {/* {canReset && (
            <Button
              color="error"
              sx={{ flexShrink: 0 }}
              onClick={onResetFilters}
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            >
              Clear
            </Button>
          )} */}
        </Stack>
      </FormProvider>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
