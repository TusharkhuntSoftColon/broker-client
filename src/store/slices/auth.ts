/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
interface AuthState {
  token: null | string;
  refreshToken: null | string;
  role: string | null;
  active: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: null,
  refreshToken: null,
  role: null,
  active: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: () => initialState,
    setCredentials: (state, action) => {
      const { accessToken, role, refreshToken } = action.payload;
      console.log(action.payload);

      state.token = accessToken;
      state.refreshToken = refreshToken;
      if (role === 'SUPER_ADMIN') {
        state.active = 'dashboard';
      } else {
        state.active = 'admin';
      }
      state.role = role;
    },
    setRefreshToken: (state, action) => {
      const { access_token, refresh_token } = action.payload;
      state.token = access_token;
      state.refreshToken = refresh_token;
    },
  },
});

export const { setCredentials, resetState, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectUserName = (state: RootState) => state.auth.userName;
