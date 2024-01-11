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
    console.log('data', data);
    const date = new Date(data?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const newExchangeList = [
      ...data?.exchangeList,
      {
        allowedExchange: data?.allowedExchange.value,
        exchangeGroup: data?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      data?.allowedExchange.value && data?.exchangeGroup.value
        ? newExchangeList
        : data?.exchangeList;

    try {
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_MASTER, {
        ...data,
        leverageXY: `[${data?.leverageXY?.value}]`,
        date: `${year}-${month}-${day}`,
        template: data?.template?.value,
        role: data?.role?.value,
        exchangeCode: data?.exchangeCode?.value,
        bco: data?.bco?.value,
        bcm: data?.bcm?.value,
        symbol: data?.symbol?.value,
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
      const response: AxiosResponse<any> = await client.get(GET_ALL_PERSONS_BY_MASTER);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  updateUser: async (UserData: any): Promise<any> => {
    console.log(UserData);
    const date = new Date(UserData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
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
          ...UserData,
          leverageXY: `[${UserData?.leverageXY.value}]`,
          role: UserData?.role?.value,
          date: `${year}-${month}-${day}`,
          template: UserData?.template?.value,
          exchangeCode: UserData?.exchangeCode?.value,
          bco: UserData?.bco?.value,
          bcm: UserData?.bcm?.value,
          symbol: UserData?.symbol?.value,
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
