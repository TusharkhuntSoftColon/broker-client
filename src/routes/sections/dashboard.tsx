/* eslint-disable import/no-cycle */
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import AdminLayout from 'src/layouts/AdminLayout';
import PersonDetailsPage from 'src/pages/dashboard/person/details';

import { LoadingScreen } from 'src/components/loading-screen';
import PersonTabsPanel from 'src/components/custom-tab/PersonTabs';

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

// PERSON
const PersonListPage = lazy(() => import('src/pages/dashboard/person/list'));

// BROKERAGE
const BrokerageListPage = lazy(() => import('src/pages/dashboard/brokerage/list'));
const BrokerageDetailsPage = lazy(() => import('src/pages/dashboard/brokerage/details'));
const BrokerageCreatePage = lazy(() => import('src/pages/dashboard/brokerage/new'));
const BrokerageEditPage = lazy(() => import('src/pages/dashboard/brokerage/edit'));

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
          { path: 'new', element: <PersonTabsPanel /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <PersonTabsPanel /> },
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
          { path: 'new', element: <PersonTabsPanel /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <PersonTabsPanel /> },
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
      { element: <IndexPage />, index: true },
      {
        path: 'person',
        children: [
          { element: <PersonListPage />, index: true },
          { path: 'list', element: <PersonListPage /> },
          { path: 'new', element: <PersonTabsPanel /> },
          { path: ':id', element: <PersonDetailsPage /> },
          { path: ':id/edit', element: <PersonTabsPanel /> },
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
];
