import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt"; // defaults to localStorage for web
import storage from "redux-persist/lib/storage";

import authSlice from "./auth";
import { REDUX_SECRET_KEY } from "../../utils/environments";

const encryptor = encryptTransform({
  secretKey: REDUX_SECRET_KEY,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  // blacklist: ["auth"],
  // stateReconciler: hardSet,
  transforms: [encryptor],
};

const rootReducers = combineReducers({
  auth: authSlice,
});

export default persistReducer(persistConfig, rootReducers);
