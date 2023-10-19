import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import { CREATE_ADMIN } from '../utils/urls';

export interface adminType {
  allowedExchange: any;
  deleteBet: any;
  editBet: any;
  insertCustomBet: any;
  name: string;
}

const adminService = {
  createAdmin: async (adminData: adminType): Promise<any> => {
    console.log({ adminData });
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_ADMIN, {
        ...adminData,
        insertCustomBet: Boolean(adminData?.insertCustomBet),
        editBet: Boolean(adminData?.editBet),
        deleteBet: Boolean(adminData?.deleteBet),
        allowedExchange: Array(adminData?.allowedExchange),
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default adminService;
