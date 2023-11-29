import { _mock } from './_mock';
import NorthEastIcon from '@mui/icons-material/NorthEast';

// APP
// ----------------------------------------------------------------------

export const _appRelated = ['Chrome', 'Drive', 'Dropbox', 'Evernote', 'Github'].map(
  (name, index) => {
    const system = [2, 4].includes(index) ? 'Windows' : 'Mac';

    const price = [2, 4].includes(index) ? _mock.number.price(index) : 0;

    const shortcut =
      (name === 'Chrome' && '/assets/icons/app/ic_chrome.svg') ||
      (name === 'Drive' && '/assets/icons/app/ic_drive.svg') ||
      (name === 'Dropbox' && '/assets/icons/app/ic_dropbox.svg') ||
      (name === 'Evernote' && '/assets/icons/app/ic_evernote.svg') ||
      '/assets/icons/app/ic_github.svg';

    return {
      id: _mock.id(index),
      name,
      price,
      system,
      shortcut,
      ratingNumber: _mock.number.rating(index),
      totalReviews: _mock.number.nativeL(index),
    };
  }
);

export const _appInstalled = ['Germany', 'England', 'France', 'Korean', 'USA'].map(
  (name, index) => ({
    id: _mock.id(index),
    name,
    android: _mock.number.nativeL(index),
    windows: _mock.number.nativeL(index + 1),
    apple: _mock.number.nativeL(index + 2),
    flag: ['flagpack:de', 'flagpack:gb-nir', 'flagpack:fr', 'flagpack:kr', 'flagpack:us'][index],
  })
);

export const _appAuthors = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
  totalFavorites: _mock.number.nativeL(index),
}));

export const _appInvoices = [...Array(7)].map((_, index) => {
  const category = ['Android', 'Mac', 'Windows', 'Android', 'Mac', 'Android'][index];

  const status = ['paid', 'out of date', 'progress', 'paid', 'paid', 'Progress'][index];

  return {
    id: _mock.id(index),
    invoiceNumber: `INV-199${index}`,
    price: _mock.number.price(index),
    category,
    status,
  };
});

export const newInvoiceData = [
  {
    id: 0,
    symbol: 'MANNAPURAM/08',
    positions: '1 / 0',
    buy_volume: '2500 / 0',
    buy_price: '147.75 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '2500',
    profit: '-17750.00 / 0.00',
    unCovered: '-17750',
  },
  {
    id: 1,
    symbol: 'INDUSTOWER/08',
    positions: '1 / 0',
    buy_volume: '2500 / 0',
    buy_price: '189.75 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '2500',
    profit: '-7875.00 / 0.00',
    unCovered: '-7875',
  },
  {
    id: 2,
    symbol: 'TATAPOWER/08',
    positions: '1 / 0',
    buy_volume: '2500 / 0',
    buy_price: '143.10 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '2500',
    profit: '-65454.00 / 0.00',
    unCovered: '-65454',
  },
  {
    id: 3,
    symbol: 'ONGC/08',
    positions: '1 / 0',
    buy_volume: '2000 / 0',
    buy_price: '157.87 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '2000',
    profit: '-57896.00 / 0.00',
    unCovered: '-57896',
  },
  {
    id: 4,
    symbol: 'TATASTEEL/08',
    positions: '1 / 0',
    buy_volume: '1750 / 0',
    buy_price: '123.01 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '1750',
    profit: '-750.00 / 0.00',
    unCovered: '-750',
  },
  {
    id: 5,
    symbol: 'SBIN/08',
    positions: '1 / 0',
    buy_volume: '1500 / 0',
    buy_price: '198.67 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '1500',
    profit: '12956.00 / 0.00',
    unCovered: '12956',
  },
  {
    id: 6,
    symbol: 'BATAINIDA/08',
    positions: '1 / 0',
    buy_volume: '1000 / 0',
    buy_price: '190.45 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '1000',
    profit: '-7820.00 / 0.00',
    unCovered: '-7820',
  },
  {
    id: 7,
    symbol: 'HDFCBANK/08',
    positions: '1 / 0',
    buy_volume: '550 / 0',
    buy_price: '145.05 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '550',
    profit: '17790.00 / 0.00',
    unCovered: '17790',
  },
  {
    id: 8,
    symbol: 'HDFCBANK/08',
    positions: '1 / 0',
    buy_volume: '550 / 0',
    buy_price: '145.05 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '550',
    profit: '17790.00 / 0.00',
    unCovered: '17790',
  },
  {
    id: 9,
    symbol: 'HDFCBANK/08',
    positions: '1 / 0',
    buy_volume: '550 / 0',
    buy_price: '145.05 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '550',
    profit: '17790.00 / 0.00',
    unCovered: '17790',
  },
  {
    id: 10,
    symbol: 'HDFCBANK/08',
    positions: '1 / 0',
    buy_volume: '550 / 0',
    buy_price: '145.05 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '550',
    profit: '17790.00 / 0.00',
    unCovered: '17790',
  },
  {
    id: 11,
    symbol: 'HDFCBANK/08',
    positions: '1 / 0',
    buy_volume: '550 / 0',
    buy_price: '145.05 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '550',
    profit: '17790.00 / 0.00',
    unCovered: '17790',
  },
  {
    id: 12,
    symbol: 'HDFCBANK/08',
    positions: '1 / 0',
    buy_volume: '550 / 0',
    buy_price: '145.05 / 0.00',
    sell_volume: '0 / 0',
    sell_price: '0.00 / 0.00',
    net_volume: '550',
    profit: '17790.00 / 0.00',
    unCovered: '17790',
  },
];

