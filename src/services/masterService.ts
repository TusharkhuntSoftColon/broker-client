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
  GET_BROKERAGE_LIST_FOR_USER_UPDATE_BY_MASTER,
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
    const withoutBrokerageData = {
      ID: data?.ID,
      name: data?.name,
      password: data?.password,
      exchangeList: data?.fields,
      role: data?.role?.value,
      creditLimit: data?.creditLimit,
      positionMinTime: data?.positionMinTime,
      leverageXY: data?.leverageXY?.value,
      isBrokerageAllowed: data?.isBrokerageAllowed,
      isActive: data?.isActive,
      investorPassword: data?.investorPassword,
    };

    const brokerageData = {
      ...withoutBrokerageData,
      brockrageTamplates: data?.tableData?.map((item: any) => ({
        date: item.date,
        template: item.template,
        exchangeId: item.exchangeId,
        symbol: item.symbol,
        bco: item.bco,
        bcm: item.bcm,
        brkgRate: item.brkgRate,
        brkgRatePer: item.brkgRatePer,
      })),
    };

    const usersData = data?.isBrokerageAllowed ? brokerageData : withoutBrokerageData;

    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_MASTER, usersData);
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
  updateUser: async (data: any): Promise<any> => {
    const withoutBrokerageData = {
      ID: data?.ID,
      name: data?.name,
      password: data?.password,
      exchangeList: data?.fields,
      role: data?.role?.value,
      positionMinTime: data?.positionMinTime,
      creditLimit: data?.creditLimit,
      leverageXY: data?.leverageXY?.value,
      isBrokerageAllowed: data?.isBrokerageAllowed,
      isActive: data?.isActive,
      investorPassword: data?.investorPassword,
    };

    const brokerageData = {
      ...withoutBrokerageData,
      brockrageTamplates: data?.tableData?.map((item: any) => ({
        date: item.date,
        template: item.template,
        exchangeId: item.exchangeId,
        symbol: item.symbol,
        bco: item.bco,
        bcm: item.bcm,
        brkgRate: item.brkgRate,
        brkgRatePer: item.brkgRatePer,
      })),
    };

    const usersData = data?.isBrokerageAllowed ? brokerageData : withoutBrokerageData;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_USER_BY_MASTER}/${data._id}`,
        usersData
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
  getBrokerageListForUserUpdate: async (id?: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_BROKERAGE_LIST_FOR_USER_UPDATE_BY_MASTER}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
};

export default masterService;
