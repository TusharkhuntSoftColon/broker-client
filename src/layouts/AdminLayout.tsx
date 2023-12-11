import { useState } from 'react';
import { Navigate } from 'react-router';

import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import useAuth from 'src/hooks/useAuth';

import { useSettingsContext } from 'src/components/settings';

import { useNavData, useSuperMasterNav } from './dashboard/config-navigation';
import Header from './dashboard/header';
import NavHorizontal from './dashboard/nav-horizontal';
import NavMini from './dashboard/nav-mini';
import NavVertical from './dashboard/nav-vertical';
import Main from './main';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const { role } = useAuth();

  const [manager, setmaneger] = useState(true);

  const adminNav = useNavData();
  const superMasterNav = useSuperMasterNav();

  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini nav={superMasterNav} />;

  const renderHorizontal = <NavHorizontal nav={superMasterNav} />;

  const renderNavVertical = (
    <NavVertical nav={superMasterNav} openNav={nav.value} onCloseNav={nav.onFalse} />
  );

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main>{manager ? children : <Navigate to="/" />}</Main>
      </Box>
    </>
  );
};

export default AdminLayout;
