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

import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import adminService from 'src/services/adminService';

import { RHFAutocomplete } from '../hook-form';
import FormProvider from '../hook-form/form-provider';
import { useState } from 'react';

interface AddSymbolInDashboardProps {
  open: boolean;
  onClose: () => void;
  symbolOptionList: any;
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
  symbolOptionList,
  mutateSymbolData,
  currentList,
  assignedExchangesList,
}: AddSymbolInDashboardProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [activeExchange, setActiveExchange] = useState<formattedDataInterface | undefined>(
    undefined
  );
  const [importMonthIds, setImportMonthIds] = useState<any>([]);

  console.log({ importMonthIds });

  // close dailog function
  const handleClose = () => {
    onClose();
  };

  const { mutate: updateImportMonthList } = useMutation(adminService.addSelectedImportMonth, {
    onSuccess: (data) => {
      mutateSymbolData();
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

    // If the ID is already present, remove it from the array
    if (isIdPresent) {
      const updatedIds = importMonthIds.filter((existingId: string) => existingId !== id);
      setImportMonthIds(updatedIds);
    } else {
      // If the ID is not present, add it to the array
      setImportMonthIds([...importMonthIds, id]);
    }
  };

  const methods = useForm<any>({
    defaultValues: {
      symbolData: [],
    },
  });

  const { handleSubmit } = methods;

  // submit form
  const onSubmit = (data: any) => {
    console.log({ data });
    const importMonths = data?.symbolData.map((data1: any) => data1.value);
    // console.log({ importMonths });
    updateImportMonthList(importMonths);

    // onClose();
  };

  const SYMBOL_OPTIONS: any = [];
  const CURRENT_SYMBOL_LIST: any = [];

  // creating options list for symbol selection
  for (let i = 0; i < symbolOptionList?.length; i++) {
    SYMBOL_OPTIONS.push({ value: symbolOptionList[i]?._id, label: symbolOptionList[i]?.name });
  }

  // current symbol list
  for (let i = 0; i < currentList?.length; i++) {
    CURRENT_SYMBOL_LIST.push({ value: currentList[i]?._id, label: currentList[i]?.name });
  }

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
          <RHFAutocomplete
            sx={{
              m: 1,
            }}
            name="symbolData"
            label="Add Symbols"
            isReadOnly={false}
            options={SYMBOL_OPTIONS}
            freeSolo
            disableCloseOnSelect
            defaultValue={CURRENT_SYMBOL_LIST}
            data={SYMBOL_OPTIONS}
            isLabled={false}
            multiple
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.label}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.label}>
                {option.label}
              </li>
            )}
          />

          {assignedExchangesList?.map((exchange: formattedDataInterface) => (
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
              </Box>
              {activeExchange === exchange && exchange?.importMonth?.length > 0 && (
                <Box>
                  {exchange?.importMonth?.map((data: any) => (
                    <Box
                      key={data?._id}
                      sx={{ color: importMonthIds.includes(data?._id) ? 'text.disabled' : '' }}
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
