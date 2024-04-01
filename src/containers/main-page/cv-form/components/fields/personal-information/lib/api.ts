import type { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance, graph } from 'shared/utils/interceptors';

import type { DbUser } from 'common/models/User';

const axios = axiosInstance;

export const updateDbUser = async (
  user: DbUser,
): Promise<DbUser> => new Promise<DbUser>((resolve, reject) => {
  axios.put<DbUser>(`employee/${user.email}`, { ...user })
    .then((response: AxiosResponse<DbUser>) => resolve(response.data))
    .catch((error: AxiosError<string>) => reject(error));
});

export const updateMsUserAvatar = async (file: File): Promise<ReadableStream> => new Promise<ReadableStream>(
  (resolve, reject) => {
    graph.graphClient.api('/me/photo/$value').put(file)
      .then((response: ReadableStream) => resolve(response))
      .catch((error) => reject(error));
  },
);