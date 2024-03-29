import type { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'shared/utils/interceptors';

import type { Certificate, DbUser } from 'common/models/User';

const axios = axiosInstance;

export const modifyUserCertificates = async (
  certificates: Certificate[],
  user: DbUser,
): Promise<DbUser> => new Promise<DbUser>(
  (resolve, reject) => {
    axios.put<DbUser>(`employee/${user.email}`, { ...user, certificates })
      .then((response: AxiosResponse<DbUser>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error));
  },
);
