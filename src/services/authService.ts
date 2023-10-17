import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

import { ADMIN_AUTH } from '../utils/urls';

export interface LoginTypes {
  id: string;
  password: string;
}

const authService = {
  login: async (LoginData: LoginTypes): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await client.post(ADMIN_AUTH, {
        ID: LoginData?.id,
        password: LoginData?.password,
      });

      console.log({response});
      
      return response.data;
    } catch (error) {
      // You can log the error here for debugging purposes
      console.error('Error in authService.login:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  },
};

export default authService;
