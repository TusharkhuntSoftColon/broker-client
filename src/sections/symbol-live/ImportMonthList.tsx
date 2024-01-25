import React, { useState } from 'react';

import { Box } from '@mui/material';

interface ImportMonthListProps {
  checked: boolean;
  item: {
    label: string;
    value: string;
  };
  handleChannge: () => void;
}

const ImportMonthList = ({ checked, item, handleChannge }: ImportMonthListProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '30px',
        maxHeight: '44px',
      }}
      onClick={() => {
        handleChannge();
        setIsDisabled(true);
      }}
    >
      {isDisabled ? (
        <Box sx={{ color: 'text.disabled' }}>{item?.label}</Box>
      ) : (
        <Box>{item?.label}</Box>
      )}
    </Box>
  );
};

export default ImportMonthList;
