import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  GET_ALL_USER_BYID,
  GET_BROKERAGE_LIST,
  DELETE_USER_BY_ADMIN,
  UPDATE_USER_BY_ADMIN,
  CREATE_USER_BY_ADMIN,
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
  date: any;
  template: any;
  exchangeCode: any;
  bco: any;
  bcm: any;
  symbol: any;
}

const adminService = {
  createSuperMaster: async (adminData: adminType): Promise<any> => {
    console.log('adminData', adminData);
    const date = new Date(adminData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
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
        ...adminData,
        leverageXY: `[${adminData?.leverageXY.value}]`,
        role: adminData?.role?.value,
        date: `${year}-${month}-${day}`,
        template: adminData?.template?.value,
        exchangeCode: adminData?.exchangeCode?.value,
        bco: adminData?.bco?.value,
        bcm: adminData?.bcm?.value,
        symbol: adminData?.symbol?.value,
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
    console.log(data);
    const date = new Date(data?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
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
        ...data,
        leverageXY: `[${data?.leverageXY.value}]`,
        role: data?.role?.value,
        date: `${year}-${month}-${day}`,
        template: data?.template?.value,
        exchangeCode: data?.exchangeCode?.value,
        bco: data?.bco?.value,
        bcm: data?.bcm?.value,
        symbol: data?.symbol?.value,
        exchangeList,
      });
      return response.data;
    } catch (error) {
      console.error('Error in adminService.createMaster:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
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
      const response: AxiosResponse<any> = await client.post(CREATE_USER_BY_ADMIN, {
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
    console.log('SuperMasterData', SuperMasterData);
    const date = new Date(SuperMasterData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const newExchangeList = [
      ...SuperMasterData?.exchangeList,
      {
        allowedExchange: SuperMasterData?.allowedExchange.value,
        exchangeGroup: SuperMasterData?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      SuperMasterData?.allowedExchange.value && SuperMasterData?.exchangeGroup.value
        ? newExchangeList
        : SuperMasterData?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_SUPER_MASTER_BY_ADMIN}/${SuperMasterData._id}`,
        {
          ...SuperMasterData,
          leverageXY: `[${SuperMasterData?.leverageXY.value}]`,
          role: SuperMasterData?.role?.value,
          date: `${year}-${month}-${day}`,
          template: SuperMasterData?.template?.value,
          exchangeCode: SuperMasterData?.exchangeCode?.value,
          bco: SuperMasterData?.bco?.value,
          bcm: SuperMasterData?.bcm?.value,
          symbol: SuperMasterData?.symbol?.value,
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
    console.log('MasterData', MasterData);

    const date = new Date(MasterData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const newExchangeList = [
      ...MasterData?.exchangeList,
      {
        allowedExchange: MasterData?.allowedExchange.value,
        exchangeGroup: MasterData?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      MasterData?.allowedExchange.value && MasterData?.exchangeGroup.value
        ? newExchangeList
        : MasterData?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_MASTER_BY_ADMIN}/${MasterData?._id}`,
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
    console.log(UserData);
    const date = new Date(UserData?.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const newExchangeList = [
      ...UserData?.exchangeList,
      {
        allowedExchange: UserData?.allowedExchange.value,
        exchangeGroup: UserData?.exchangeGroup?.value,
      },
    ];
    const exchangeList =
      UserData?.allowedExchange.value && UserData?.exchangeGroup.value
        ? newExchangeList
        : UserData?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.put(
        `${UPDATE_USER_BY_ADMIN}/${UserData._id}`,
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
