import { useContext } from 'react';

import type { LeaveDialogContextType } from './LeaveDialogContext';
import { LeaveDialogContext } from './LeaveDialogContext';

export function useLeaveDialogContext(): LeaveDialogContextType {
  const context = useContext(LeaveDialogContext);

  if (context === undefined) {
    throw new Error('useLeaveDialogContext must be used within a CvFormProvider');
  }

  return context;
}
