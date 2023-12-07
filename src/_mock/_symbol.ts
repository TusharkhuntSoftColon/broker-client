import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const ORDER_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
];

export const TRADE_SESSIONS_DAYS = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
];

export const TRADE_HOURS = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
];

export const STATUS_OF_SCRIPTS = [
  { value: 'open', label: 'Open' },
  { value: 'closeOnly', label: 'Close Only' },
  { value: 'disabled', label: 'Disabled' },
];

export const STOP_LOSS = [
  { value: true, label: 'On' },
  { value: false, label: 'Off' },
];

export const SYMBOL_CURRENCY = [
  {
    label: 'INR',
    value: 'INR',
  },
  {
    label: 'USD',
    value: 'USD',
  },
];

export const SYMBOL_TICK_SIZE = [
  {
    label: '0-10',
    value: [0, 10],
  },
  {
    label: '11-20',
    value: [11, 20],
  },
  {
    label: '21-30',
    value: [21, 30],
  },
  {
    label: '31-40',
    value: [31, 40],
  },
];

const ITEMS = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
  price: _mock.number.price(index),
}));

export const _orders = [...Array(20)].map((_, index) => {
  const shipping = 10;

  const discount = 10;

  const taxes = 10;

  const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 3 && ITEMS.slice(1, 3)) || ITEMS;

  const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const subTotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  const totalAmount = subTotal - shipping - discount + taxes;

  const customer = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: '192.158.1.38',
  };

  const delivery = {
    shipBy: 'DHL',
    speedy: 'Standard',
    trackingNumber: 'SPX037739199373',
  };

  const history = {
    orderTime: _mock.time(1),
    paymentTime: _mock.time(2),
    deliveryTime: _mock.time(3),
    completionTime: _mock.time(4),
    timeline: [
      { title: 'Delivery successful', time: _mock.time(1) },
      { title: 'Transporting to [2]', time: _mock.time(2) },
      { title: 'Transporting to [1]', time: _mock.time(3) },
      {
        title: 'The shipping unit has picked up the goods',
        time: _mock.time(4),
      },
      { title: 'Order has been created', time: _mock.time(5) },
    ],
  };

  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt: _mock.time(index),
    taxes,
    items,
    history,
    subTotal,
    shipping,
    discount,
    customer,
    delivery,
    totalAmount,
    totalQuantity,
    shippingAddress: {
      fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phoneNumber: '365-374-4961',
    },
    payment: {
      cardType: 'mastercard',
      cardNumber: '**** **** **** 5678',
    },
    status:
      (index % 2 && 'completed') ||
      (index % 3 && 'pending') ||
      (index % 4 && 'cancelled') ||
      'refunded',
  };
});

export const _symbolList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  contractSize: '85807',
  currency: 'rerer',
  spread: 'erewr',
  stopsLevel: '2332',
  // email: _mock.email(index),
  calculation: '908 Jack Locks',
  name: _mock.fullName(index),
  tickSize: _mock.boolean(index),
  tickValue: _mock.companyName(index),
  initialMargin: '234',
  minimumVolume: 'dasdsd',
  maximumVolume: 'asdasd',
  startTradeSessions: 'Sunday',
  endTradeSessions: 'asdsad',
  maintenanceMargin: 'sdfsdf',
  // phoneNumber: _mock.phoneNumber(index),
  startingHour: '12',
  endingHour: '10',
  statusOfScripts: 'sdafsdf',
  stopLoss: 'asdas',
}));
