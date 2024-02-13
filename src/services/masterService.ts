import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  GET_SYMBOL_MASTER,
  CREATE_USER_BY_MASTER,
  DELETE_USER_BY_MASTER,
  UPDATE_USER_BY_MASTER,
  GET_ALL_PERSONS_BY_MASTER,
  GET_BROKERAGE_LIST_FOR_MASTER,
  IMPORT_MONTH_ORDER_FOR_MASTER,
  UPDATED_SELECTED_LIST_FOR_MASTER,
  SET_IMPORT_MONTH_LIST_FOR_MASTER,
  IMPORT_MONTH_ORDER_LIST_FOR_MASTER,
  GET_ASSIGNED_EXCHANGE_LIST_FOR_MASTER,
} from '../utils/urls';

export interface adminType {
  allowedExchange: any;
  deleteBet: any;
  editBet: any;
  insertCustomBet: any;
  name: string;
}

const masterService = {
  createUser: async (data: any): Promise<any> => {
    const date = new Date(data?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const newExchangeList = [
      ...data?.exchangeList,
      {
        allowedExchange: data?.allowedExchange.value,
        exchangeGroup: data?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      data?.allowedExchange.value && data?.exchangeGroup.value
        ? newExchangeList
        : data?.exchangeList;

    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_MASTER, {
        ...data,
        leverageXY: `[${data?.leverageXY?.value}]`,
        date: `${year}-${month}-${day}`,
        template: data?.template?.value,
        role: data?.role?.value,
        exchangeCode: data?.exchangeCode?.value,
        bco: data?.bco?.value,
        bcm: data?.bcm?.value,
        symbol: data?.symbol?.value,
        exchangeList,
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getAllPersons: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_ALL_PERSONS_BY_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  updateUser: async (UserData: any): Promise<any> => {
    const date = new Date(UserData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const newExchangeList = [
      ...UserData?.exchangeList,
      {
        allowedExchange: UserData?.allowedExchange.value,
        exchangeGroup: UserData?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      UserData?.allowedExchange.value && UserData?.exchangeGroup.value
        ? newExchangeList
        : UserData?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_USER_BY_MASTER}/${UserData._id}`,
        {
          ...UserData,
          leverageXY: `[${UserData?.leverageXY.value}]`,
          role: UserData?.role?.value,
          date: `${year}-${month}-${day}`,
          template: UserData?.template?.value,
          exchangeCode: UserData?.exchangeCode?.value,
          bco: UserData?.bco?.value,
          bcm: UserData?.bcm?.value,
          symbol: UserData?.symbol?.value,
          exchangeList,
        }
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteUser: async (id: String): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(`${DELETE_USER_BY_MASTER}${id}`);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getBrokerageList: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_BROKERAGE_LIST_FOR_MASTER);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getSymbolListMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_SYMBOL_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getImportMonthOrderListByMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(IMPORT_MONTH_ORDER_LIST_FOR_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getupdatedImportMonthListByMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(UPDATED_SELECTED_LIST_FOR_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  updateImportMonthOrder: async (symbolIds: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.put(`${IMPORT_MONTH_ORDER_FOR_MASTER}`, {
        selectedImportMonth: symbolIds,
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  addSelectedImportMonth: async (symbolIds: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(
        `${SET_IMPORT_MONTH_LIST_FOR_MASTER}`,
        {
          selectedImportMonth: symbolIds,
        }
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getassignedExchangeListByMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_ASSIGNED_EXCHANGE_LIST_FOR_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default masterService;
