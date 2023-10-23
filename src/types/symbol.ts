// ----------------------------------------------------------------------

export type ISymbolTableFilterValue = string | Date | null;

export type ISymbolTableFilters = {
  name: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type ISymbolHistory = {
  SymbolTime: Date;
  paymentTime: Date;
  deliveryTime: Date;
  completionTime: Date;
  timeline: {
    title: string;
    time: Date;
  }[];
};

export type ISymbolShippingAddress = {
  fullAddress: string;
  phoneNumber: string;
};

export type ISymbolPayment = {
  cardType: string;
  cardNumber: string;
};

export type ISymbolDelivery = {
  shipBy: string;
  speedy: string;
  trackingNumber: string;
};

export type ISymbolCustomer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  ipAddress: string;
};

export type ISymbolProductItem = {
  id: string;
  sku: string;
  name: string;
  price: number;
  coverUrl: string;
  quantity: number;
};

export type ISymbolItem = {
  id: null | undefined;
  spread: number;
  stopLevel: number;
  inrialMargin: number;
  maintenanceMargin: number;
  minVolume: number;
  maximumVolume: number;
  name: string;
  calculation?: string;
  contractSize: string;
  currency: string | any;
  tickSize: number;
  tickValue: number;
  startTradeSessions?: any;
  endTradeSessions?: any;
  startingHour?: any;
  endingHour?: any;
  statusOfScripts?: any;
  stAndTp?: any;
  createdAt?: any;
  orderNumber?: any;
  customer?: any;
  status?: any;
};
