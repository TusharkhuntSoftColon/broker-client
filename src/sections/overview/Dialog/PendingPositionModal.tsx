/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */

import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import useAuth from 'src/hooks/useAuth';

import adminService from 'src/services/adminService';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  row: any;
  getUserPendingPostion: any;
  socketData: any;
  currentUser: any;
};

export default function PendingPostionModalComponent({
  open,
  onClose,
  row,
  getUserPendingPostion,
  socketData,
  currentUser,
}: Props) {
  const { role } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [positionPrice, setPositionPrice] = useState<number | null>(null);

  const curretPrice = socketData?.find(
    (data: any) => data?.InstrumentIdentifier === row?.scriptName
  );

  const { mutate: executePosition }: any = useMutation(adminService.updatePendingPosition, {
    onSuccess: (data: any) => {
      getUserPendingPostion(currentUser?._id);
    },
    onError: (error: any) => {
      // if (isAxiosError(error)) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      // }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  const handleExecuteOrder = () => {
    onClose();
    executePosition({ userId: currentUser?._id, orderId: row?._id, price: positionPrice });
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 500 },
      }}
    >
      <DialogTitle>Pending Postion Properties</DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Box sx={{ fontWeight: 700 }}>{`Bet Price :- ${row?.buyPrice}`}</Box>
          <Box
            sx={{ fontWeight: 700 }}
          >{`Current Price :- ${row?.positionType === 'BUY' ? curretPrice?.SellPrice : curretPrice?.BuyPrice}`}</Box>
        </Box>
        <Box sx={{ mt: 2, width: '100%' }}>
          <TextField
            id="outlined-basic"
            label="Set New Price"
            variant="outlined"
            value={positionPrice}
            onChange={(e) => setPositionPrice(Number(e.target.value))}
            sx={{ width: '100%' }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleExecuteOrder}>
          Execute Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}
