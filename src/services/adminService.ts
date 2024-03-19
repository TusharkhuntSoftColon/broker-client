import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  GET_SYMBOL_ADMIN,
  GET_ALL_USER_BYID,
  GET_BROKERAGE_LIST,
  DELETE_USER_BY_ADMIN,
  CREATE_USER_BY_ADMIN,
  UPDATE_USER_BY_ADMIN,
  GET_EXCHANGE_FOR_USER,
  GET_USER_IMPORT_MONTH,
  CREATE_MASTER_BY_ADMIN,
  DELETE_MASTER_BY_ADMIN,
  UPDATE_MASTER_BY_ADMIN,
  GET_EXCHANGE_FOR_MASTER,
  GET_ALL_PERSONS_BY_ADMIN,
  DELETE_SUPER_MASTER_BY_ADMIN,
  GET_EXCHANGE_FOR_SUPERMASTER,
  IMPORT_MONTH_ORDER_FOR_ADMIN,
  CREATE_SUPER_MASTER_BY_ADMIN,
  UPDATE_SUPER_MASTER_BY_ADMIN,
  UPDATED_SELECTED_LIST_FOR_ADMIN,
  SET_IMPORT_MONTH_LIST_FOR_ADMIN,
  IMPORT_MONTH_ORDER_LIST_FOR_ADMIN,
  GET_ASSIGNED_EXCHANGE_LIST_FOR_ADMIN,
  GET_BROKERAGE_LIST_FOR_USER_UPDATE_BY_ADMIN,
} from '../utils/urls';

export interface adminType {
  role: any;
  ID: string;
  password: string;
  limitOfAddMaster: number;
  limitOfAddUser: number;
  leverageXY: any;
  allowedExchange: any;
  deleteBet: any;
  fields: any;
  editBet: any;
  insertCustomBet: any;
  name: string;
  exchangeGroup: any;
  exchangeList: any;
  brokerage: number;
  investorPassword: string;
  date: any;
  template: any;
  exchangeCode: any;
  bco: any;
  bcm: any;
  symbol: any;
}

const adminService = {
  createSuperMaster: async (adminData: adminType): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_SUPER_MASTER_BY_ADMIN, {
        ...adminData,
        leverageXY: adminData?.leverageXY.value,
        role: adminData?.role?.value,
        exchangeList: adminData.fields,
      });
      return response.data;
    } catch (error) {
      console.error('Error in adminService.createAdmin:', error);
      throw error;
    }
  },
  createMaster: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER_BY_ADMIN, {
        ...data,
        leverageXY: data?.leverageXY.value,
        role: data?.role?.value,
        exchangeList: data?.fields,
      });
      return response.data;
    } catch (error) {
      console.error('Error in adminService.createMaster:', error);
      throw error;
    }
  },
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
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_ADMIN, usersData);
      return response.data;
    } catch (error) {
      console.error('Error in adminService.createMaster:', error);
      throw error;
    }
  },
  getExchangeListForSuperMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_EXCHANGE_FOR_SUPERMASTER);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getExchangeListForMaster: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_EXCHANGE_FOR_MASTER);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getExchangeListForUser: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_EXCHANGE_FOR_USER);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getAllPersons: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_ALL_PERSONS_BY_ADMIN);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  updateSuperMaster: async (SuperMasterData: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_SUPER_MASTER_BY_ADMIN}/${SuperMasterData._id}`,
        {
          ...SuperMasterData,
          leverageXY: SuperMasterData?.leverageXY.value,
          role: SuperMasterData?.role?.value,
          exchangeList: SuperMasterData?.fields,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  updateMaster: async (MasterData: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_ADMIN}/${MasterData?._id}`,
        {
          ...MasterData,
          leverageXY: MasterData?.leverageXY.value,
          role: MasterData?.role?.value,
          exchangeList: MasterData?.fields,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  updateUser: async (data: any): Promise<any> => {
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
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_USER_BY_ADMIN}/${data._id}`,
        usersData
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  deleteSuperMaster: async (id: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(
        `${DELETE_SUPER_MASTER_BY_ADMIN}${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error;
    }
  },
  deleteMaster: async (id: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(`${DELETE_MASTER_BY_ADMIN}${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error;
    }
  },
  deleteUser: async (id: String): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(`${DELETE_USER_BY_ADMIN}${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error;
    }
  },
  getAllPersonById: async (userId: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(`${GET_ALL_USER_BYID}/${userId}`);
      return response?.data;
    } catch (error) {
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error;
    }
  },
  getBrokerageList: async (id: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_BROKERAGE_LIST);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getImportMonthByUser: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_USER_IMPORT_MONTH);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getSymbolListAdmin: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_SYMBOL_ADMIN);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getImportMonthOrderListByAdmin: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(IMPORT_MONTH_ORDER_LIST_FOR_ADMIN);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getupdatedImportMonthListByAdmin: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(UPDATED_SELECTED_LIST_FOR_ADMIN);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  updateImportMonthOrder: async (symbolIds: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.put(`${IMPORT_MONTH_ORDER_FOR_ADMIN}`, {
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
      const response: AxiosResponse<any> = await client.post(`${SET_IMPORT_MONTH_LIST_FOR_ADMIN}`, {
        selectedImportMonth: symbolIds,
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },

  getassignedExchangeListByAdmin: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_ASSIGNED_EXCHANGE_LIST_FOR_ADMIN);
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
        `${GET_BROKERAGE_LIST_FOR_USER_UPDATE_BY_ADMIN}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
};

export default adminService;
