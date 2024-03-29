import React from 'react';

export type ToggleSensetiveDataAction = { checked: boolean; };
export type ToggleSensetiveDataState = { checked: boolean; };
export type ToggleSensetiveDataDispatch = (action: ToggleSensetiveDataAction) => void;
export type ToggleSensetiveDataContextType = {
  state: ToggleSensetiveDataState;
  dispatch: ToggleSensetiveDataDispatch;
};

export const ToggleSensetiveDataContext = React.createContext<{
  state: ToggleSensetiveDataState,
  dispatch: ToggleSensetiveDataDispatch;
} | undefined>(undefined);
