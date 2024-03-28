import { AxiosResponse } from 'axios';

import { ADD_DEPOSIT, ADD_WITHDROW, GET_BALANCE_HISTORY } from 'src/utils/urls';

import client from 'src/lib/client';

const userFinancialsService = {
  addDeposite: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount:
        userFinancialData?.operation?.value === 'BALANCE'
          ? userFinancialData?.Balance
          : userFinancialData?.Credit,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(`${ADD_DEPOSIT}/${id}`, data);
      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addDeposite');
      throw error;
    }
  },

  addWithDrow: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount: userFinancialData?.Balance,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(`${ADD_WITHDROW}/${id}`, data);

      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addWithDrow');
      throw error;
    }
  },

  getBalanceHistory: async (id: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(`${GET_BALANCE_HISTORY}/${id}`);
      return response;
    } catch (error) {
      console.log('Error in user financialservice.getBalanceHistory');
      throw error;
    }
  },
};

export default userFinancialsService;
