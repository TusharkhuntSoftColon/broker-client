import { _id } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth',
  DASHBOARD: '/admin',
  SUPER_MASTER: '/super-master',
  MASTER: '/master',
  USER: '/user',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',

  auth: {
    // classic: {
    login: `${ROOTS.AUTH_DEMO}/login`,
    register: `${ROOTS.AUTH_DEMO}/register`,
    forgotPassword: `${ROOTS.AUTH_DEMO}/forgot-password`,
    newPassword: `${ROOTS.AUTH_DEMO}/new-password`,
    verify: `${ROOTS.AUTH_DEMO}/verify`,
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}`,
    person: {
      root: `${ROOTS.DASHBOARD}/person`,
      new: `${ROOTS.DASHBOARD}/person/new`,
      list: `${ROOTS.DASHBOARD}/person/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/person/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/person/${id}/edit`,
    },
    brokerage: {
      root: `${ROOTS.DASHBOARD}/brokerage`,
      new: `${ROOTS.DASHBOARD}/brokerage/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/brokerage/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/brokerage/${id}/edit`,
    },
  },
  superMaster: {
    root: `${ROOTS.SUPER_MASTER}`,
    person: {
      root: `${ROOTS.SUPER_MASTER}/person`,
      new: `${ROOTS.SUPER_MASTER}/person/new`,
      list: `${ROOTS.SUPER_MASTER}/person/list`,
      details: (id: string) => `${ROOTS.SUPER_MASTER}/person/${id}`,
      edit: (id: string) => `${ROOTS.SUPER_MASTER}/person/${id}/edit`,
    },
  },
  master: {
    root: `${ROOTS.MASTER}`,
    user: {
      root: `${ROOTS.MASTER}/user`,
      new: `${ROOTS.MASTER}/user/new`,
      list: `${ROOTS.MASTER}/user/list`,
      cards: `${ROOTS.MASTER}/user/cards`,
      profile: `${ROOTS.MASTER}/user/profile`,
      account: `${ROOTS.MASTER}/user/account`,
      details: (id: string) => `${ROOTS.MASTER}/user/${id}`,
      edit: (id: string) => `${ROOTS.MASTER}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.MASTER}/user/${MOCK_ID}/edit`,
      },
    },
    person: {
      root: `${ROOTS.MASTER}/person`,
      new: `${ROOTS.MASTER}/person/new`,
      list: `${ROOTS.MASTER}/person/list`,
      details: (id: string) => `${ROOTS.MASTER}/person/${id}`,
      edit: (id: string) => `${ROOTS.MASTER}/person/${id}/edit`,
    },
  },
};
