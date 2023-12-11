import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import { CREATE_SUPER_MASTER } from '../utils/urls';

export interface adminType {
  allowedExchange: any;
  deleteBet: any;
  editBet: any;
  insertCustomBet: any;
  name: string;
}

const superMasterService = {
  createSuperMaster: async (adminData: adminType): Promise<any> => {
    console.log({ adminData });
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_SUPER_MASTER, {
        ...adminData,
        insertCustomBet: Boolean(adminData?.insertCustomBet),
        editBet: Boolean(adminData?.editBet),
        deleteBet: Boolean(adminData?.deleteBet),
      });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default superMasterService;
