import type { TableDataAction, TableDataState } from "./TableDataContext"
import type { WildcardAction, WildcardState } from "./WildcardContext"

export function wildcardReducer(state: WildcardState, action: WildcardAction): WildcardState {
  const copy = { ...state }

  if (typeof action.wildcard === "string") copy.wildcard = action.wildcard.split(" ")
  if (typeof action.column === "string") copy.column = action.column

  return copy
}
export function tableDataReducer(state: TableDataState, action: TableDataAction): TableDataState {
  return { ...state, ...action }
}
