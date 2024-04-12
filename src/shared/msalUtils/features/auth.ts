import type { AuthContextValue, AuthProviderConfig } from "react-query-auth"
import { initReactQueryAuth } from "react-query-auth"
import { msalConfig } from "shared/utils/authConfig"
import { mockUser } from "shared/utils/constants"
import { msalInstance } from "shared/utils/interceptors"

import { useGuestToken } from "common/context/guest-token"
import type { MsUser } from "common/models/User"

import { getUser } from "./api"

async function loginFn(): Promise<MsUser> {
  return new Promise<MsUser>((resolve, reject) => {
    getUser()
      .then((response: MsUser) => resolve(response))
      .catch((error) => reject(error))
  })
}

async function logoutFn(): Promise<void> {
  const msalAccount = msalInstance.getAllAccounts()[0]
  const logoutRequest = {
    account: msalAccount,
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
    mainWindowRedirectUri: msalConfig.auth.redirectUri,
  }

  msalInstance.logoutPopup(logoutRequest)
}

async function loadUser(): Promise<MsUser> {
  try {
    return await getUser()
  } catch (error) {
    return Promise.reject(error)
  }
}

const authConfig: AuthProviderConfig<MsUser, unknown> = {
  loadUser,
  loginFn,
  registerFn: async (user: MsUser) => user,
  logoutFn,
}

const { AuthProvider, useAuth: MsAuth } = initReactQueryAuth<MsUser>(authConfig)

const useAuth = (): AuthContextValue<MsUser, unknown, unknown, unknown> | { user: MsUser } => {
  const { state } = useGuestToken()
  if (!state.isGuest) return MsAuth()
  return { user: mockUser }
}
export { AuthProvider, useAuth }
