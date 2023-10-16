import { AxiosResponse } from 'axios';
import client from 'src/lib/client';

import { ADMIN_AUTH } from '../utils/urls';

export interface LoginTypes {
  id: string;
  password: string;
}

const authService = {
  login: async (LoginData: LoginTypes): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(ADMIN_AUTH, {
      ID: LoginData?.id,
      password: LoginData?.password,
    });
    return response.data;
  },
};

export default authService;
