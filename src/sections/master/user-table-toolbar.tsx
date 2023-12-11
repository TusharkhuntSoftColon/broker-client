import { useCallback, useEffect, useMemo } from 'react';
import * as Yup from 'yup';

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IUserTableFilters, IUserTableFilterValue } from 'src/types/user';
import { RHFAutocomplete } from 'src/components/hook-form';
import { ExchangeStatus } from 'src/_mock';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { useSettingsContext } from 'src/components/settings';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';
import { fDate } from 'src/utils/format-time';
import CustomDateRangePicker from 'src/components/custom-date-range-picker/custom-date-range-picker';

// ----------------------------------------------------------------------

type Props = {
  filters: IUserTableFilters;
  onFilters: (name: string, value: IUserTableFilterValue) => void;
  //
  roleOptions: string[] | any;
};

export default function UserTableToolbar({
  filters,
  onFilters,
  //
  roleOptions,
}: Props) {
  const rangeCalendarPicker = useDateRangePicker(new Date(), new Date());

  const popover = usePopover();

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

  const {
    watch,
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

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

  const handleFilterRole = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'exchange',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

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
          <FormControl
            sx={{
              flexShrink: 0,
              width: { xs: 1, md: 200 },
            }}
          >
            <InputLabel>Exchange</InputLabel>

            <Select
              multiple
              value={filters.exchange}
              onChange={handleFilterRole}
              input={<OutlinedInput label="Exchange" />}
              renderValue={(selected) => selected.map((value) => value).join(', ')}
              MenuProps={{
                PaperProps: {
                  sx: { maxHeight: 240 },
                },
              }}
            >
              {roleOptions.map((option: any) => (
                <MenuItem key={option.label} value={option.label}>
                  <Checkbox
                    disableRipple
                    size="small"
                    checked={filters.exchange.includes(option.label)}
                  />
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
            <TextField
              fullWidth
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search..."
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
                // renderTags={(selected, getTagProps) =>
                //   selected.map((option, index) => (
                //     <Chip
                //       {...getTagProps({ index })}
                //       key={option}
                //       label={option}
                //       size="small"
                //       color="info"
                //       variant="soft"
                //     />
                //   ))
                // }
              />
            </Stack>

            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
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
          Importimport RHFAutocomplete from './../../components/hook-form/rhf-autocomplete';
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
