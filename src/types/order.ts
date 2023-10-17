// ----------------------------------------------------------------------

export type IOrderTableFilterValue = string | Date | null;

export type IOrderTableFilters = {
  name: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type IOrderHistory = {
  orderTime: Date;
  paymentTime: Date;
  deliveryTime: Date;
  completionTime: Date;
  timeline: {
    title: string;
    time: Date;
  }[];
};

export type IOrderShippingAddress = {
  fullAddress: string;
  phoneNumber: string;
};

export type IOrderPayment = {
  cardType: string;
  cardNumber: string;
};

export type IOrderDelivery = {
  shipBy: string;
  speedy: string;
  trackingNumber: string;
};

export type IOrderCustomer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  ipAddress: string;
};

export type IOrderProductItem = {
  id: string;
  sku: string;
  name: string;
  price: number;
  coverUrl: string;
  quantity: number;
};

export type IOrderItem = {
  id?: null | undefined;
  spread: number;
  stopLevel: number | any;
  inrialMargin: number;
  maintenanceMargin: number;
  mimVolume: number;
  maximumVolume: number;
  name: string;
  calculation?: string;
  contractSize: number | any;
  currency: string | any;
  tickSize: number | any;
  tickValue: number | any;
  startTradeSessions?: any;
  endTradeSessions?: any;
  startingHour?: any;
  endingHour?: any;
  statusOfScripts?: any;
  stopLoss?: any;
  createdAt?: any;
  orderNumber?: any;
  customer?: any;
  status?: any;
};
