import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import AdminLayout from 'src/layouts/AdminLayout';

import { LoadingScreen } from 'src/components/loading-screen';
import UserLayout from 'src/layouts/UserLayout';
import PersonDetailsPage from 'src/pages/dashboard/person/details';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

// PERSON
const PersonListPage = lazy(() => import('src/pages/dashboard/person/list'));
const PersonEditPage = lazy(() => import('src/pages/dashboard/person/edit'));
const PersonCreatePage = lazy(() => import('src/pages/dashboard/person/new'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '/admin',
    element: (
      <AuthGuard>
        <AdminLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </AdminLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'person',
        children: [
          { element: <PersonListPage />, index: true },
          { path: 'list', element: <PersonListPage /> },
          { path: 'new', element: <PersonCreatePage /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <PersonEditPage /> },
        ],
      },
    ],
  },
  {
    path: '/super-master',
    element: (
      <AuthGuard>
        <AdminLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </AdminLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'person',
        children: [
          { element: <PersonListPage />, index: true },
          { path: 'list', element: <PersonListPage /> },
          { path: 'new', element: <PersonCreatePage /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <PersonEditPage /> },
        ],
      },
    ],
  },
  {
    path: '/master',
    element: (
      <AuthGuard>
        <AdminLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </AdminLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'person',
        children: [
          { element: <PersonListPage />, index: true },
          { path: 'list', element: <PersonListPage /> },
          { path: 'new', element: <PersonCreatePage /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <PersonEditPage /> },
        ],
      },
    ],
  },
  {
    path: '/user',
    element: (
      <AuthGuard>
        <UserLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </UserLayout>
      </AuthGuard>
    ),
  },
];
