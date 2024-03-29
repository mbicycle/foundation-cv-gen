import type { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'shared/utils/interceptors';

import type { DbUser } from 'common/models/User';

import type { CreateUserModel } from 'fields/personal-information/lib/types';

const axios = axiosInstance;

export const getDbUser = async (email: string): Promise<DbUser> => new Promise<DbUser>(
  (resolve, reject) => {
    axios.get<DbUser>(`employee/${email}`)
      .then((response: AxiosResponse<DbUser>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error));
  },
);

export const createDbUser = async (
  user: CreateUserModel,
): Promise<CreateUserModel> => new Promise<CreateUserModel>(
  (resolve, reject) => {
    axios.post<DbUser>('employee', user)
      .then((response: AxiosResponse<CreateUserModel>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error));
  },
);
