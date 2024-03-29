import { useContext } from 'react';

import type { UnsavedContextType } from './UnsavedContext';
import { UnsavedContext } from './UnsavedContext';

export function useUnsavedContext(): UnsavedContextType {
  const context = useContext(UnsavedContext);

  if (context === undefined) {
    throw new Error('UnsavedContext must be used within a CvFormProvider');
  }

  return context;
}
