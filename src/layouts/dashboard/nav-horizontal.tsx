import { memo } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { bgBlur } from 'src/theme/css';

import { NavSectionHorizontal } from 'src/components/nav-section';
import Scrollbar from 'src/components/scrollbar';

import HeaderShadow from '../common/header-shadow';
import { HEADER } from '../config-layout';
import { NavItemBaseProps } from '../main/nav/types';
import { useNavData } from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  nav: {
    items: NavItemBaseProps[];
  }[];
};

function NavHorizontal({ nav }: Props) {
  const theme = useTheme();

  const { ADMIN } = useMockedUser();

  const navData = useNavData();

  return (
    <AppBar
      component="div"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <Scrollbar
          sx={{
            '& .simplebar-content': {
              display: 'flex',
            },
          }}
        >
          <NavSectionHorizontal
            data={nav}
            slotProps={{
              currentRole: ADMIN?.role,
            }}
            sx={{
              ...theme.mixins.toolbar,
            }}
          />
        </Scrollbar>
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);
