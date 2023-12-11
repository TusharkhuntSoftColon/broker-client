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
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    person: {
      root: `${ROOTS.DASHBOARD}/person`,
      new: `${ROOTS.DASHBOARD}/person/new`,
      list: `${ROOTS.DASHBOARD}/person/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/person/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/person/${id}/edit`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/user/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
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
  superMaster: {
    root: `${ROOTS.SUPER_MASTER}`,
    master: {
      root: `${ROOTS.SUPER_MASTER}/master`,
      new: `${ROOTS.SUPER_MASTER}/master/new`,
      list: `${ROOTS.SUPER_MASTER}/master/list`,
      details: (id: string) => `${ROOTS.SUPER_MASTER}/master/${id}`,
      edit: (id: string) => `${ROOTS.SUPER_MASTER}/master/${id}/edit`,
    },
    user: {
      root: `${ROOTS.SUPER_MASTER}/user`,
      new: `${ROOTS.SUPER_MASTER}/user/new`,
      list: `${ROOTS.SUPER_MASTER}/user/list`,
      details: (id: string) => `${ROOTS.SUPER_MASTER}/user/${id}`,
      edit: (id: string) => `${ROOTS.SUPER_MASTER}/user/${id}/edit`,
    },
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
