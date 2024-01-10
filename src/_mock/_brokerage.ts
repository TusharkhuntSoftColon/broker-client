import { _mock } from './_mock';

export const _brokerageList = [...Array(20)].map((_, index) => ({
  date: _mock.dates(index),
  exchangeCode: _mock.exchange(index),
  symbol: _mock.symbol(index),
  brokerage_call_option: _mock.bco(index),
  brokerage_call_method: _mock.bcm(index),
  brokerage_rate: _mock.brkg_rate(index),
  brokerage_per: _mock.brkg_per(index),
}));

export const brokerageCallOptions = [
  { value: 'C', label: 'C - On Complitation Of Transaction' },
  { value: 'F', label: 'F - On First Transaction' },
  { value: 'T', label: 'T - On Sell And Buy Both' },
  { value: 'I', label: 'I - Intraday 1, NextDay 2' },
];

export const brokerageCallMethod = [
  { value: 'Q', label: 'Qty ' },
  { value: 'P', label: 'Percentage' },
];
