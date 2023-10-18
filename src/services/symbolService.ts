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
  getSymbol_by_Id: async (id: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(`${GET_SYMBOL_LIST}?id=${id}`);

      console.log({ response });

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
        name: symbolData?.name,
        contractSize: String(symbolData?.contractSize),
        tickValue: String(symbolData?.tickValue),
        currency: symbolData?.currency,
        mimVolume: Number(symbolData?.maximumVolume),
        maxVolume: Number(symbolData?.maximumVolume),
        spread: Number(symbolData?.spread),
        stopLevel: Number(symbolData?.stopsLevel),
        tickSize: Number(symbolData?.tickSize),
        inrialMargin: Number(symbolData?.inrialMargin),
        maintenanceMargin: Number(symbolData?.maintenanceMargin),
        stAndTp: true,
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
      const response: AxiosResponse<any> = await client.post(`${UPDATE_SYMBOL}/${symbolData._id}`, {
        symbolData,
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