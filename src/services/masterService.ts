import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  CREATE_USER_BY_MASTER,
  DELETE_USER_BY_MASTER,
  UPDATE_USER_BY_MASTER,
  GET_ALL_PERSONS_BY_MASTER,
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
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_MASTER, {
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
        `${UPDATE_USER_BY_MASTER}/${UserData._id}`,
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
};

export default masterService;
