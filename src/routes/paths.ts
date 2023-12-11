import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth',
  DASHBOARD: '/admstr',
  ADMIN: '/admin',
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
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      details: (id: string) => `${ROOTS.DASHBOARD}/user/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    superMaster: {
      root: `${ROOTS.DASHBOARD}/super-master`,
      new: `${ROOTS.DASHBOARD}/super-master/new`,
      list: `${ROOTS.DASHBOARD}/super-master/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/super-master/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/super-master/${id}/edit`,
    },
    master: {
      root: `${ROOTS.DASHBOARD}/master`,
      new: `${ROOTS.DASHBOARD}/master/new`,
      list: `${ROOTS.DASHBOARD}/master/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/master/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/master/${id}/edit`,
    },
    exchange: {
      root: `${ROOTS.DASHBOARD}/exchange`,
      new: `${ROOTS.DASHBOARD}/exchange/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/exchange/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/exchange/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/exchange/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/exchange/${MOCK_ID}/edit`,
      },
    },
    brokerage: {
      root: `${ROOTS.DASHBOARD}/brokerage`,
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    symbol: {
      root: `${ROOTS.DASHBOARD}/symbol`,
      new: `${ROOTS.DASHBOARD}/symbol/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/symbol/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/symbol/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/symbol/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },
  admin: {
    root: `${ROOTS.ADMIN}/user`,
    user: {
      root: `${ROOTS.ADMIN}/user`,
      new: `${ROOTS.ADMIN}/user/new`,
      list: `${ROOTS.ADMIN}/user/list`,
      cards: `${ROOTS.ADMIN}/user/cards`,
      profile: `${ROOTS.ADMIN}/user/profile`,
      account: `${ROOTS.ADMIN}/user/account`,
      details: (id: string) => `${ROOTS.ADMIN}/user/${id}`,
      edit: (id: string) => `${ROOTS.ADMIN}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.ADMIN}/user/${MOCK_ID}/edit`,
      },
    },
  },
};
