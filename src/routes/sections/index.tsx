import { Navigate, useRoutes } from 'react-router-dom';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { paths } from '../paths';
import { mainRoutes } from './main';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

export default function Router() {
  const { SUPER_MASTER } = useMockedUser();

  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: '/',
      element: <Navigate to={(paths as any)[SUPER_MASTER.r as keyof typeof paths]?.root} replace />,
    },

    // ----------------------------------------------------------------------

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