export const newInvoiceExposureData = [
  {
    id: 0,
    asset: 'MANNAPURAM/08',
    clients: 25,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 1,
    asset: 'INDUSTOWER/08',
    clients: 56,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 2,
    asset: 'TATAPOWER/08',
    clients: 56,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 3,
    asset: 'ONGC/08',
    clients: 56,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 4,
    asset: 'TATASTEEL/08',
    clients: 56,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 5,
    asset: 'SBIN/08',
    clients: 56,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 6,
    asset: 'BATAINIDA/08',
    clients: 125,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 7,
    asset: 'HDFCBANK/08',
    clients: 9856,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 8,
    asset: 'HDFCBANK/08',
    clients: -2500,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 9,
    asset: 'HDFCBANK/08',
    clients: 56,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 10,
    asset: 'HDFCBANK/08',
    clients: -1025,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 11,
    asset: 'HDFCBANK/08',
    clients: 784,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
  {
    id: 12,
    asset: 'HDFCBANK/08',
    clients: 56,
    coverage: 0,
    nettotal: 25,
    rate: 123456,
    netTotal: 987586.23,
    positive: 10536.5,
    graph: '',
  },
];

export const newInvoiceJournalData = [
  {
    id: 0,
    time: '2023.08.25 10:23:10',
    server: '',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 1,
    time: '2023.08.25 10:23:10',
    server: '',
    message: 'Windows server 20198 build 17763 on Hyper-V, 2 x intel Xeon E5',
  },
  {
    id: 2,
    time: '2023.08.25 10:23:10',
    server: 'Symbols',
    message: '227 records loaded in 0ms',
  },
  {
    id: 3,
    time: '2023.08.25 10:23:10',
    server: 'Network',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 4,
    time: '2023.08.25 10:23:10',
    server: 'Network',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 5,
    time: '2023.08.25 10:23:10',
    server: 'Orders',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 6,
    time: '2023.08.25 10:23:10',
    server: 'Accounts',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 7,
    time: '2023.08.25 10:23:10',
    server: 'Positions',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 8,
    time: '2023.08.25 10:23:10',
    server: 'Online',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 9,
    time: '2023.08.25 10:23:10',
    server: 'TradeCenter',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 10,
    time: '2023.08.25 10:23:10',
    server: 'History',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 11,
    time: '2023.08.25 10:23:10',
    server: 'Accounts',
    message: 'Meta traders 5 manager build 3082 started ',
  },
  {
    id: 12,
    time: '2023.08.25 10:23:10',
    server: 'Orders',
    message: 'Meta traders 5 manager build 3082 started ',
  },
];

export const _appFeatured = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  description: _mock.sentence(index),
  coverUrl: _mock.image.cover(index),
}));

// ANALYTIC
// ----------------------------------------------------------------------

export const _analyticTasks = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.taskNames(index),
}));

export const _analyticPosts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.sentence(index),
}));

export const _analyticOrderTimeline = [...Array(5)].map((_, index) => {
  const title = [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index];

  return {
    id: _mock.id(index),
    title,
    type: `order${index + 1}`,
    time: _mock.time(index),
  };
});

