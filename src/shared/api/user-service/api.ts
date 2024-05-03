import type { AxiosError, AxiosResponse } from "axios"

import { axiosInstance } from "shared/api/axios"
import msGraphInstance from "shared/lib/msal/instance"

const axios = axiosInstance

export const getUserPhoto = async (): Promise<Blob> =>
  new Promise<Blob>((resolve, reject) => {
    msGraphInstance.graphClient
      .api("/me/photo/$value")
      .get()
      .then((response: Blob) => resolve(response))
      .catch((error) => reject(error))
  })

export const getUserPhotoById = async (id: string): Promise<Blob> =>
  new Promise<Blob>((resolve, reject) => {
    msGraphInstance.graphClient
      .api(`/users/${id}/photo/$value`)
      .get()
      .then((response: Blob) => resolve(response))
      .catch((error) => reject(error))
  })

export const deleteDbUser = async (emails: string[]): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    axios
      .delete("employee", { data: emails })
      .then((response: AxiosResponse<void>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error))
  })
