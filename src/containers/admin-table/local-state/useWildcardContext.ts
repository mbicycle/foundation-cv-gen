import { useContext } from 'react';

import type { WildcardContextType } from './WildcardContext';
import { WildcardContext } from './WildcardContext';

export default function useWildcardContext(): WildcardContextType {
  const context = useContext(WildcardContext);

  if (context === undefined) {
    throw new Error('WildcardContext must be used within a AdminTableProvider');
  }

  return context;
}
