import React, { useState } from 'react';

import { Box, Checkbox } from '@mui/material';

interface ImportMonthListProps {
  checked: boolean;
  item: {
    label: string;
    value: string;
  };
  handleChannge: () => void;
}

const ImportMonthList = ({ checked, item, handleChannge }: ImportMonthListProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box>{item?.label}</Box>
      <Checkbox
        onChange={() => {
          if (isChecked) {
            setIsChecked(false);
          } else {
            setIsChecked(true);
            handleChannge();
          }
        }}
        checked={isChecked}
      />
    </Box>
  );
};

export default ImportMonthList;