export const _analyticTraffic = [
  {
    value: 'facebook',
    label: 'FaceBook',
    total: _mock.number.nativeL(1),
    icon: 'eva:facebook-fill',
  },
  {
    value: 'google',
    label: 'Google',
    total: _mock.number.nativeL(2),
    icon: 'eva:google-fill',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    total: _mock.number.nativeL(3),
    icon: 'eva:linkedin-fill',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    total: _mock.number.nativeL(4),
    icon: 'eva:twitter-fill',
  },
];

// ECOMMERCE
// ----------------------------------------------------------------------

export const _ecommerceSalesOverview = ['Total Profit', 'Total Income', 'Total Expenses'].map(
  (label, index) => ({
    label,
    totalAmount: _mock.number.price(index) * 100,
    value: _mock.number.percent(index),
  })
);

export const _ecommerceBestSalesman = [...Array(5)].map((_, index) => {
  const category = ['CAP', 'Branded Shoes', 'Headphone', 'Cell Phone', 'Earings'][index];

  const flag = ['flagpack:de', 'flagpack:gb-nir', 'flagpack:fr', 'flagpack:kr', 'flagpack:us'][
    index
  ];

  return {
    id: _mock.id(index),
    flag,
    category,
    rank: `Top ${index + 1}`,
    email: _mock.email(index),
    name: _mock.fullName(index),
    totalAmount: _mock.number.price(index),
    avatarUrl: _mock.image.avatar(index + 8),
  };
});

export const _ecommerceLatestProducts = [...Array(5)].map((_, index) => {
  const colors = (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  return {
    id: _mock.id(index),
    colors,
    name: _mock.productName(index),
    price: _mock.number.price(index),
    coverUrl: _mock.image.product(index),
    priceSale: [1, 3].includes(index) ? _mock.number.price(index) : 0,
  };
});

export const _ecommerceNewProducts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
}));

// BANKING
// ----------------------------------------------------------------------

export const _bankingContacts = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  email: _mock.email(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _bankingCreditCard = [
  {
    id: _mock.id(2),
    balance: 23432.03,
    cardType: 'mastercard',
    cardHolder: _mock.fullName(2),
    cardNumber: '**** **** **** 3640',
    cardValid: '11/22',
  },
  {
    id: _mock.id(3),
    balance: 18000.23,
    cardType: 'visa',
    cardHolder: _mock.fullName(3),
    cardNumber: '**** **** **** 8864',
    cardValid: '11/25',
  },
  {
    id: _mock.id(4),
    balance: 2000.89,
    cardType: 'mastercard',
    cardHolder: _mock.fullName(4),
    cardNumber: '**** **** **** 7755',
    cardValid: '11/22',
  },
];

export const _bankingRecentTransitions = [
  {
    id: _mock.id(2),
    name: _mock.fullName(2),
    avatarUrl: _mock.image.avatar(2),
    type: 'Income',
    message: 'Receive money from',
    category: 'Annette Black',
    date: _mock.time(2),
    status: 'progress',
    amount: _mock.number.price(2),
  },
  {
    id: _mock.id(3),
    name: _mock.fullName(3),
    avatarUrl: _mock.image.avatar(3),
    type: 'Expenses',
    message: 'Payment for',
    category: 'Courtney Henry',
    date: _mock.time(3),
    status: 'completed',
    amount: _mock.number.price(3),
  },
  {
    id: _mock.id(4),
    name: _mock.fullName(4),
    avatarUrl: _mock.image.avatar(4),
    type: 'Receive',
    message: 'Payment for',
    category: 'Theresa Webb',
    date: _mock.time(4),
    status: 'failed',
    amount: _mock.number.price(4),
  },
  {
    id: _mock.id(5),
    name: null,
    avatarUrl: null,
    type: 'Expenses',
    message: 'Payment for',
    category: 'Beauty & Health',
    date: _mock.time(5),
    status: 'completed',
    amount: _mock.number.price(5),
  },
  {
    id: _mock.id(6),
    name: null,
    avatarUrl: null,
    type: 'Expenses',
    message: 'Payment for',
    category: 'Books',
    date: _mock.time(6),
    status: 'progress',
    amount: _mock.number.price(6),
  },
];

// BOOKING
// ----------------------------------------------------------------------

export const _bookings = [...Array(5)].map((_, index) => {
  const status = ['Paid', 'Paid', 'Pending', 'Cancelled', 'Paid'][index];

  const customer = {
    avatarUrl: _mock.image.avatar(index),
    name: _mock.fullName(index),
    phoneNumber: _mock.phoneNumber(index),
  };

  const destination = [...Array(5)].map((__, _index) => ({
    name: _mock.tourName(_index + 1),
    coverUrl: _mock.image.travel(_index + 1),
  }))[index];

  return {
    id: _mock.id(index),
    destination,
    status,
    customer,
    checkIn: _mock.time(index),
    checkOut: _mock.time(index),
  };
});

export const _bookingsOverview = [...Array(3)].map((_, index) => ({
  status: ['Pending', 'Canceled', 'Sold'][index],
  quantity: _mock.number.nativeL(index),
  value: _mock.number.percent(index),
}));

export const _bookingReview = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  postedAt: _mock.time(index),
  rating: _mock.number.rating(index),
  avatarUrl: _mock.image.avatar(index),
  description: _mock.description(index),
  tags: ['Great Sevice', 'Recommended', 'Best Price'],
}));

