import React from 'react';

import reducer from './reducer';
import { ToggleSensetiveDataContext } from './ToggleSensetiveDataContext';

const ToggleSensetiveDataContextProvider: React.FC<React.PropsWithChildren> = function (
  { children },
): JSX.Element {
  const [projectIdState, projectIdDispatch] = React.useReducer(reducer, { checked: false });
  const projectContextValue = React.useMemo(() => ({
    state: projectIdState,
    dispatch: projectIdDispatch,
  }), [projectIdState]);

  return (
    <ToggleSensetiveDataContext.Provider value={projectContextValue}>
      {children}
    </ToggleSensetiveDataContext.Provider>
  );
};

export default ToggleSensetiveDataContextProvider;
