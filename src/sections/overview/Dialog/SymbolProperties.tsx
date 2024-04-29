/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  row: any;
};

export default function SymbolPropertiesDialog({ open, onClose, row }: Props) {
  const { role } = useAuth();

  // const getSymbolPropertiesByRole: any = (role1: any) => {
  //   switch (role1) {
  //     case 'ADMIN':
  //       return adminService.getSymbolProperties(row?.id);
  //     case 'SUPER_MASTER':
  //       return superMasterService.getSymbolProperties(row?.id);
  //     case 'MASTER':
  //       return masterService.getSymbolProperties(row?.id);
  //     default:
  //       return masterService.getSymbolProperties(row?.id);
  //   }
  // };
  // const { mutate: getSymbolProperty } = useMutation(getSymbolPropertiesByRole(role), {
  //   onSuccess: (data) => {
  //     //   setAssignedExchanges(data?.data?.rows);
  //     console.log({ data });
  //   },
  //   onError: (error) => {
  //     console.log('error', error);
  //   },
  // });

  // useEffect(() => {
  //   if (open) {
  //     getSymbolProperty();
  //   }
  // }, []);
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
      <DialogTitle>Symbol Properties</DialogTitle>

      <DialogContent>Hello</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
