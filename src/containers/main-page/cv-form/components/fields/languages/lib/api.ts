import type { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'shared/utils/interceptors';

import type { DbUser, UserLanguage } from 'common/models/User';

const axios = axiosInstance;

export const modifyUserLanguages = async (
  languages: UserLanguage[],
  user: DbUser,
): Promise<DbUser> => new Promise<DbUser>(
  (resolve, reject) => {
    axios.put<DbUser>(`employee/${user.email}`, { ...user, languages })
      .then((response: AxiosResponse<DbUser>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error));
  },
);
