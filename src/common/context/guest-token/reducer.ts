import type { GuestTokenAction, GuestTokenState } from "./GuestTokenContext"

export default function (state: GuestTokenState, action: GuestTokenAction): GuestTokenState {
  let result = state
  if (action?.isGuest !== undefined) result = { ...state, isGuest: action.isGuest }
  if (action?.tokenState) {
    result = { ...result, tokenState: action.tokenState }
  }
  return result
}
