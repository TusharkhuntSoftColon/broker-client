/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import { fDate } from 'src/utils/format-time';

import { ExchangeStatus } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { RHFAutocomplete } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';
import CustomDateRangePicker from 'src/components/custom-date-range-picker/custom-date-range-picker';

import { IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  filters: IUserTableFilters;
  onFilters: (name: string, value: IUserTableFilterValue) => void;
  //
  roleOptions: string[] | any;
};

export default function PersonTableToolbar({
  filters,
  onFilters,
  //
  roleOptions,
}: Props) {
  const rangeCalendarPicker = useDateRangePicker(new Date(), new Date());

  const NewJobSchema = Yup.object().shape({});

  const settings = useSettingsContext();

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

  const { watch, reset, handleSubmit } = methods;

  const value: any = watch();

  useEffect(() => {
    handleStatusChange();
  }, [value?.status]);

  useEffect(() => {
    handleDateChange();
  }, [value?.dateRange]);

  const handleStatusChange = useCallback(() => {
    value.status && onFilters('status', value?.status);
  }, [value?.status]);

  const handleDateChange = useCallback(() => {
    value.dateRange &&
      onFilters('dateRange', [rangeCalendarPicker.startDate, rangeCalendarPicker.endDate]);
  }, [value?.dateRange]);

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );
  const handleChangeExchange = (e: any, value: any) => {
    const data = value.map((data: any) => data.value);
    onFilters('exchange', data);
  };

  const handleSelectedDate = () => {
    const date = [rangeCalendarPicker.startDate, rangeCalendarPicker.endDate];
    onFilters('dateRange', date);
    rangeCalendarPicker.onClose();
  };

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
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <Autocomplete
            multiple
            id="tags-filled"
            options={roleOptions}
            freeSolo
            disableCloseOnSelect
            // value={filters.exchange}
            onChange={(w, value) => handleChangeExchange(w, value)}
            renderTags={(value: readonly string[]) =>
              value.map((option: any, index: number) => option?.label).join(', ')
            }
            renderInput={(params) => (
              <TextField
                label="Exchange"
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'disabled',
                }}
              />
            )}
          />
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 0.5 }}>
          <TextField
            sx={{ width: 0.5 }}
            value={filters.name}
            onChange={handleFilterName}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack spacing={1.5}>
            {/* <DatePicker format="dd/MM/yyyy" /> */}
            <Button
              style={{
                width: 'max-content',
                // height: '100%',
                backgroundColor: 'transparent',
                color: '#637381',
                padding: '0.9rem',
                fontWeight: 'normal',
              }}
              sx={{
                width: 'max-content',
                height: '100%',
                backgroundColor: 'transparent',
                border: '0.5px solid rgba(145, 158, 171, 0.2)',
                color: '#637381',
                '&:hover': {
                  borderColor:
                    settings.themeMode === 'dark' ? 'white !important' : 'black !important',
                },
              }}
              variant="contained"
              onClick={rangeCalendarPicker.onOpen}
            >
              {fDate(rangeCalendarPicker.startDate)} - {fDate(rangeCalendarPicker.endDate)}
            </Button>
            <CustomDateRangePicker
              // name="dateRange"
              variant="calendar"
              open={rangeCalendarPicker.open}
              startDate={rangeCalendarPicker.startDate}
              endDate={rangeCalendarPicker.endDate}
              onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
              onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
              onClose={rangeCalendarPicker.onClose}
              error={rangeCalendarPicker.error}
              handleSelectedDate={handleSelectedDate}
            />
          </Stack>

          <Stack spacing={2} sx={{ width: 0.5 }}>
            <RHFAutocomplete
              name="status"
              label="Status"
              options={ExchangeStatus}
              isLabled={false}
              value={filters?.status}
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
        </Stack>
      </Stack>
    </FormProvider>
  );
}
