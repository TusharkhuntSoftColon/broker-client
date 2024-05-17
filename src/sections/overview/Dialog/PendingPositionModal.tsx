/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import useAuth from 'src/hooks/useAuth';

import SymbolPropertiesDetailLayout from '../app/symbol-properties-details-view-layout';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  row: any;
};

export default function PendingPostionModalComponent({ open, onClose, row }: Props) {
  const { role } = useAuth();

  console.log({ row });
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

      <DialogContent>content</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
