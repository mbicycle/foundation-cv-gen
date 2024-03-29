import { useMemo, useReducer } from 'react';

import { tableDataReducer, wildcardReducer } from './reducers';
import { TableDataContext } from './TableDataContext';
import { WildcardContext } from './WildcardContext';

const AdminTableProvider: React.FC<React.PropsWithChildren> = function ({ children }): JSX.Element {
  const [wildcardState, wildcardDispatch] = useReducer(
    wildcardReducer,
    { wildcard: [], column: 'displayName' },
  );
  const [tableDataState, tableDataDispatch] = useReducer(tableDataReducer, { data: [] });

  const wildcardContextValue = useMemo(() => ({
    state: wildcardState,
    dispatch: wildcardDispatch,
  }), [wildcardState]);

  const tableDataContextValue = useMemo(() => ({
    state: tableDataState,
    dispatch: tableDataDispatch,
  }), [tableDataState]);

  return (
    <TableDataContext.Provider value={tableDataContextValue}>
      <WildcardContext.Provider value={wildcardContextValue}>
        {children}
      </WildcardContext.Provider>
    </TableDataContext.Provider>
  );
};

export default AdminTableProvider;