export const _bookingNew = [...Array(5)].map((_, index) => ({
  guests: '3-5',
  id: _mock.id(index),
  bookedAt: _mock.time(index),
  duration: '3 days 2 nights',
  isHot: _mock.boolean(index),
  name: _mock.fullName(index),
  price: _mock.number.price(index),
  avatarUrl: _mock.image.avatar(index),
  coverUrl: _mock.image.travel(index),
}));

export const symbolTableDashboard = [...Array(10)].map((_, index) => {
  const bid = [123, 446, 533, 23234, 675, 3234, 8784, 8858, 485, 7, 5458, 5, 554, 548, 8, 5, 5][
    index
  ];

  const ask = [12324, 444, 6554, 7451, 14554, 5444, 6565, 65, 65, 6956, 65, 6, 95, 2, 5][index];

  return {
    id: _mock.id(index),
    symbol: `BANKNIFTY/${index}`,
    bid,
    ask,
  };
});

export const clientsTableDashboard = [...Array(10)].map((_, index) => {
  const bid = [123, 446, 533, 23234, 675, 3234, 8784, 8858, 485, 7, 5458, 5, 554, 548, 8, 5, 5][
    index
  ];

  const login = [
    120521, 120521, 120521, 120521, 120521, 120521, 120521, 120521, 120521, 120521, 120521, 120521,
    120521, 120521, 120521, 120521, 120521, 120521,
  ][index];

  const position = [
    104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354,
    104354, 104354, 104354, 104354, 104354, 104354,
  ][index];

  const price1 = [
    104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354,
    104354, 104354, 104354, 104354, 104354, 104354,
  ][index];

  const price2 = [
    104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354, 104354,
    104354, 104354, 104354, 104354, 104354, 104354,
  ][index];

  const volume = [
    '1K',
    '25',
    '1K',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
    '104354',
  ][index];

  const ask = [12324, 444, 6554, 7451, 14554, 5444, 6565, 65, 65, 6956, 65, 6, 95, 2, 5][index];
  const type = [
    'sell',
    'buy',
    'sell',
    'buy',
    'sell',
    'buy',
    'sell',
    'buy',
    'sell',
    'buy',
    'sell',
    'buy',
    'sell',
    'buy',
    'sell',
  ][index];
  const reason = [
    'Mobile',
    'Client',
    'Mobile',
    'Client',
    'Mobile',
    'Client',
    'Mobile',
    'Client',
    'Mobile',
    'Client',
    'Mobile',
    'Client',
    'Mobile',
    'Client',
    'Mobile',
  ][index];

  return {
    id: _mock.id(index),
    login,
    position,
    symbol: `BANKNIFTY/${index}`,
    type,
    volume,
    price1,
    price2,
    reason,
    swap: 0.0,
  };
});

