// AUTH
export const ADMIN_AUTH = '/auth/login';
export const CREATE_ADMIN = '/auth/admin';

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

// MASTER
export const CREATE_USER_BY_MASTER = '/master/user';
export const GET_ALL_PERSONS_BY_MASTER = '/master/person';

export const GET_EXCHANGE_FOR_USER_BY_MASTER = '/master/all-exchanges';

export const UPDATE_USER_BY_MASTER = '/master/user/update';

export const DELETE_USER_BY_MASTER = '/master/user/remove/';

// Exchange
export const EXCHANGE_CREATE = '/exchange/create';
export const EXCHANGE_LIST = '/exchange/get';
export const EXCHANGE_UPDATE = '/exchange/update/';
export const EXCHANGE_DELETE = '/exchange/delete/';

// symbol

export const GET_SYMBOL_LIST = '/symbol/get';
export const ADD_SYMBOL = '/symbol/create';
export const UPDATE_SYMBOL = '/symbol/update/';
export const DELETE_SYMBOL = '/symbol/delete/';

// exchange

export const GET_EXCHANGE_LIST = '/exchange/get';
export const ADD_EXCHANGE = '/exchange/create';
export const UPDATE_EXCHANGE = '/exchange/update/';
export const DELETE_EXCHANGE = '/exchange/delete/';
