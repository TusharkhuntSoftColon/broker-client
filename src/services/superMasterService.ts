import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  CREATE_MASTER_BY_SUPER_MASTER,
  CREATE_USER_BY_SUPER_MASTER,
  DELETE_MASTER_BY_SUPER_MASTER,
  DELETE_USER_BY_SUPER_MASTER,
  GET_ALL_PERSONS_BY_SUPER_MASTER,
  UPDATE_MASTER_BY_SUPER_MASTER,
  UPDATE_USER_BY_SUPER_MASTER,
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
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER_BY_SUPER_MASTER, {
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
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  createUser: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_SUPER_MASTER, {
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
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_SUPER_MASTER}/${MasterData._id}`,
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
        `${UPDATE_USER_BY_SUPER_MASTER}/${UserData._id}`,
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
};

export default superMasterService;
