import { createContext } from "react"

import type { GuestUser } from "entities/user/model"

export type GuestUserAction = Partial<GuestUser>
export type GuestUserState = GuestUser
export type GuestUserDispatch = (action: GuestUserAction) => void
export type GuestUserContextType = {
  state: GuestUserState
  dispatch: GuestUserDispatch
}

export const GuestUserContext = createContext<
  | {
      state: GuestUserState
      dispatch: GuestUserDispatch
    }
  | undefined
>(undefined)
