import type { AxiosError, AxiosResponse } from "axios"
import axios from "axios"

import type { MsUser } from "entities/user/model"

import { axiosInstanceToken } from "shared/api/axios"
import { CONFIG } from "shared/config/envConfig"
import { mockUser } from "shared/lib/constants"
import { getGuestToken as getGuestTokenFromStorage } from "shared/lib/helpers/getGuestToken"
import msGraphInstance from "shared/lib/msal/instance"

export const getUser = async (): Promise<MsUser> =>
  new Promise<MsUser>((resolve, reject) => {
    if (getGuestTokenFromStorage()) {
      resolve(mockUser)
    }
    msGraphInstance.graphClient
      .api("/me")
      .select("givenName,mail,surname")
      .get()
      .then((response: MsUser) => resolve(response))
      .catch((error) => reject(error))
  })

export const getGuestToken = async (): Promise<string> =>
  new Promise((resolve, reject) => {
    axiosInstanceToken
      .get("/token", {})
      .then((response: AxiosResponse<string>) => {
        resolve(response.data)
      })
      .catch((error: AxiosError<string>) => reject(error))
  })

// If token valid returns status 200
// If token invalid or expired throws 401 status
export const getGuestTokenValidity = async (token: string): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    axios
      .post(
        `${CONFIG.tokenApiUrl}/token`,
        {},
        {
          headers: {
            "MBCL-TOKEN": token,
          },
        },
      )
      .then((response: AxiosResponse<void>) => {
        resolve(response.status === 200)
      })
      .catch(() => resolve(false))
  })
