import type { UnsavedAction, UnsavedState } from "./UnsavedContext"

export default function unsavedReducer(state: UnsavedState, action: UnsavedAction): UnsavedState {
  const copy = { ...state }
  if (action.type === "set") {
    copy.isUnsaved = action.isUnsaved
  }

  return copy
}
