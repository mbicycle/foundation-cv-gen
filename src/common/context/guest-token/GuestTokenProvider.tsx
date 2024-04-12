import { useMemo, useReducer } from "react"

import { GuestTokenContext } from "./GuestTokenContext"
import reducer from "./reducer"

const GuestTokenContextProvider: React.FC<React.PropsWithChildren> = function ({ children }): JSX.Element {
  const [guestTokenState, guestTokenDispatch] = useReducer(reducer, { isGuest: false, tokenState: "loading" })
  const guestTokenContextValue = useMemo(
    () => ({
      state: guestTokenState,
      dispatch: guestTokenDispatch,
    }),
    [guestTokenState],
  )

  return <GuestTokenContext.Provider value={guestTokenContextValue}>{children}</GuestTokenContext.Provider>
}

export default GuestTokenContextProvider
