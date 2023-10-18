import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import { CREATE_ADMIN } from '../utils/urls';

export interface adminType {
  name: string;
  symbols: string[];
}


const adminService = {
  createAdmin: async (adminData: adminType): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(CREATE_ADMIN, { adminData });
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in adminService.createAdmin:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default adminService;
