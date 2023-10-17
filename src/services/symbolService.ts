import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import { ADD_SYMBOL, DELETE_SYMBOL, UPDATE_SYMBOL, GET_SYMBOL_LIST } from '../utils/urls';

export interface symbolType {
  id: string;
  password: string;
}

interface deleteSymbol {
  id: string;
}

const symbolService = {
  getSymbolList: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(GET_SYMBOL_LIST);

      console.log({ response });

      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  addSymbol: async (symbolData: symbolType): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(ADD_SYMBOL, { symbolData });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.addSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteSymbol: async (id: deleteSymbol): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(`${DELETE_SYMBOL}/${id}`);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
    },
   updateSymbol: async (symbolData: symbolType): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(`${UPDATE_SYMBOL}/${symbolData.id}`, { symbolData });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.updateSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default symbolService;
