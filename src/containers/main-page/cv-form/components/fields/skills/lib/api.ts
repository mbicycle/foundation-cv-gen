import type { AxiosError, AxiosResponse } from "axios"
import type { DbUser } from "entities/user/model"
import { axiosInstance } from "shared/api/axios"

const axios = axiosInstance

export const updateDbUserCategory = async (data: DbUser): Promise<DbUser> =>
  new Promise<DbUser>((resolve, reject) => {
    axios
      .put<DbUser>(`employee/${data.email}`, data)
      .then((response: AxiosResponse<DbUser>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error))
  })
