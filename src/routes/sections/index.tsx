import { Navigate, useRoutes } from 'react-router-dom';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import useAuth from 'src/hooks/useAuth';

import { paths } from '../paths';
import { authDemoRoutes } from './auth-demo';
import { componentsRoutes } from './components';
import { dashboardRoutes } from './dashboard';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

export default function Router() {
  const { ADMIN, SUPER_MASTER, MASTER, USER } = useMockedUser();
  const { active } = useAuth();

  console.log('Routes Working');

  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: '/',
      element: <Navigate to={paths[SUPER_MASTER.r as keyof typeof paths]?.root} replace />,
    },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    // {
    //   path: '/',
    //   element: (
    //     <MainLayout>
    //       <HomePage />
    //     </MainLayout>
    //   ),
    // },

    // Auth routes
    // ...authRoutes,
    ...authDemoRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
