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
  allowedExchange: any;
  deleteBet: any;
  editBet: any;
  insertCustomBet: any;
  name: string;
  exchangeGroup: any;
  exchangeList: any;
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
        leverageXY: `[${adminData?.leverage.value}]`,
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
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER_BY_ADMIN, {
        ID: data?.ID,
        name: data?.name,
        password: data?.password,
        role: data?.role?.value,
        exchangeGroup: data?.exchangeGroup?.map((option: any) => option.value),
        allowedExchange: data?.allowedExchange?.map((option: any) => option.value),
        leverageX: data?.leverageX,
        leverageY: data?.leverageY,
        limitOfAddUser: data?.limitOfAddUser,
        insertCustomBet: Boolean(data?.insertCustomBet),
        editBet: Boolean(data?.editBet),
        deleteBet: Boolean(data?.deleteBet),
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },

  createUser: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_ADMIN, {
        ID: data?.ID,
        name: data?.name,
        password: data?.password,
        role: data?.role?.value,
        exchangeGroup: data?.exchangeGroup?.map((option: any) => option.value),
        allowedExchange: data?.allowedExchange?.map((option: any) => option.value),
        leverageX: data?.leverageX,
        leverageY: data?.leverageY,
        brokerage: data?.brokerage,
        investorPassword: data?.investorPassword,
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
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_SUPER_MASTER_BY_ADMIN}/${SuperMasterData._id}`,
        {
          ...SuperMasterData.data,
          insertCustomBet: Boolean(SuperMasterData.data?.insertCustomBet),
          editBet: Boolean(SuperMasterData.data?.editBet),
          deleteBet: Boolean(SuperMasterData.data?.deleteBet),
          exchangeGroup: SuperMasterData.data?.exchangeGroup?.map((option: any) => option.value),
          allowedExchange: SuperMasterData.data?.allowedExchange?.map(
            (option: any) => option.value
          ),
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
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_ADMIN}/${MasterData._id}`,
        {
          ID: MasterData.data?.ID,
          name: MasterData.data?.name,
          password: MasterData.data?.password,
          role: MasterData.data?.role?.value,
          exchangeGroup: MasterData.data?.exchangeGroup?.map((option: any) => option.value),
          allowedExchange: MasterData.data?.allowedExchange?.map((option: any) => option.value),
          leverageX: MasterData.data?.leverageX,
          leverageY: MasterData.data?.leverageY,
          limitOfAddUser: MasterData.data?.limitOfAddUser,
          insertCustomBet: Boolean(MasterData.data?.insertCustomBet),
          editBet: Boolean(MasterData.data?.editBet),
          deleteBet: Boolean(MasterData.data?.deleteBet),
          isActive: MasterData?.data?.isActive,
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
