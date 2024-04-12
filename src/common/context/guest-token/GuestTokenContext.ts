import { createContext } from "react"

export type GuestTokenAction = { isGuest?: boolean; tokenState?: "loading" | "valid" | "invalid" }
export type GuestTokenState = { isGuest: boolean; tokenState: "loading" | "valid" | "invalid" }
export type GuestTokenDispatch = (action: GuestTokenAction) => void
export type GuestTokenContextType = {
  state: GuestTokenState
  dispatch: GuestTokenDispatch
}

export const GuestTokenContext = createContext<
  | {
      state: GuestTokenState
      dispatch: GuestTokenDispatch
    }
  | undefined
>(undefined)
