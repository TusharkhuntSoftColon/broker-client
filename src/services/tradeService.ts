import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import { BUY_TRADE } from '../utils/urls';

export interface LoginTypes {
  id: string;
  password: string;
}

const tradeService = {
  buyShare: async (data: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(BUY_TRADE, {
        data,
      });
      return response.data;
    } catch (error) {
      console.error('Error in Buy Trade:', error);
      throw error;
    }
  },
};

export default tradeService;
