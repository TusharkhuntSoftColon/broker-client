import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

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
