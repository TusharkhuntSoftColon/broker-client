/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  type?: any;
  upperText?: any;
  isReadOnly?: any;
  min?: number;
  max?: number | null;
};

export default function RHFTextField({
  name,
  upperText,
  helperText,
  type,
  min,
  max,
  isReadOnly,
  ...other
}: Props) {
  const { control } = useFormContext();

  // const validateNumber = (value: any) => {
  //   if (value && isNaN(value)) {
  //     return 'Please enter a valid number';
  //   }
  //   if (value && parseFloat(value) <= 0) {
  //     return 'Please enter a positive number';
  //   }
  //   if (min !== undefined && parseFloat(value) < min) {
  //     return `Please enter a number greater than or equal to ${min}`;
  //   }
  //   if (max !== undefined && parseFloat(value) > max) {
  //     return `Please enter a number less than or equal to ${max}`;
  //   }
  //   return true;
  // };

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
          inputProps={{ min: min ?? 0, max: max ?? null }}
          value={type === 'number' && field.value === 0 ? '' : field.value}
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
