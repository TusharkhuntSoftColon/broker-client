import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { Exchanges } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { RHFAutocomplete } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';
import CustomDateRangePicker from 'src/components/custom-date-range-picker/custom-date-range-picker';

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

export default function ProductTableToolbar({
  filters,
  onFilters,
  //
  stockOptions,
  publishOptions,
}: Props) {
  console.log({ stockOptions });
  const rangeCalendarPicker = useDateRangePicker(new Date(), new Date());

  const popover = usePopover();

  const openDateRange = useBoolean();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );


  const handleFilterStock = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      console.log({ event });

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
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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
                  height: '100%',
                  backgroundColor: 'transparent',
                  color: '#637381',
                  border: '0.5px solid rgba(145, 158, 171, 0.2)',

                  fontWeight: 'normal',
                }}
                sx={{
                  '&:hover': {
                    borderColor: '#212B36 !important',
                  },
                }}
                variant="contained"
                onClick={rangeCalendarPicker.onOpen}
              >
                {fDate(rangeCalendarPicker.startDate)} - {fDate(rangeCalendarPicker.endDate)}
              </Button>
              <CustomDateRangePicker
                variant="calendar"
                open={rangeCalendarPicker.open}
                startDate={rangeCalendarPicker.startDate}
                endDate={rangeCalendarPicker.endDate}
                onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
                onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
                onClose={rangeCalendarPicker.onClose}
                error={rangeCalendarPicker.error}
              />
            </Stack>
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
                  name="name"
                  placeholder="Exchange"
                  // disableCloseOnSelect
                  options={Exchanges.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    const { label } = Exchanges.filter((country) => country.label === option)[0];

                    if (!label) {
                      return null;
                    }

                    return (
                      <li {...props} key={label}>
                        {label}
                      </li>
                    );
                  }}
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

            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
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
