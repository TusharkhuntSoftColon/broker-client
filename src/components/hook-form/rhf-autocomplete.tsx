import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { STOP_LOSS } from 'src/_mock';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  isReadOnly?: boolean;
  control?: any;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  isReadOnly,
  control,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => {
            console.log({ newValue });
            const selectedValue = STOP_LOSS.find((data) => data.label === newValue)?.value;
            setValue(name, selectedValue, { shouldValidate: true });
          }}
          readOnly={!!isReadOnly}
          renderInput={(params) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'disabled',
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
