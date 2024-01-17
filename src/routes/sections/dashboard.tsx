import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import UserLayout from 'src/layouts/UserLayout';
// import UserLayout from 'src/layouts/UserLayout';
import AdminLayout from 'src/layouts/AdminLayout';
import PersonDetailsPage from 'src/pages/dashboard/person/details';

import BasicTabs from 'src/components/custom-tab/CustomTab';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

// PERSON
const PersonListPage = lazy(() => import('src/pages/dashboard/person/list'));
const PersonEditPage = lazy(() => import('src/pages/dashboard/person/edit'));
const PersonCreatePage = lazy(() => import('src/pages/dashboard/person/new'));

// BROKERAGE
const BrokerageListPage = lazy(() => import('src/pages/dashboard/brokerage/list'));
const BrokerageDetailsPage = lazy(() => import('src/pages/dashboard/brokerage/details'));
const BrokerageCreatePage = lazy(() => import('src/pages/dashboard/brokerage/new'));
const BrokerageEditPage = lazy(() => import('src/pages/dashboard/brokerage/edit'));

// FILE MANAGER
// APP
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
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
          { path: 'new', element: <BasicTabs /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <BasicTabs /> },
        ],
      },
      {
        path: 'brokerage',
        children: [
          { element: <BrokerageListPage />, index: true },
          { path: 'list', element: <BrokerageListPage /> },
          { path: ':id', element: <BrokerageDetailsPage /> },
          { path: 'new', element: <BrokerageCreatePage /> },
          { path: ':id/edit', element: <BrokerageEditPage /> },
        ],
      },
      { path: 'mail', element: <MailPage /> },
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
          { path: 'new', element: <BasicTabs /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <BasicTabs /> },
        ],
      },
      {
        path: 'brokerage',
        children: [
          { element: <BrokerageListPage />, index: true },
          { path: 'list', element: <BrokerageListPage /> },
          { path: ':id', element: <BrokerageDetailsPage /> },
          { path: 'new', element: <BrokerageCreatePage /> },
          { path: ':id/edit', element: <BrokerageEditPage /> },
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
          { path: 'new', element: <BasicTabs /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <BasicTabs /> },
        ],
      },
      {
        path: 'brokerage',
        children: [
          { element: <BrokerageListPage />, index: true },
          { path: 'list', element: <BrokerageListPage /> },
          { path: ':id', element: <BrokerageDetailsPage /> },
          { path: 'new', element: <BrokerageCreatePage /> },
          { path: ':id/edit', element: <BrokerageEditPage /> },
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
