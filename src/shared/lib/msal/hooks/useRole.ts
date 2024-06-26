import { useEffect, useState } from "react"

import { useGuestToken } from "shared/context/guest-token"
import msGraphInstance from "shared/lib/msal/instance"

const { msalInstance } = msGraphInstance

export type UseRoleReturnType = "admin" | "god" | "user" | "guest"

const useRole = (): { role: UseRoleReturnType | undefined } => {
  const { state } = useGuestToken()
  const [role, setRole] = useState<UseRoleReturnType | undefined>()

  const { idTokenClaims } = state.isGuest
    ? { idTokenClaims: { roles: "guest" } }
    : msalInstance.getAllAccounts()[0] ?? {}

  const { roles } = idTokenClaims ?? {}

  useEffect(() => {
    if (state.isGuest) {
      setRole("guest")
    } else if (roles?.length) {
      setRole(roles[0] as UseRoleReturnType)
    } else {
      setRole("user")
    }
  }, [roles, state.isGuest])

  return { role }
}

export default useRole
