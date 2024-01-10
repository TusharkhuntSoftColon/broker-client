// ----------------------------------------------------------------------

import { _mock } from './_mock';

export const PRODUCT_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const STATUS_OF_EXCHANGE = [
  { value: 'OPEN', label: 'Open' },
  { value: 'CLOSE', label: 'Close Only' },
  { value: 'DISABLE', label: 'Disabled' },
];

export const STOP_LOSS = [
  { value: true, label: 'On' },
  { value: false, label: 'Off' },
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'violet', label: 'Violet' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
];

export const PRODUCT_SIZE_OPTIONS = [
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '8.5', label: '8.5' },
  { value: '9', label: '9' },
  { value: '9.5', label: '9.5' },
  { value: '10', label: '10' },
  { value: '10.5', label: '10.5' },
  { value: '11', label: '11' },
  { value: '11.5', label: '11.5' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
];

export const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: 'In stock' },
  { value: 'low stock', label: 'Low stock' },
  { value: 'out of stock', label: 'Out of stock' },
];

export const PRODUCT_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  {
    group: 'Clothing',
    classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'],
  },
  {
    group: 'Tailored',
    classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'],
  },
  {
    group: 'Accessories',
    classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'],
  },
];

export const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

export const _productList = [...Array(20)].map((_, index) => ({
  name: _mock.exchange(index),
  id: _mock.exchangeId(index),
  status: _mock.status(index),
  createdAt: _mock.dates(index),
  updatedAt: _mock.dates(index),
  label: _mock.exchange(index),
}));

export const Exchanges = [
  { label: 'NYSE' },
  { label: 'NASDAQ' },
  { label: 'LSE' },
  { label: 'TSE' },
  { label: 'HKEX' },
  { label: 'SSE' },
  { label: 'Euronext' },
  { label: 'TSX' },
  { label: 'BSE' },
  { label: 'FWB' },
  { label: 'B3' },
  { label: 'ASX' },
  { label: 'KRX' },
  { label: 'TWSE' },
  { label: 'BMV' },
  { label: 'MOEX' },
  { label: 'JSE' },
  { label: 'BIST' },
  { label: 'SIX' },
  { label: 'BME' },
];

export const ExchangeStatus = [
  { value: true, label: 'Active' },
  { value: false, label: 'In Active' },
];

export const ClientList = [
  { label: 'Template 1', value: 'Template1' },
  { label: 'Template 2', value: 'Template2' },
  { label: 'Template 3', value: 'Template3' },
  { label: 'Template 4', value: 'Template4' },
  { label: 'Template 5', value: 'Template5' },
  { label: 'Template 6', value: 'Template6' },
];
