// AUTH
export const ADMIN_AUTH = '/auth/login';
export const CREATE_ADMIN = '/auth/admin';

// Trade
export const BUY_TRADE = '/trade/buy';

// ADMIN
export const CREATE_SUPER_MASTER_BY_ADMIN = '/admin/super-master';
export const CREATE_MASTER_BY_ADMIN = '/admin/master';
export const CREATE_USER_BY_ADMIN = '/admin/user';

export const GET_ALL_PERSONS_BY_ADMIN = '/admin/person';
export const GET_EXCHANGE_FOR_SUPERMASTER = '/admin/all-exchanges';
export const GET_EXCHANGE_FOR_MASTER = '/super-master/all-exchanges';
export const GET_EXCHANGE_FOR_USER = '/master/all-exchanges';
export const GET_ALL_USER_BYID = '/allusers';

export const UPDATE_SUPER_MASTER_BY_ADMIN = '/admin/super-master/update';
export const UPDATE_MASTER_BY_ADMIN = '/admin/master/update';
export const UPDATE_USER_BY_ADMIN = '/admin/user/update';

export const DELETE_SUPER_MASTER_BY_ADMIN = '/admin/super-master/remove/';
export const DELETE_MASTER_BY_ADMIN = '/admin/master/remove/';
export const DELETE_USER_BY_ADMIN = '/admin/user/remove/';

export const GET_BROKERAGE_LIST = '/admin/brockrage';

export const GET_IMPORT_MONTH_LIST_BY_ADMIN = '/admin/exchange-list';

export const IMPORT_MONTH_ORDER_FOR_ADMIN = '/admin/importmonth-position';
export const IMPORT_MONTH_ORDER_LIST_FOR_ADMIN = '/admin/selected-importMonth';
export const SET_IMPORT_MONTH_LIST_FOR_ADMIN = '/admin/select-assigne-importmonth';

export const UPDATED_SELECTED_LIST_FOR_ADMIN = '/admin/user-select-importmonth';
export const GET_ASSIGNED_IMPORT_MONTH_LIST_FOR_ADMIN = '/admin/assign/importmonth';

// SUPER MASTER
export const CREATE_MASTER_BY_SUPER_MASTER = '/super-master/master';
export const CREATE_USER_BY_SUPER_MASTER = '/super-master/user';

export const GET_ALL_PERSONS_BY_SUPER_MASTER = '/super-master/person';
export const GET_EXCHANGE_FOR_MASTER_BY_SUPER_MASTER = '/super-master/all-exchanges';
export const GET_EXCHANGE_FOR_USER_BY_SUPER_MASTER = '/master/all-exchanges';

export const UPDATE_MASTER_BY_SUPER_MASTER = '/super-master/master/update';
export const UPDATE_USER_BY_SUPER_MASTER = '/super-master/user/update';

export const DELETE_MASTER_BY_SUPER_MASTER = '/super-master/master/remove/';
export const DELETE_USER_BY_SUPER_MASTER = '/super-master/user/remove/';

export const GET_BROKERAGE_LIST_FOR_SUPER_MASTER = '/super-master/brockrage';
export const GET_SYMBOL_SUPER_MASTER = '/super-master/all-symbols';

export const GET_IMPORT_MONTH_LIST_BY_SUPER_MASTER = '/super-master/exchange-list';

// MASTER
export const CREATE_USER_BY_MASTER = '/master/user';
export const GET_ALL_PERSONS_BY_MASTER = '/master/person';

export const GET_EXCHANGE_FOR_USER_BY_MASTER = '/master/all-exchanges';
export const GET_BROKERAGE_LIST_FOR_MASTER = '/master/brockrage';

export const UPDATE_USER_BY_MASTER = '/master/user/update';
export const GET_SYMBOL_MASTER = '/master/all-symbols';

export const DELETE_USER_BY_MASTER = '/master/user/remove/';

export const GET_IMPORT_MONTH_LIST_BY_MASTER = '/master/exchange-list';

// Exchange
export const EXCHANGE_CREATE = '/exchange/create';
export const EXCHANGE_LIST = '/exchange/get';
export const EXCHANGE_UPDATE = '/exchange/update/';
export const EXCHANGE_DELETE = '/exchange/delete/';

// symbol

export const ADD_SYMBOL = '/symbol/create';
export const GET_SYMBOL_LIST = '/symbol/get';
export const GET_SYMBOL_LIST_BY_USER = '/user/selected-symbol';
export const GET_SYMBOL_ADMIN = '/admin/all-symbols';
export const UPDATE_SYMBOL = '/symbol/update/';
export const DELETE_SYMBOL = '/symbol/delete/';

// exchange

export const GET_EXCHANGE_LIST = '/exchange/get';
export const ADD_EXCHANGE = '/exchange/create';
export const UPDATE_EXCHANGE = '/exchange/update/';
export const DELETE_EXCHANGE = '/exchange/delete/';
export const GET_EXCHANGE_LIST_BY_USER = 'user/exchange-list';

// import month
export const GET_USER_IMPORT_MONTH = '/admin/importmonth';
