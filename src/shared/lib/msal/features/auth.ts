import type { AuthContextValue, AuthProviderConfig } from "react-query-auth"
import { initReactQueryAuth } from "react-query-auth"

import { loginFn, logoutFn } from "@mbicycle/msal-bundle"

import type { MsUser } from "entities/user/model"

import { CONFIG } from "shared/config/envConfig"
import { useGuestToken } from "shared/context/guest-token"
import { mockUser } from "shared/lib/constants"
import { getUser } from "shared/lib/msal/features/api"
import msGraphInstance from "shared/lib/msal/instance"

async function loadUser(): Promise<MsUser> {
  try {
    return await getUser()
  } catch (error) {
    return Promise.reject(error)
  }
}

const authConfig: AuthProviderConfig<MsUser, unknown> = {
  loadUser,
  loginFn: () => loginFn(msGraphInstance.msalInstance) as unknown as Promise<MsUser>,
  registerFn: async (user: MsUser) => user,
  logoutFn: () => logoutFn(msGraphInstance.msalInstance, `${CONFIG.redirectUri}?logout=true`),
}

const { AuthProvider, useAuth: MsAuth } = initReactQueryAuth<MsUser>(authConfig)

const useAuth = (): AuthContextValue<MsUser, unknown, unknown, unknown> | { user: MsUser } => {
  const { state } = useGuestToken()
  if (!state.isGuest) return MsAuth()
  return { user: mockUser }
}
export { AuthProvider, useAuth }
