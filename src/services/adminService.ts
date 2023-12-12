import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  CREATE_MASTER,
  CREATE_SUPER_MASTER,
  CREATE_USER,
  GET_EXCHANGE_FOR_MASTER,
  GET_EXCHANGE_FOR_SUPERMASTER,
  GET_EXCHANGE_FOR_USER,
} from '../utils/urls';

export interface adminType {
  allowedExchange: any;
  deleteBet: any;
  editBet: any;
  insertCustomBet: any;
  name: string;
  exchangeGroup: any;
}

const adminService = {
  createSuperMaster: async (adminData: adminType): Promise<any> => {
    console.log({ adminData });
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_SUPER_MASTER, {
        ...adminData,
        insertCustomBet: Boolean(adminData?.insertCustomBet),
        editBet: Boolean(adminData?.editBet),
        deleteBet: Boolean(adminData?.deleteBet),
        exchangeGroup: adminData?.exchangeGroup?.map((option: any) => option.value),
        allowedExchange: adminData?.allowedExchange?.map((option: any) => option.value),
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },

  createMaster: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER, {
        ID: data?.ID,
        name: data?.name,
        password: data?.password,
        role: data?.role,
        exchangeGroup: data?.exchangeGroup?.map((option: any) => option.value),
        allowedExchange: data?.allowedExchange?.map((option: any) => option.value),
        leverageX: data?.leverageX,
        leverageY: data?.leverageY,
        limitOfAddUser: data?.limitOfAddUser,
        insertCustomBet: Boolean(data?.insertCustomBet),
        editBet: Boolean(data?.editBet),
        deleteBet: Boolean(data?.deleteBet),
      });
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },

  createUser: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER, {
        ID: data?.ID,
        name: data?.name,
        password: data?.password,
        role: data?.role,
        exchangeGroup: data?.exchangeGroup?.map((option: any) => option.value),
        allowedExchange: data?.allowedExchange?.map((option: any) => option.value),
        leverageX: data?.leverageX,
        leverageY: data?.leverageY,
        brokerage: data?.brokerage,
        investorPassword: data?.investorPassword,
      });
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getExchangeListForSuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_EXCHANGE_FOR_SUPERMASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getExchangeListForMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_EXCHANGE_FOR_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getExchangeListForUser: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_EXCHANGE_FOR_USER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default adminService;
