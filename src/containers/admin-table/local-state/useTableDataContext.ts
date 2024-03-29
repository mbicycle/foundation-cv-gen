import { useContext } from 'react';

import type { TableDataContextType } from './TableDataContext';
import { TableDataContext } from './TableDataContext';

export default function useTableDataContext(): TableDataContextType {
  const context = useContext(TableDataContext);

  if (context === undefined) {
    throw new Error('TableDataContext must be used within a AdminTableProvider');
  }

  return context;
}
