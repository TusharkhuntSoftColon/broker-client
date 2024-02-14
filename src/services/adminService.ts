import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import {
  GET_SYMBOL_ADMIN,
  GET_ALL_USER_BYID,
  GET_BROKERAGE_LIST,
  DELETE_USER_BY_ADMIN,
  UPDATE_USER_BY_ADMIN,
  CREATE_USER_BY_ADMIN,
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
  UPDATED_SELECTED_LIST_FOR_ADMIN,
  SET_IMPORT_MONTH_LIST_FOR_ADMIN,
  IMPORT_MONTH_ORDER_LIST_FOR_ADMIN,
  GET_ASSIGNED_EXCHANGE_LIST_FOR_ADMIN,
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
        leverageXY: `[${adminData?.leverageXY.value}]`,
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
    // const date = new Date(data?.date);
    // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    // const day = date.getDate().toString().padStart(2, '0');
    // const year = date.getFullYear();
    // const newExchangeList = [
    //   ...data.exchangeList,
    //   {
    //     allowedExchange: data.allowedExchange.value,
    //     exchangeGroup: data.exchangeGroup?.value,
    //   },
    // ];
    // const exchangeList =
    //   data.allowedExchange.value && data.exchangeGroup.value ? newExchangeList : data?.exchangeList;
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_MASTER_BY_ADMIN, {
        ...data,
        leverageXY: `[${data?.leverageXY.value}]`,
        role: data?.role?.value,
        // date: `${year}-${month}-${day}`,
        // template: data?.template?.value,
        // exchangeCode: data?.exchangeCode?.value,
        // bco: data?.bco?.value,
        // bcm: data?.bcm?.value,
        // symbol: data?.symbol?.value,
        exchangeList: data?.fields,
      });
      return response.data;
    } catch (error) {
      console.error('Error in adminService.createMaster:', error);
      throw error;
    }
  },
  createUser: async (data: any): Promise<any> => {
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
    // const date = new Date(SuperMasterData?.date);
    // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    // const day = date.getDate().toString().padStart(2, '0');
    // const year = date.getFullYear();

    console.log({ SuperMasterData });

    // const newExchangeList = [
    //   ...SuperMasterData?.exchangeList,
    //   {
    //     allowedExchange: SuperMasterData?.allowedExchange.value,
    //     exchangeGroup: SuperMasterData?.exchangeGroup?.value,
    //   },
    // ];
    // const exchangeList =
    //   SuperMasterData?.allowedExchange.value && SuperMasterData?.exchangeGroup.value
    //     ? newExchangeList
    //     : SuperMasterData?.exchangeList;
    try {
      // const response: AxiosResponse<any> = await client.put(
      //   `${UPDATE_SUPER_MASTER_BY_ADMIN}/${SuperMasterData._id}`,
      //   {
      //     ...SuperMasterData,
      //     leverageXY: `[${SuperMasterData?.leverageXY.value}]`,
      //     role: SuperMasterData?.role?.value,
      //     // date: `${year}-${month}-${day}`,
      //     // template: SuperMasterData?.template?.value,
      //     // exchangeCode: SuperMasterData?.exchangeCode?.value,
      //     // bco: SuperMasterData?.bco?.value,
      //     // bcm: SuperMasterData?.bcm?.value,
      //     // symbol: SuperMasterData?.symbol?.value,
      //     exchangeList,
      //   }
      // );
      // return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  updateMaster: async (MasterData: any): Promise<any> => {
    // const date = new Date(MasterData?.date);
    // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
    // const day = date.getDate().toString().padStart(2, '0');
    // const year = date.getFullYear();
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
          // date: `${year}-${month}-${day}`,
          // template: MasterData?.template?.value,
          // exchangeCode: MasterData?.exchangeCode?.value,
          // bco: MasterData?.bco?.value,
          // bcm: MasterData?.bcm?.value,
          // symbol: MasterData?.symbol?.value,
          exchangeList,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error;
    }
  },
  updateUser: async (UserData: any): Promise<any> => {
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
  getBrokerageList: async (): Promise<any> => {
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
};

export default adminService;
