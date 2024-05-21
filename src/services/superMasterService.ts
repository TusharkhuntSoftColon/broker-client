/* eslint-disable no-nested-ternary */
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
  GET_USER_BALANCE_BY_SUPER_MASTER,
  GET_NEW_PERSON_ID_BY_SUPER_MASTER,
  CLOSE_OPEN_POSTION_BY_SUPER_MASTER,
  GET_BROKERAGE_LIST_FOR_SUPER_MASTER,
  IMPORT_MONTH_ORDER_FOR_SUPER_MASTER,
  CHANGE_USER_PASSWORD_BY_SUPER_MASTER,
  SET_IMPORT_MONTH_LIST_FOR_SUPER_MASTER,
  GET_USERS_BET_POSITIONS_BY_SUPER_MASTER,
  IMPORT_MONTH_ORDER_LIST_FOR_SUPER_MASTER,
  CHANGE_INVESTOR_PASSWORD_BY_SUPER_MASTER,
  GET_USER_PENDING_POSTION_BY_SUPER_MASTER,
  GET_LOGGED_PERSON_DETAILS_BY_SUPER_MASTER,
  GET_ASSIGNED_EXCHANGE_LIST_FOR_SUPER_MASTER,
  GET_BROKERAGE_LIST_FOR_USER_UPDATE_BY_SUPERMASTER,
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
        leverageXY: data?.leverageXY.value,
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
    const withoutBrokerageData = {
      ID: data?.ID,
      name: data?.name,
      password: data?.password,
      exchangeList: data?.fields,
      role: data?.role?.value,
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
      const response: AxiosResponse<any> = await client.post(
        CREATE_USER_BY_SUPER_MASTER,
        usersData
      );
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
    const date = new Date(MasterData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_SUPER_MASTER}/${MasterData._id}`,
        {
          ...MasterData,
          leverageXY: MasterData?.leverageXY.value,
          role: MasterData?.role?.value,
          date: `${year}-${month}-${day}`,
          template: MasterData?.template?.value,
          exchangeCode: MasterData?.exchangeCode?.value,
          bco: MasterData?.bco?.value,
          bcm: MasterData?.bcm?.value,
          symbol: MasterData?.symbol?.value,
          status: MasterData?.status?.value,
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
  updateUser: async (data: any): Promise<any> => {
    const withoutBrokerageData = {
      ID: data?.ID,
      name: data?.name,
      password: data?.password,
      exchangeList: data?.fields,
      role: data?.role?.value,
      // creditLimit: data?.creditLimit,
      positionMinTime: data?.positionMinTime,
      leverageXY: data?.leverageXY?.value,
      isBrokerageAllowed: data?.isBrokerageAllowed,
      isActive: data?.isActive,
      status: data?.status?.value,
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
        `${UPDATE_USER_BY_SUPER_MASTER}/${data._id}`,
        usersData
      );
      return response.data;
    } catch (error) {
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
  getBrokerageListForUserUpdate: async (id?: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_BROKERAGE_LIST_FOR_USER_UPDATE_BY_SUPERMASTER}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  getUserBetPositions: async (id?: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_USERS_BET_POSITIONS_BY_SUPER_MASTER}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },

  getUserPendingPostionBySuperMaster: async (id?: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_USER_PENDING_POSTION_BY_SUPER_MASTER}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in superMasterService.getUserPendingPostion:', error);
      throw error;
    }
  },

  getUserBalance: async (id?: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_USER_BALANCE_BY_SUPER_MASTER}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  changeUserPassword: async (userPassword: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(
        `${CHANGE_USER_PASSWORD_BY_SUPER_MASTER}/${userPassword?.id}`,
        {
          password: userPassword?.password,
        }
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  changeInvestorPassword: async (investorPassword: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(
        `${CHANGE_INVESTOR_PASSWORD_BY_SUPER_MASTER}/${investorPassword?.id}`,
        {
          investorPassword: investorPassword?.password,
        }
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  changeMasterPassword: async (masterPassword: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(
        `${CHANGE_USER_PASSWORD_BY_SUPER_MASTER}/${masterPassword?.id}`,
        {
          password: masterPassword?.password,
        }
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getNewPersonId: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_NEW_PERSON_ID_BY_SUPER_MASTER);
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  loggedPersonDetail: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        GET_LOGGED_PERSON_DETAILS_BY_SUPER_MASTER
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  closeOpenPostionBySuperMaster: async (data?: any): Promise<any> => {
    const positionData = {
      scriptId: data?.scriptId,
      exchange: data?.exchange,
      symbolId: data?.symbolId,
      scriptName: data?.scriptName,
      importMonthName: data?.importMonthName,
      quantity: data?.quantity,
      orderType: 'MARKET', // fix
      userId: data?.userId?._id,
    };

    const updatedPosition =
      data?.positionType === 'BUY'
        ? { ...positionData, sellPrice: data?.livePrice, positionType: 'SELL' }
        : data?.positionType === 'SELL'
          ? { ...positionData, buyPrice: data?.livePrice, positionType: 'BUY' }
          : {};

    try {
      const response: AxiosResponse<any> = await client.post(
        CLOSE_OPEN_POSTION_BY_SUPER_MASTER,
        updatedPosition
      );
      return response.data;
    } catch (error) {
      console.error('Error in superMasterService.getUserPendingPostion:', error);
      throw error;
    }
  },
};

export default superMasterService;
