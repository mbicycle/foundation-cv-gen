import React from 'react';

export type TableDataAction = {
    data: AdminTableType.UserMapped[]
};
export type TableDataState = { data: AdminTableType.UserMapped[]};
export type TableDataDispatch = (action: TableDataAction) => void;
export type TableDataContextType = { state: TableDataState, dispatch: TableDataDispatch};

export const TableDataContext = React.createContext<{
    state: TableDataState,
    dispatch: TableDataDispatch;
} | undefined>(undefined);
