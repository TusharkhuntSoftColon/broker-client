import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
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
    console.log({ adminData });
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

    console.log({ exchangeList });

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
    console.log({ data });
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
      ...data.exchangeList,
      {
        allowedExchange: data.allowedExchange.value,
        exchangeGroup: data.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      data.allowedExchange.value && data.exchangeGroup.value ? newExchangeList : data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_ADMIN, {
        ID: data?.ID,
        name: data?.name,
        password: data?.password,
        role: data?.role?.value,
        leverageXY: `[${data?.leverageXY.value}]`,
        brokerage: data?.brokerage,
        investorPassword: data?.investorPassword,
        exchangeList,
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
    console.log({ SuperMasterData });
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
    console.log({ UserData });
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_USER_BY_ADMIN}/${UserData._id}`,
        {
          ID: UserData?.data?.ID,
          name: UserData?.data?.name,
          password: UserData?.data?.password,
          role: UserData?.data?.role?.value,
          exchangeGroup: UserData?.data?.exchangeGroup?.map((option: any) => option.value),
          allowedExchange: UserData?.data?.allowedExchange?.map((option: any) => option.value),
          leverageX: UserData?.data?.leverageX,
          leverageY: UserData?.data?.leverageY,
          brokerage: UserData?.data?.brokerage,
          investorPassword: UserData?.data?.investorPassword,
          isActive: UserData?.data?.isActive,
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
};

export default adminService;
