import type { GuestUserAction, GuestUserState } from './GuestUserContext';

export default function (
  state: GuestUserState,
  action: GuestUserAction,
): GuestUserState {
  return { ...state, ...action };
}
