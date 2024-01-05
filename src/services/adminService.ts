import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  GET_ALL_USER_BYID,
  GET_BROKERAGE_LIST,
  CREATE_USER_BY_ADMIN,
  DELETE_USER_BY_ADMIN,
  UPDATE_USER_BY_ADMIN,
  GET_EXCHANGE_FOR_USER,
  CREATE_MASTER_BY_ADMIN,
  DELETE_MASTER_BY_ADMIN,
  UPDATE_MASTER_BY_ADMIN,
  GET_EXCHANGE_FOR_MASTER,
  GET_ALL_PERSONS_BY_ADMIN,
  DELETE_SUPER_MASTER_BY_ADMIN,
  GET_EXCHANGE_FOR_SUPERMASTER,
  UPDATE_SUPER_MASTER_BY_ADMIN,
  CREATE_SUPER_MASTER_BY_ADMIN,
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
  editBet: any;
  insertCustomBet: any;
  name: string;
  exchangeGroup: any;
  exchangeList: any;
  brokerage: number;
  investorPassword: string;
}

const adminService = {
  createSuperMaster: async (adminData: adminType): Promise<any> => {
    const newExchangeList = [
      ...adminData.exchangeList,
      {
        allowedExchange: adminData.allowedExchange.value,
        exchangeGroup: adminData.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      adminData.allowedExchange.value && adminData.exchangeGroup.value
        ? newExchangeList
        : adminData?.exchangeList;

    try {
      const response: AxiosResponse<any> = await client.post(CREATE_SUPER_MASTER_BY_ADMIN, {
        ID: adminData?.ID,
        name: adminData?.name,
        password: adminData?.password,
        limitOfAddMaster: adminData?.limitOfAddMaster,
        limitOfAddUser: adminData?.limitOfAddUser,
        insertCustomBet: adminData?.insertCustomBet,
        editBet: adminData?.editBet,
        deleteBet: adminData?.deleteBet,
        leverageXY: `[${adminData?.leverageXY.value}]`,
        role: adminData?.role?.value,
        exchangeList,
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  createMaster: async (data: any): Promise<any> => {
    const newExchangeList = [
      ...data.exchangeList,
      {
        allowedExchange: data.allowedExchange.value,
        exchangeGroup: data.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      data.allowedExchange.value && data.exchangeGroup.value ? newExchangeList : data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER_BY_ADMIN, {
        ID: data?.ID,
        name: data?.name,
        password: data?.password,
        limitOfAddUser: data?.limitOfAddUser,
        insertCustomBet: data?.insertCustomBet,
        editBet: data?.editBet,
        deleteBet: data?.deleteBet,
        leverageXY: `[${data?.leverageXY.value}]`,
        role: data?.role?.value,
        exchangeList,
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  createUser: async (data: any): Promise<any> => {
    const newExchangeList = [
      ...data?.data.exchangeList,
      {
        allowedExchange: data?.data.allowedExchange.value,
        exchangeGroup: data?.data.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      data?.data.allowedExchange.value && data?.data.exchangeGroup.value
        ? newExchangeList
        : data?.data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_ADMIN, {
        ID: data?.data?.ID,
        name: data?.data?.name,
        password: data?.data?.password,
        role: data?.data?.role?.value,
        leverageXY: `[${data?.data?.leverageXY.value}]`,
        brokerage: data?.data?.brokerage,
        investorPassword: data?.data?.investorPassword,
        exchangeList,
        brokerageTemplate: data?.brokerageTemplate,
      });
      return response.data;
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
  getAllPersons: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_ALL_PERSONS_BY_ADMIN);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  updateSuperMaster: async (SuperMasterData: any): Promise<any> => {
    const newExchangeList = [
      ...SuperMasterData?.data.exchangeList,
      {
        allowedExchange: SuperMasterData?.data.allowedExchange.value,
        exchangeGroup: SuperMasterData?.data.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      SuperMasterData?.data.allowedExchange.value && SuperMasterData?.data.exchangeGroup.value
        ? newExchangeList
        : SuperMasterData?.data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_SUPER_MASTER_BY_ADMIN}/${SuperMasterData._id}`,
        {
          // ...SuperMasterData.data,
          ID: SuperMasterData?.data?.ID,
          name: SuperMasterData?.data?.name,
          limitOfAddMaster: SuperMasterData?.data?.limitOfAddMaster,
          limitOfAddUser: SuperMasterData?.data?.limitOfAddUser,
          insertCustomBet: SuperMasterData?.data?.insertCustomBet,
          editBet: SuperMasterData?.data?.editBet,
          deleteBet: SuperMasterData?.data?.deleteBet,
          leverageXY: `[${SuperMasterData?.data?.leverageXY.value}]`,
          role: SuperMasterData?.data?.role?.value,
          isActive: SuperMasterData?.data?.isActive,
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
  updateMaster: async (MasterData: any): Promise<any> => {
    const newExchangeList = [
      ...MasterData?.data.exchangeList,
      {
        allowedExchange: MasterData?.data.allowedExchange.value,
        exchangeGroup: MasterData?.data.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      MasterData?.data.allowedExchange.value && MasterData?.data.exchangeGroup.value
        ? newExchangeList
        : MasterData?.data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_ADMIN}/${MasterData?._id}`,
        {
          ID: MasterData?.data?.ID,
          name: MasterData?.data?.name,
          limitOfAddUser: MasterData?.data?.limitOfAddUser,
          insertCustomBet: MasterData?.data?.insertCustomBet,
          editBet: MasterData?.data?.editBet,
          deleteBet: MasterData?.data?.deleteBet,
          leverageXY: `[${MasterData?.data?.leverageXY.value}]`,
          isActive: MasterData?.data?.isActive,
          role: MasterData?.data?.role?.value,
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
  updateUser: async (UserData: any): Promise<any> => {
    const newExchangeList = [
      ...UserData?.data?.exchangeList,
      {
        allowedExchange: UserData?.data?.allowedExchange.value,
        exchangeGroup: UserData?.data?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      UserData?.data?.allowedExchange.value && UserData?.data?.exchangeGroup.value
        ? newExchangeList
        : UserData?.data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_USER_BY_ADMIN}/${UserData._id}`,
        {
          ID: UserData?.data?.ID,
          name: UserData?.data?.name,
          role: UserData?.data?.role?.value,
          leverageXY: `[${UserData?.data?.leverageXY.value}]`,
          brokerage: UserData?.data?.brokerage,
          isActive: UserData?.data?.isActive,
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
  deleteSuperMaster: async (id: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(
        `${DELETE_SUPER_MASTER_BY_ADMIN}${id}`
      );
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteMaster: async (id: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(`${DELETE_MASTER_BY_ADMIN}${id}`);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteUser: async (id: String): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(`${DELETE_USER_BY_ADMIN}${id}`);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
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
  getBrokerageList: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_BROKERAGE_LIST);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default adminService;
