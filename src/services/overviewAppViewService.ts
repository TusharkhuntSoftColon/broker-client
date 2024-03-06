import { AxiosResponse } from 'axios';

import {
  GET_USER_ORDERS_BY_ADMIN,
  GET_USER_ORDERS_BY_MASTER,
  GET_USER_ACCOUNTS_BY_ADMIN,
  GET_USER_POSITIONS_BY_ADMIN,
  GET_USER_ACCOUNTS_BY_MASTER,
  GET_USER_POSITIONS_BY_MASTER,
  GET_USER_ORDERS_BY_SUPER_MASTER,
  GET_USER_ACCOUNTS_BY_SUPER_MASTER,
  GET_USER_POSITIONS_BY_SUPER_MASTER,
} from 'src/utils/urls';

import client from 'src/lib/client';

const overviewService = {
  // BY ADMIN
  getUserPositionsByAdmin: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_POSITIONS_BY_ADMIN);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserAccountsByAdmin: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ACCOUNTS_BY_ADMIN);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserOrdersByAdmin: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ORDERS_BY_ADMIN);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // BY SUPER MASTER
  getUserPositionsBySuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_POSITIONS_BY_SUPER_MASTER);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserAccountsBySuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ACCOUNTS_BY_SUPER_MASTER);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserOrdersBySuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ORDERS_BY_SUPER_MASTER);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // BY MASTER
  getUserPositionsByMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_POSITIONS_BY_MASTER);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserAccountsByMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ACCOUNTS_BY_MASTER);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserOrdersByMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_ORDERS_BY_MASTER);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default overviewService;
