import { useMemo, useReducer } from "react"

import { GuestUserContext } from "./GuestUserContext"
import reducer from "./reducer"

const initialState = {
  telegram: "",
  email: "",
  firstName: "",
  lastName: "",
  skype: "",
  title: "",
  summary: "",
  languages: [],
  skills: [],
  projects: [],
  certificates: [],
}

const GuestUserContextProvider: React.FC<React.PropsWithChildren> = function ({ children }): JSX.Element {
  const [guestUserState, guestUserDispatch] = useReducer(reducer, initialState)
  const guestUserContextValue = useMemo(
    () => ({
      state: guestUserState,
      dispatch: guestUserDispatch,
    }),
    [guestUserState],
  )

  return <GuestUserContext.Provider value={guestUserContextValue}>{children}</GuestUserContext.Provider>
}

export default GuestUserContextProvider
