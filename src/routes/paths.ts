import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

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
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  // auth: {
  //   amplify: {
  //     login: `${ROOTS.AUTH}/amplify/login`,
  //     verify: `${ROOTS.AUTH}/amplify/verify`,
  //     register: `${ROOTS.AUTH}/amplify/register`,
  //     newPassword: `${ROOTS.AUTH}/amplify/new-password`,
  //     forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
  //   },
  //   jwt: {
  //     login: `${ROOTS.AUTH}/jwt/login`,
  //     register: `${ROOTS.AUTH}/jwt/register`,
  //   },
  //   firebase: {
  //     login: `${ROOTS.AUTH}/firebase/login`,
  //     verify: `${ROOTS.AUTH}/firebase/verify`,
  //     register: `${ROOTS.AUTH}/firebase/register`,
  //     forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
  //   },
  //   auth0: {
  //     login: `${ROOTS.AUTH}/auth0/login`,
  //   },
  // },
  auth: {
    // classic: {
    login: `${ROOTS.AUTH_DEMO}/user/login`,
    register: `${ROOTS.AUTH_DEMO}/register`,
    forgotPassword: `${ROOTS.AUTH_DEMO}/forgot-password`,
    newPassword: `${ROOTS.AUTH_DEMO}/new-password`,
    verify: `${ROOTS.AUTH_DEMO}/verify`,
    // },
    // modern: {
    //   login: `${ROOTS.AUTH_DEMO}/modern/login`,
    //   register: `${ROOTS.AUTH_DEMO}/modern/register`,
    //   forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
    //   newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
    //   verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    // },
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}`,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    person: {
      root: `${ROOTS.DASHBOARD}/person`,
      new: `${ROOTS.DASHBOARD}/person/new`,
      list: `${ROOTS.DASHBOARD}/person/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/person/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/person/${id}/edit`,
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
  user: {
    root: `${ROOTS.USER}`,
    user: {
      root: `${ROOTS.USER}/user`,
      new: `${ROOTS.USER}/user/new`,
      list: `${ROOTS.USER}/user/list`,
      cards: `${ROOTS.USER}/user/cards`,
      profile: `${ROOTS.USER}/user/profile`,
      account: `${ROOTS.USER}/user/account`,
      details: (id: string) => `${ROOTS.USER}/user/${id}`,
      edit: (id: string) => `${ROOTS.USER}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.USER}/user/${MOCK_ID}/edit`,
      },
    },
  },
};
