/* eslint-disable no-return-assign */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import client from './client';

import { resetState, setRefreshToken } from '../store/slices/auth';
import { BASE_URL } from '../utils/environments';

let isRefreshTokenUpdating = false;

export default function addAuthTokenInterceptor(store) {
  client.interceptors.request.use((req) => {
    const { token } = store.getState().auth;

    if (!token) return req;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error?.config;
      const { refreshToken } = store.getState().auth;
      const { token } = store.getState().auth;
      // originalConfig._retry = true;

      if (error.response) {
        if (
          !isRefreshTokenUpdating &&
          refreshToken &&
          error?.response?.status === 406 &&
          !originalConfig._retry
        ) {
          // If user login and have refresh token
          isRefreshTokenUpdating = true;
          originalConfig._retry = true;

          try {
            const data = JSON.stringify({
              refresh_token: refreshToken,
            });

            const config = {
              method: 'put',
              maxBodyLength: Infinity,
              url: `${BASE_URL}/admin/generate-new-refresh-token`,
              headers: {
                'Content-Type': 'application/json',
              },
              data,
            };

            const result = await axios.request(config);
            isRefreshTokenUpdating = false;
            store.dispatch(setRefreshToken(result.data.data));
            return await client(originalConfig);
          } catch (error) {
            isRefreshTokenUpdating = false;
            store.dispatch(resetState());
            return (window.location = '/login');
          }
        } else if (isRefreshTokenUpdating) {
          // If refresh token is updating
          await isRefreshTokenDone();
          return client(originalConfig);
        } else if (token && token.length === 0) {
          store.dispatch(resetState());
          window.location = '/login';
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Stop Function excution still refresh token did't update
 */
const isRefreshTokenDone = async () => {
  if (isRefreshTokenUpdating) {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for one second
    return await isRefreshTokenDone();
  }

  return true;
};
