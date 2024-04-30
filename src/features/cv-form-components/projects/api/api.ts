import type { AxiosError, AxiosResponse } from "axios"

import type { DbUser, Project } from "entities/user/model"

import { axiosInstance } from "shared/api/axios"

const axios = axiosInstance

export const updateUserProjects = async (projects: Project[], user: DbUser): Promise<DbUser> =>
  new Promise<DbUser>((resolve, reject) => {
    axios
      .put<DbUser>(`employee/${user.email}`, { ...user, projects })
      .then((response: AxiosResponse<DbUser>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error))
  })
