import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { mockUser } from 'shared/utils/constants';
import { getGuestToken as getGuestTokenFromStorage } from 'shared/utils/getGuestToken';
import { axiosInstanceToken, graph } from 'shared/utils/interceptors';

import type { MsUser } from 'common/models/User';

export async function handleApiResponse(response: AxiosResponse): Promise<unknown> {
  if (response.status === 200) {
    return response.data;
  }

  return Promise.reject(response);
}

export const getUser = async (): Promise<MsUser> => new Promise<MsUser>(
  (resolve, reject) => {
    if (getGuestTokenFromStorage()) {
      resolve(mockUser);
    }
    graph.graphClient.api('/me')
      .select('givenName,mail,surname')
      .get()
      .then((response: MsUser) => resolve(response))
      .catch((error) => reject(error));
  },
);

export const getGuestToken = async (): Promise<string> => new Promise(
  (resolve, reject) => {
    axiosInstanceToken.get('/token', {})
      .then((response: AxiosResponse<string>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<string>) => reject(error));
  },
);

// If token valid returns status 200
// If token invalid or expired throws 401 status
export const getGuestTokenValidity = async (token: string): Promise<boolean> => new Promise<boolean>(
  (resolve) => {
    axios.post(`${import.meta.env.VITE_TOKEN_URL}/token`, {}, {
      headers: {
        'MBCL-TOKEN': token,
      },
    })
      .then((response: AxiosResponse<void>) => {
        resolve(response.status === 200);
      })
      .catch(() => resolve(false));
  },
);
