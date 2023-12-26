import { useState } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

import Main from './main';
import Header from './dashboard/header';
import NavMini from './dashboard/nav-mini';
import NavVertical from './dashboard/nav-vertical';
import NavHorizontal from './dashboard/nav-horizontal';
import { useNavData, useMasterNav, useSuperMasterNav } from './dashboard/config-navigation';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  // const { role } = useAuth();
  const role = useSelector((data: any) => data.auth.role);

  const [manager, setmaneger] = useState(true);

  const adminNav = useNavData();
  const superMasterNav = useSuperMasterNav();
  const masterNav = useMasterNav();

  const getNavByRole = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return adminNav;
      case 'SUPER_MASTER':
        return superMasterNav;
      case 'MASTER':
        return masterNav;
      // Add other cases for different roles with their respective paths
      default:
        return masterNav; // Return a default path if role doesn't match
    }
  };

  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini nav={getNavByRole(role)} />;

  const renderHorizontal = <NavHorizontal nav={getNavByRole(role)} />;

  const renderNavVertical = (
    <NavVertical nav={getNavByRole(role)} openNav={nav.value} onCloseNav={nav.onFalse} />
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
