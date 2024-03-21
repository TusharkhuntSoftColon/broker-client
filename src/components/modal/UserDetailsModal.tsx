/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { Tab, Box, Tabs, Dialog, Typography, DialogTitle, DialogContent } from '@mui/material';

import { PersonDetailsView } from 'src/sections/person/view';
import UserFinantials from 'src/sections/person/User/UserFinantials/userFinantials';

// import { addImportMonth } from 'src/store/slices/admin';

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: any;
}

interface UsersDetailsTabType {
  label: string;
  content: any;
}

const UserDetailsModal = ({ open, onClose, currentUser }: UserDetailsModalProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const categories: UsersDetailsTabType[] = [
    {
      label: 'Overview',
      content: <PersonDetailsView currentUser={currentUser} />,
    },
    {
      label: 'Personal',
      content: <UserFinantials />,
    },
    {
      label: 'Balance',
      content: <div>User Security</div>,
    },
    {
      label: 'History',
      content: <div>History</div>,
    },
  ];

  const handleClose = () => {
    onClose();
    setValue(0);
  };

  const handleSubmit = async () => {
    try {
      handleClose();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: '60%' },
      }}
    >
      <DialogTitle>
        {value === 0
          ? 'User Details'
          : value === 1
            ? 'User Finantial Details'
            : value === 2
              ? 'Security'
              : value === 3
                ? 'History'
                : ''}
      </DialogTitle>

      <DialogContent>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#4299e1',
            },
          }}
        >
          {categories.map((tab: any, index: any) => (
            <Tab label={tab.label} key={index} />
          ))}
        </Tabs>
        <Box sx={{ py: 2 }}>
          {categories.map((tab: any, index: any) => (
            <Box
              key={index}
              role="tabpanel"
              hidden={value !== index}
              id={`simple-tabpanel-${index}`}
              aria-labelledby={`simple-tab-${index}`}
            >
              {value === index && <Typography>{tab.content}</Typography>}
            </Box>
          ))}
        </Box>
      </DialogContent>

      {/* <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" onClick={handleSubmit}>
          Upload
        </LoadingButton>
      </DialogActions> */}
    </Dialog>
  );
};

export default UserDetailsModal;
