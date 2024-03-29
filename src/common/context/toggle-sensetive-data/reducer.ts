import type { ToggleSensetiveDataAction, ToggleSensetiveDataState } from './ToggleSensetiveDataContext';

export default function (
  state: ToggleSensetiveDataState,
  action: ToggleSensetiveDataAction,
): ToggleSensetiveDataState {
  const copy = { ...state };
  return { ...copy, checked: action.checked };
}
