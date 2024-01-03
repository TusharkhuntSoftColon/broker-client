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
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER_BY_SUPER_MASTER, {
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
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_SUPER_MASTER, {
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
    const newExchangeList = [
      ...MasterData?.data?.exchangeList,
      {
        allowedExchange: MasterData?.data?.allowedExchange.value,
        exchangeGroup: MasterData?.data?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      MasterData?.data?.allowedExchange.value && MasterData?.data?.exchangeGroup.value
        ? newExchangeList
        : MasterData?.data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_SUPER_MASTER}/${MasterData._id}`,
        {
          ID: MasterData?.data?.ID,
          name: MasterData?.data?.name,
          limitOfAddUser: MasterData?.data?.limitOfAddUser,
          insertCustomBet: MasterData?.data?.insertCustomBet,
          editBet: MasterData?.data?.editBet,
          deleteBet: MasterData?.data?.deleteBet,
          leverageXY: `[${MasterData?.data?.leverageXY.value}]`,
          role: MasterData?.data?.role?.value,
          isActive: MasterData?.data?.isActive,
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
        `${UPDATE_USER_BY_SUPER_MASTER}/${UserData._id}`,
        {
          ID: UserData?.data?.ID,
          name: UserData?.data?.name,
          role: UserData?.data?.role?.value,
          leverageXY: `[${UserData?.data?.leverageXY.value}]`,
          brokerage: UserData?.data?.brokerage,
          exchangeList,
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
