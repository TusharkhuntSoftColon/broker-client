import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  GET_SYMBOL_SUPER_MASTER,
  CREATE_USER_BY_SUPER_MASTER,
  DELETE_USER_BY_SUPER_MASTER,
  UPDATE_USER_BY_SUPER_MASTER,
  CREATE_MASTER_BY_SUPER_MASTER,
  DELETE_MASTER_BY_SUPER_MASTER,
  UPDATE_MASTER_BY_SUPER_MASTER,
  GET_ALL_PERSONS_BY_SUPER_MASTER,
  GET_BROKERAGE_LIST_FOR_SUPER_MASTER,
  IMPORT_MONTH_ORDER_FOR_SUPER_MASTER,
  UPDATED_SELECTED_LIST_FOR_SUPER_MASTER,
  SET_IMPORT_MONTH_LIST_FOR_SUPER_MASTER,
  IMPORT_MONTH_ORDER_LIST_FOR_SUPER_MASTER,
  GET_ASSIGNED_EXCHANGE_LIST_FOR_SUPER_MASTER,
} from '../utils/urls';

export interface adminType {
  allowedExchange: any;
  deleteBet: any;
  editBet: any;
  insertCustomBet: any;
  name: string;
}

const superMasterService = {
  createMaster: async (data: any): Promise<any> => {
    const date = new Date(data?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    try {
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER_BY_SUPER_MASTER, {
        ...data,
        leverageXY: `[${data?.leverageXY.value}]`,
        role: data?.role?.value,
        date: `${year}-${month}-${day}`,
        template: data?.template?.value,
        exchangeCode: data?.exchangeCode?.value,
        bco: data?.bco?.value,
        bcm: data?.bcm?.value,
        symbol: data?.symbol?.value,
        exchangeList: data?.fields,
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  createUser: async (data: any): Promise<any> => {
    const date = new Date(data?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_SUPER_MASTER, {
        ...data,
        leverageXY: `[${data?.leverageXY?.value}]`,
        role: data?.role?.value,
        date: `${year}-${month}-${day}`,
        template: data?.template?.value,
        exchangeCode: data?.exchangeCode?.value,
        bco: data?.bco?.value,
        bcm: data?.bcm?.value,
        symbol: data?.symbol?.value,
        exchangeList: data?.fields,
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
      const response: AxiosResponse<any> = await client.get(GET_ALL_PERSONS_BY_SUPER_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },

  updateMaster: async (MasterData: any): Promise<any> => {
    console.log({ MasterData });
    const date = new Date(MasterData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_SUPER_MASTER}/${MasterData._id}`,
        {
          ...MasterData,
          leverageXY: `[${MasterData?.leverageXY.value}]`,
          role: MasterData?.role?.value,
          date: `${year}-${month}-${day}`,
          template: MasterData?.template?.value,
          exchangeCode: MasterData?.exchangeCode?.value,
          bco: MasterData?.bco?.value,
          bcm: MasterData?.bcm?.value,
          symbol: MasterData?.symbol?.value,
          exchangeList: MasterData?.fields,
        }
      );
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

    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_USER_BY_SUPER_MASTER}/${UserData._id}`,
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
          exchangeList: UserData.fields,
        }
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteMaster: async (id: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(
        `${DELETE_MASTER_BY_SUPER_MASTER}${id}`
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteUser: async (id: String): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(
        `${DELETE_USER_BY_SUPER_MASTER}${id}`
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getBrokerageList: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_BROKERAGE_LIST_FOR_SUPER_MASTER);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getSymbolListSuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_SYMBOL_SUPER_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getImportMonthOrderListBySuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        IMPORT_MONTH_ORDER_LIST_FOR_SUPER_MASTER
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  updateImportMonthOrder: async (symbolIds: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.put(
        `${IMPORT_MONTH_ORDER_FOR_SUPER_MASTER}`,
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
  getupdatedImportMonthListBySuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(UPDATED_SELECTED_LIST_FOR_SUPER_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  addSelectedImportMonth: async (symbolIds: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(
        `${SET_IMPORT_MONTH_LIST_FOR_SUPER_MASTER}`,
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
  getassignedExchangeListBySuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        GET_ASSIGNED_EXCHANGE_LIST_FOR_SUPER_MASTER
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default superMasterService;
