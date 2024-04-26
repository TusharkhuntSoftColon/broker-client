import MenuItem from '@mui/material/MenuItem';

import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';

import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const { userId } = useAuth();

  const handleLogout = async () => {
    try {
      popover.onClose();
      router.replace('/auth/login');
      localStorage.setItem('isFirstTime', 'true');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      {/* <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        {`${userId} (${displayName})`}
      </IconButton> */}
      <MenuItem
        sx={{ fontWeight: 'fontWeightBold', fontSize: '14px' }}
        onClick={popover.onOpen}
      >{`${userId}`}</MenuItem>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
