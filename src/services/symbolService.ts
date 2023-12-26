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

      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  getSymbol_by_Id: async (id: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(`${GET_SYMBOL_LIST}?id=${id}`);

      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.getSymbolList:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  addSymbol: async (symbolData: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(ADD_SYMBOL, {
        ...symbolData,
        stAndTp: Boolean(symbolData.stAndTp),
        currency: symbolData?.currency.value,
      });

      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.addSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  deleteSymbol: async (id: deleteSymbol): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.delete(`${DELETE_SYMBOL}${id}`);
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.deleteSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
  updateSymbol: async (symbolData: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.put(`${UPDATE_SYMBOL}${symbolData._id}`, {
        ...symbolData.data,
        stAndTp: symbolData.data?.stAndTp.value,
        currency: symbolData?.data?.currency.value,
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in symbolService.updateSymbol:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default symbolService;
