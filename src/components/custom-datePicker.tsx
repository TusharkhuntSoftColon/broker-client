import React from 'react';

import { DatePickerProps } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';

interface CustomDatePickerProps extends DatePickerProps<Date> {
  name: string;
  views?: any;
  onChange: (newValue: unknown) => void;
  label: any;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ name, onChange, ...props }) => {
  const handleDateChange = (newValue: unknown) => {
    onChange(newValue); // Pass the updated value back to the parent component
    // Handle the 'name' separately (e.g., for form submission or state management)
  };

  return (
    <DatePicker
      {...props}
      onChange={handleDateChange}
      disablePast
      // Other props you need to pass to the MuiDatePicker component
    />
  );
};

// Usage of the CustomDatePicker component
<CustomDatePicker
  views={['day', 'month', 'year']}
  label="Set Expiration Date"
  name="expiryDate"
  onChange={(newValue) => {
    // Handle the value change in the parent component state or context
  }}
/>;