export const newClientsTableData = [
  {
    id: 0,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
  {
    id: 1,
    login: 120522,
    position: 10825326,
    symbol: 'banknifty/08',
    type: 'buy',
    volume: '25',
    price1: 43965.7,
    price2: 44282.7,
    reason: 'Client',
    swap: 0.0,
  },
  {
    id: 2,
    login: 120508,
    position: 10681332,
    symbol: 'bataindia/08',
    type: 'buy',
    volume: '1K',
    price1: 1720.25,
    price2: 1700.25,
    reason: 'Client',
    swap: 0.0,
  },
  {
    id: 3,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
  {
    id: 4,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
  {
    id: 5,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
  {
    id: 6,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
  {
    id: 7,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
  {
    id: 8,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
  {
    id: 9,
    login: 120521,
    position: 10477383,
    symbol: 'ashokley/08',
    type: 'sell',
    volume: '1K',
    price1: 186.05,
    price2: 185.25,
    reason: 'Mobile',
    swap: 0.0,
  },
];

export const newClientsAccountTableData = [
  {
    id: 0,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 1,
    login: 120522,
    name: 120522,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 2,
    login: 120508,
    name: 120508,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 3,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 4,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 5,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 6,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 7,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 8,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
  {
    id: 9,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    balance: 52360.1,
    credit: 1000000.0,
    equity: 1015478.21,
  },
];

export const newClientsOnlineTableData = [
  {
    id: 0,
    login: 120521,
    name: 120521,
    group: `AROBRIDGE INT/120500/NSE`,
    client: 'Windows',
    version: 3802,
    ip: '49.34.186.186',
    equity: 1016608,
  },
  {
    id: 1,
    login: 120522,
    name: 120522,
    group: `AROBRIDGE INT/120500/NSE`,
    client: 'Windows',
    version: 3815,
    ip: '49.43.35.168',
    equity: 1016608,
  },
];

export const newClientsOrderTableData = [
  {
    id: 0,
    login: 120521,
    order: 11265854,
    symbol: 'tatapower',
    time: '2023.08.25 10:23:10',
    type: 'buy stop',
    volume: '2.5K / 0',
    price1: 168.05,
    sl: 0.0,
    tp: 0.0,
    price2: 168.85,
  },
];

export const newSymbolTableData = [
  {
    id: 0,
    symbol: 'BANKNIFTY/08',
    bid: 44283.0,
    ask: 44292.1,
  },
  {
    id: 1,
    symbol: 'NIFTY/08',
    bid: 19271.8,
    ask: 19272.0,
  },
  {
    id: 2,
    symbol: 'GIFT-NIFTY/08',
    bid: 19262.0,
    ask: 19262.5,
  },
  {
    id: 3,
    symbol: 'SILVER/09',
    bid: 73332.0,
    ask: 73336.0,
  },
  {
    id: 4,
    symbol: 'GOLD/10',
    bid: 58720.0,
    ask: 58729.1,
  },
  {
    id: 5,
    symbol: 'DOWJONES/08',
    bid: 34132,
    ask: 34137,
  },
  {
    id: 6,
    symbol: 'NASDAQ/08',
    bid: 14760.2,
    ask: 14761.2,
  },
  {
    id: 7,
    symbol: 'NQ/09',
    bid: 14802.0,
    ask: 14802.75,
  },
  {
    id: 8,
    symbol: 'ES/09',
    bid: 4382.0,
    ask: 4382.25,
  },
  {
    id: 9,
    symbol: 'YM/09',
    bid: 34168.0,
    ask: 34170.0,
  },
  {
    id: 10,
    symbol: 'SI/09',
    bid: 24.095,
    ask: 24.1,
  },
];

export const newMarginCallTableData = [
  {
    id: 0,
    login: '',
    level: '',
  },
  {
    id: 1,
    symbol: 'NIFTY/08',
    login: '',
    level: '',
  },
  {
    id: 2,
    symbol: 'GIFT-NIFTY/08',
    login: '',
    level: '',
  },
  {
    id: 3,
    symbol: 'SILVER/09',
    login: '',
    level: '',
  },
  {
    id: 4,
    symbol: 'GOLD/10',
    login: '',
    level: '',
  },
  {
    id: 5,
    symbol: 'DOWJONES/08',
    login: '',
    level: '',
  },
  {
    id: 6,
    symbol: 'NASDAQ/08',
    login: '',
    level: '',
  },
  {
    id: 7,
    symbol: 'NQ/09',
    login: '',
    level: '',
  },
  {
    id: 8,
    symbol: 'ES/09',
    login: '',
    level: '',
  },
  {
    id: 9,
    symbol: 'YM/09',
    login: '',
    level: '',
  },
  {
    id: 10,
    symbol: 'SI/09',
    login: '',
    level: '',
  },
];
