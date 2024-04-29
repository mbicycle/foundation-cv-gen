import type { AxiosError, AxiosResponse } from "axios"
import type { DbUser } from "entities/user/model"
import type { CreateUserModel } from "fields/personal-information/lib/types"
import { axiosInstance } from "shared/api/axios"

const axios = axiosInstance

export const getDbUser = async (email: string): Promise<DbUser> =>
  new Promise<DbUser>((resolve, reject) => {
    axios
      .get<DbUser>(`employee/${email}`)
      .then((response: AxiosResponse<DbUser>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error))
  })

export const createDbUser = async (user: CreateUserModel): Promise<CreateUserModel> =>
  new Promise<CreateUserModel>((resolve, reject) => {
    axios
      .post<DbUser>("employee", user)
      .then((response: AxiosResponse<CreateUserModel>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error))
  })
