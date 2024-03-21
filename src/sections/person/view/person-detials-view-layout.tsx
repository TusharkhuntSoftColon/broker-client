/* eslint-disable no-unneeded-ternary */
/* eslint-disable arrow-body-style */
import { Box, Typography } from '@mui/material';

interface AddUserTypes {
  title: string;
  name?: string;
  extraStyle?: any;
  type?: string;
}

const PersonDetailsViewLayout = ({ title, name, extraStyle, type }: AddUserTypes) => {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #d7dee2',
        height: 'fit-content',
        display: 'flex',
        lineHeight: '0px !important',
        ...extraStyle,
      }}
    >
      <Box
        sx={{
          flex: 0.7,
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: '#f9fafa',
        }}
      >
        <Typography>{title}</Typography>
      </Box>
      <Box
        sx={{
          flex: 1.3,
          display: 'flex',
          alignItems: 'center',
          p: 2,
        }}
      >
        <pre>{name}</pre>
      </Box>
    </Box>
  );
};

export default PersonDetailsViewLayout;
