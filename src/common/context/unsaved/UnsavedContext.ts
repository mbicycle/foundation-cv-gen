import { createContext } from "react"

export type UnsavedState = { isUnsaved: boolean }

export type UnsavedAction = {
  type: "set"
  isUnsaved: boolean
}

export type UnsavedDispatch = (action: UnsavedAction) => void

export type UnsavedContextType = {
  state: UnsavedState
  dispatch: UnsavedDispatch
}

export const UnsavedContext = createContext<
  | {
      state: UnsavedState
      dispatch: UnsavedDispatch
    }
  | undefined
>(undefined)
