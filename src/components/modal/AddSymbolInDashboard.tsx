/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
import { isAxiosError } from 'axios';
/* eslint-disable import/order */
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import adminService from 'src/services/adminService';

import FormProvider from '../hook-form/form-provider';
import { useState, useEffect } from 'react';
import { RHFTextField } from '../hook-form';
import Iconify from '../iconify';
import { useSelector } from 'react-redux';
import superMasterService from 'src/services/superMasterService';
import masterService from 'src/services/masterService';

interface AddSymbolInDashboardProps {
  open: boolean;
  onClose: () => void;
  mutateSymbolData: any;
  currentList: any;
  assignedExchangesList: any;
}

interface formattedDataInterface {
  name: string;
  _id: string;
  status: string;
  isActive: boolean;
  importMonth: {
    label: string;
    value: string;
  }[];
}

const AddSymbolInDashboard = ({
  open,
  onClose,
  mutateSymbolData,
  currentList,
  assignedExchangesList,
}: AddSymbolInDashboardProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [activeExchange, setActiveExchange] = useState<formattedDataInterface | undefined>(
    undefined
  );

  console.log({ assignedExchangesList });

  const role = useSelector((data: any) => data.auth.role);

  const idsArray = currentList.map((data: any) => data?._id);
  const [importMonthIds, setImportMonthIds] = useState<any>(idsArray);

  const [assignedExchanges, setAssignedExchanges] = useState<any>(assignedExchangesList);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setImportMonthIds(idsArray);
  }, [currentList]);

  const updateImportMonthListByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminService.addSelectedImportMonth;
      case 'SUPER_MASTER':
        return superMasterService.addSelectedImportMonth;
      case 'MASTER':
        return masterService.addSelectedImportMonth;
      // Add other cases for different roles with their respective paths
      default:
        return masterService.addSelectedImportMonth; // Return a default path if role doesn't match
    }
  };

  const { mutate: updateImportMonthList } = useMutation(updateImportMonthListByRole(role), {
    onSuccess: (data) => {
      mutateSymbolData();
      setActiveExchange(undefined);
      reset();
      onClose();
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onImportMonthClick = (id: string) => {
    const isIdPresent = importMonthIds.includes(id);
    if (isIdPresent) {
      const updatedIds = importMonthIds.filter((existingId: string) => existingId !== id);
      setImportMonthIds(updatedIds);
    } else {
      setImportMonthIds([...importMonthIds, id]);
    }
  };

  const methods = useForm<any>({
    defaultValues: {
      symbolData: '',
    },
  });

  const { reset, handleSubmit, watch } = methods;

  const value = watch();
  const onSubmit = (data: any) => {
    updateImportMonthList(importMonthIds);
  };

  useEffect(() => {
    const filteredArray = assignedExchangesList?.filter((exchange: formattedDataInterface) =>
      exchange.importMonth?.some((month: any) =>
        month.name?.includes((value?.symbolData).toUpperCase())
      )
    );
    setAssignedExchanges(filteredArray);
  }, [value?.symbolData, assignedExchangesList]);

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 500 },
        zIndex: 1000,
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Symbol</DialogTitle>
        <DialogContent>
          <RHFTextField
            sx={{ width: '100%', mb: 1 }}
            name="symbolData"
            placeholder="Search Symbol"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          {assignedExchanges?.map((exchange: formattedDataInterface) => (
            <Box key={exchange?._id}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#F1F9FF',
                  },
                }}
                onClick={() => {
                  if (activeExchange === exchange) {
                    setActiveExchange(undefined);
                  } else {
                    setActiveExchange(exchange);
                  }
                }}
              >
                {exchange?.importMonth?.length !== 0 && (
                  <>
                    <Box
                      sx={{
                        alignItems: 'center',
                        cursor: 'pointer',
                        minHeight: '30px',
                        maxHeight: '44px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000000',
                        padding: 1,
                        fontFamily:
                          'Roboto,Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
                      }}
                    >
                      {exchange?.name}
                    </Box>
                    <Box
                      sx={{
                        alignItems: 'center',
                        cursor: 'pointer',
                        minHeight: '30px',
                        maxHeight: '44px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000000',
                        padding: 1,
                        fontFamily:
                          'Roboto,Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
                      }}
                    >
                      {exchange?.importMonth?.length}
                    </Box>
                  </>
                )}
              </Box>
              {activeExchange === exchange && exchange?.importMonth?.length > 0 && (
                <Box>
                  {exchange?.importMonth?.map((data: any) => (
                    <Box
                      key={data?._id}
                      sx={{
                        color: importMonthIds.includes(data?._id) ? 'text.disabled' : '',
                        fontSize: '13px',
                        cursor: 'pointer',
                        ml: '1.5rem',
                      }}
                      onClick={() => onImportMonthClick(data?._id)}
                    >
                      {data?.name}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" onClick={() => {}} variant="contained">
            Add
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AddSymbolInDashboard;
