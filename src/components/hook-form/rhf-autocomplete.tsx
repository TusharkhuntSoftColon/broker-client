import { Controller, useFormContext } from 'react-hook-form';

import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
  data?: any;
  multiple?: Multiple;
  value?: any;
  resetFunction?: any;
  isLabled?: any;
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
  data,
  isLabled,
  value,
  resetFunction,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { setValue, getValues, control: formControl } = useFormContext();
  return (
    <Controller
      name={name}
      control={formControl}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
          }}
          readOnly={!!isReadOnly}
          value={value}
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
