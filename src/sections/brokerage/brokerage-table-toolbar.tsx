import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { ClientList } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { RHFAutocomplete } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';

import { IProductTableFilters, IProductTableFilterValue } from 'src/types/exchange';

// ----------------------------------------------------------------------

type Props = {
  filters: IProductTableFilters;
  onFilters: (name: string, value: IProductTableFilterValue) => void;
  //
  stockOptions: {
    value: string;
    label: string;
  }[];
  publishOptions: {
    value: string;
    label: string;
  }[];
};

export default function BrokerageTableToolbar({
  filters,
  onFilters,
  //
  stockOptions,
  publishOptions,
}: Props) {
  const rangeCalendarPicker = useDateRangePicker(new Date(), new Date());
  const settings = useSettingsContext();

  const popover = usePopover();

  const openDateRange = useBoolean();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target);
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleDateRangeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(event.target);
      // onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterStock = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'stock',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterPublish = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'publish',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

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

  const value = watch();

  useEffect(() => {
    handleStatusChange();
  }, [value?.status]);

  useEffect(() => {
    handleDateChange();
  }, [value?.dateRange]);

  const handleDateChange = useCallback(() => {
    value.dateRange &&
      onFilters('dateRange', [rangeCalendarPicker.startDate, rangeCalendarPicker.endDate]);
  }, [value?.dateRange]);
  const handleStatusChange = useCallback(() => {
    value.status && onFilters('status', value?.status);
  }, [value?.status]);

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
          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
            <TextField
              fullWidth
              // sx={{width: "100%"}}
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

            {/* <Stack spacing={1.5}>
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
            </Stack> */}
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              {/* <InputLabel>Exchange</InputLabel> */}

              {/* <Select
              multiple
              value={filters.stock}
              onChange={handleFilterStock}
              input={<OutlinedInput label="Exchange" />}
              renderValue={(selected) => selected.map((value) => value).join(', ')}
              sx={{ textTransform: 'capitalize' }}
            >
              {stockOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox
                    disableRipple
                    size="small"
                    checked={filters.stock.includes(option.value)}
                  />
                  {option.label}
                </MenuItem>
              ))}
            </Select> */}

              <Stack spacing={1.5}>
                <RHFAutocomplete
                  name="status"
                  label="Client"
                  options={ClientList}
                  isLabled={false}
                  // value={ClientList.map((data) => data.value)}
                  data={ClientList}
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
            </FormControl>
            <Stack
              sx={{
                flexShrink: 0,
              }}
              spacing={1.5}
              display="flex"
              flexDirection="row"
            >
              <DatePicker format="dd/MM/yyyy" />
              <Button
                // component={RouterLink}
                // onClick={quickEdit.onTrue}
                // sx={{}}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add New Date
              </Button>
            </Stack>
            {/* 
            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton> */}
          </Stack>
        </Stack>
      </FormProvider>

      {/* <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
          >
          <InputLabel>Publish</InputLabel>
          
          <Select
          multiple
          value={filters.publish}
          onChange={handleFilterPublish}
          input={<OutlinedInput label="Publish" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          sx={{ textTransform: 'capitalize' }}
          >
          {publishOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            <Checkbox
            disableRipple
            size="small"
            checked={filters.publish.includes(option.value)}
            />
            {option.label}
            </MenuItem>
            ))}
            </Select>
          </FormControl> */}

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
          Import
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
