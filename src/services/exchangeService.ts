import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import { ADD_EXCHANGE, DELETE_EXCHANGE, UPDATE_EXCHANGE, GET_EXCHANGE_LIST } from '../utils/urls';

export interface exchangeType {
  name: string;
  symbols: string[];
}

export interface updateExchange {
    id: string,
    data: exchangeType[]
}

interface deleteExchange {
  id: string;
}

const exchangeService = {
  getExchangeList: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_EXCHANGE_LIST);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.getExchangeList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  addExchange: async (exchangeData: exchangeType): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(ADD_EXCHANGE, { exchangeData });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.addExchange:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteExchange: async (id: deleteExchange): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(`${DELETE_EXCHANGE}/${id}`);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
    },
   updateSymbol: async (exchangeData: updateExchange): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(`${UPDATE_EXCHANGE}/${exchangeData.id}`, { exchangeData });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in exchangeService.updateSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default exchangeService;
