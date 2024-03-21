/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  type?: any;
  upperText?: any;
  isReadOnly?: any;
};

export default function RHFTextField({
  name,
  upperText,
  helperText,
  type,
  isReadOnly,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? 0 : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          InputProps={{
            readOnly: isReadOnly,
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
