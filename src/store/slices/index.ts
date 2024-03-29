import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
// import { encryptTransform } from 'redux-persist-transform-encrypt';

import authSlice from './auth';
import adminSlice from './admin';
import symbolSlice from './symbol';
import personSlice from './person';
import exchangeSlice from './exchange';

// const encryptor = encryptTransform({
//   secretKey: REDUX_SECRET_KEY,
// });

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'admin', 'exchange', 'symbol'],
  // blacklist: ["auth"],
  // stateReconciler: hardSet,
  // transforms: [encryptor],
};

const rootReducers = combineReducers({
  auth: authSlice,
  admin: adminSlice,
  exchange: exchangeSlice,
  symbol: symbolSlice,
  person: personSlice,
});

export default persistReducer(persistConfig, rootReducers);
