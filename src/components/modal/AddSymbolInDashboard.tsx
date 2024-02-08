/* eslint-disable no-plusplus */
import { isAxiosError } from 'axios';
/* eslint-disable import/order */
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import adminService from 'src/services/adminService';

import { RHFAutocomplete } from '../hook-form';
import FormProvider from '../hook-form/form-provider';

interface AddSymbolInDashboardProps {
  open: boolean;
  onClose: () => void;
  symbolOptionList: any;
  mutateSymbolData: any;
  currentList: any;
}

const AddSymbolInDashboard = ({
  open,
  onClose,
  symbolOptionList,
  mutateSymbolData,
  currentList,
}: AddSymbolInDashboardProps) => {
  const { enqueueSnackbar } = useSnackbar();

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
