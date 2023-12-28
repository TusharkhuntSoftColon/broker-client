import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import AdminLayout from 'src/layouts/AdminLayout';
import PersonDetailsPage from 'src/pages/dashboard/person/details';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

// PERSON
const PersonListPage = lazy(() => import('src/pages/dashboard/person/list'));
const PersonEditPage = lazy(() => import('src/pages/dashboard/person/edit'));
const PersonCreatePage = lazy(() => import('src/pages/dashboard/person/new'));

// FILE MANAGER
// APP
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

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
      { path: 'mail', element: <MailPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
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
];
