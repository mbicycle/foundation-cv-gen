import React from "react"

import unsavedReducer from "./reducer"
import { UnsavedContext } from "./UnsavedContext"

const UnsavedContextProvider: React.FC<React.PropsWithChildren> = function ({ children }): JSX.Element {
  const [unsavedState, unsavedDispatch] = React.useReducer(unsavedReducer, { isUnsaved: false })

  const unsavedContextValue = React.useMemo(
    () => ({
      state: unsavedState,
      dispatch: unsavedDispatch,
    }),
    [unsavedState],
  )

  return <UnsavedContext.Provider value={unsavedContextValue}>{children}</UnsavedContext.Provider>
}

export default UnsavedContextProvider
