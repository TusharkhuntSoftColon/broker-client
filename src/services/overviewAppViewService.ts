import { AxiosResponse } from 'axios';

import { GET_USER_ORDERS, GET_USER_ACCOUNTS, GET_USER_POSITIONS } from 'src/utils/urls';

import client from 'src/lib/client';

const overviewService = {
  getUserPositions: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_POSITIONS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserAccounts: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ACCOUNTS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserOrders: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ORDERS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default overviewService;
