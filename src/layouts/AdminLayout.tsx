import { useState } from 'react';
import { Navigate } from 'react-router';

import Box from '@mui/material/Box';

import useAuth from 'src/hooks/useAuth';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

import Main from './main';
import Header from './dashboard/header';
import NavMini from './dashboard/nav-mini';
import NavVertical from './dashboard/nav-vertical';
import NavHorizontal from './dashboard/nav-horizontal';
import { useAdminNav } from './dashboard/config-navigation';

type Props = {
  children: React.ReactNode;
};

const  AdminLayout = ({ children }: Props) => {
const { role } = useAuth()
  
  const [manager, setmaneger] = useState(role === "ADMIN" ? true : null);

  const adminNav = useAdminNav()

  const settings = useSettingsContext();


  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini nav={adminNav}/>;

  const renderHorizontal = <NavHorizontal nav={adminNav}/>;

  const renderNavVertical = <NavVertical nav={adminNav} openNav={nav.value} onCloseNav={nav.onFalse} />;

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
}

  export default AdminLayout