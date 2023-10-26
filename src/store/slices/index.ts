import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt'; // defaults to localStorage for web
import storage from 'redux-persist/lib/storage';

import authSlice from './auth';
import adminSlice from './admin';
import exchangeSlice from './exchange';
import symbolSlice from './symbol';

import { REDUX_SECRET_KEY } from '../../utils/environments';

const encryptor = encryptTransform({
  secretKey: REDUX_SECRET_KEY,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'admin', 'exchange', 'symbol'],
  // blacklist: ["auth"],
  // stateReconciler: hardSet,
  transforms: [encryptor],
};

const rootReducers = combineReducers({
  auth: authSlice,
  admin: adminSlice,
  exchange: exchangeSlice,
  symbol: symbolSlice,
});

export default persistReducer(persistConfig, rootReducers);
