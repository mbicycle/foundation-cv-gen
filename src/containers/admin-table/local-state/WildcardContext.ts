import React from "react"

export type WildcardAction = {
  wildcard?: string
  column?: string
}
export type WildcardState = { wildcard: string[]; column: string }
export type WildcardDispatch = (action: WildcardAction) => void
export type WildcardContextType = { state: WildcardState; dispatch: WildcardDispatch }

export const WildcardContext = React.createContext<
  | {
      state: WildcardState
      dispatch: WildcardDispatch
    }
  | undefined
>(undefined)
