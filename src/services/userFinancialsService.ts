import { AxiosResponse } from 'axios';

import {
  ADD_DEPOSIT_BY_ADMIN,
  ADD_DEPOSIT_BY_MASTER,
  ADD_WITHDROW_BY_ADMIN,
  ADD_WITHDROW_BY_MASTER,
  ADD_DEPOSIT_BY_SUPER_MASTER,
  ADD_WITHDROW_BY_SUPER_MASTER,
  GET_BALANCE_HISTORY_BY_ADMIN,
  GET_BALANCE_HISTORY_BY_MASTER,
  GET_BALANCE_HISTORY_BY_SUPER_MASTER,
} from 'src/utils/urls';

import client from 'src/lib/client';

const userFinancialsService = {
  addDepositeByAdmin: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount:
        userFinancialData?.operation?.value === 'BALANCE'
          ? userFinancialData?.Balance
          : userFinancialData?.Credit,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(`${ADD_DEPOSIT_BY_ADMIN}/${id}`, data);
      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addDeposite');
      throw error;
    }
  },
  addDepositeBySuperMaster: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount:
        userFinancialData?.operation?.value === 'BALANCE'
          ? userFinancialData?.Balance
          : userFinancialData?.Credit,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(
        `${ADD_DEPOSIT_BY_SUPER_MASTER}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addDeposite');
      throw error;
    }
  },
  addDepositeByMaster: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount:
        userFinancialData?.operation?.value === 'BALANCE'
          ? userFinancialData?.Balance
          : userFinancialData?.Credit,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(
        `${ADD_DEPOSIT_BY_MASTER}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addDeposite');
      throw error;
    }
  },

  addWithdrawByAdmin: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount: userFinancialData?.Balance,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(
        `${ADD_WITHDROW_BY_ADMIN}/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addWithDrow');
      throw error;
    }
  },
  addWithdrawBySuperMaster: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount: userFinancialData?.Balance,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(
        `${ADD_WITHDROW_BY_SUPER_MASTER}/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addWithDrow');
      throw error;
    }
  },
  addWithdrawByMaster: async (userFinancialData: any, id: any): Promise<any> => {
    const data = {
      operation: userFinancialData?.operation?.value,
      amount: userFinancialData?.Balance,
      comment: userFinancialData?.comment,
    };
    try {
      const response: AxiosResponse<any> = await client.post(
        `${ADD_WITHDROW_BY_MASTER}/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.log('Error in user financialservice.addWithDrow');
      throw error;
    }
  },

  getBalanceHistoryByAdmin: async (id: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_BALANCE_HISTORY_BY_ADMIN}/${id}`
      );
      return response;
    } catch (error) {
      console.log('Error in user financialservice.getBalanceHistory');
      throw error;
    }
  },
  getBalanceHistoryBySuperMaster: async (id: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_BALANCE_HISTORY_BY_SUPER_MASTER}/${id}`
      );
      return response;
    } catch (error) {
      console.log('Error in user financialservice.getBalanceHistory');
      throw error;
    }
  },
  getBalanceHistoryByMaster: async (id: any): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.get(
        `${GET_BALANCE_HISTORY_BY_MASTER}/${id}`
      );
      return response;
    } catch (error) {
      console.log('Error in user financialservice.getBalanceHistory');
      throw error;
    }
  },
};

export default userFinancialsService;
