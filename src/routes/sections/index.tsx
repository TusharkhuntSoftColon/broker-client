import { Navigate, useRoutes } from 'react-router-dom';

import useAuth from 'src/hooks/useAuth';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import { paths } from '../paths';
import { mainRoutes } from './main';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

export default function Router() {
  const { SUPER_ADMIN, ADMIN } = useMockedUser();
  const { active } = useAuth();

  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: '/',
      element: <Navigate to={paths[active as keyof typeof paths]?.root} replace />,
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
