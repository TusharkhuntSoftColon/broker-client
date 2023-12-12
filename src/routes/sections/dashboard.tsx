import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import AdminLayout from 'src/layouts/AdminLayout';

import { LoadingScreen } from 'src/components/loading-screen';
import PersonDetailsPage from 'src/pages/dashboard/person/details';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ExchangeDetailsPage = lazy(() => import('src/pages/dashboard/exchange/details'));
const ExchangeListPage = lazy(() => import('src/pages/dashboard/exchange/list'));
const ExchangeCreatePage = lazy(() => import('src/pages/dashboard/exchange/new'));
const ExchangeEditPage = lazy(() => import('src/pages/dashboard/exchange/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/symbol/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/symbol/details'));
const OrderCreatePage = lazy(() => import('src/pages/dashboard/symbol/new'));
// PERSON
const PersonListPage = lazy(() => import('src/pages/dashboard/person/list'));
const PersonEditPage = lazy(() => import('src/pages/dashboard/person/edit'));
const PersonCreatePage = lazy(() => import('src/pages/dashboard/person/new'));

// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
//SUPER_MASTER
const SuperMasterListPage = lazy(() => import('src/pages/dashboard/superMaster/list'));
const SuperMasterCreatePage = lazy(() => import('src/pages/dashboard/superMaster/new'));
const SuperMasterEditPage = lazy(() => import('src/pages/dashboard/superMaster/edit'));
//MASTER
const MasterListPage = lazy(() => import('src/pages/dashboard/master/list'));
const MasterCreatePage = lazy(() => import('src/pages/dashboard/master/new'));
const MasterEditPage = lazy(() => import('src/pages/dashboard/master/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));
const BrokeragePage = lazy(() => import('src/pages/dashboard/brokerage/list'));

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
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
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
