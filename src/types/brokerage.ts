export type IBrokerage = {
  _id: string;
  date: string;
  exchangeCode: string;
  symbol: string;
  bco: string;
  bcm: string;
  brkgRate: string;
  brkgRatePer: number;
  currentUser?: any;
  template?: any;
  symbolName?: string;
  exchangeName?: string;
};
