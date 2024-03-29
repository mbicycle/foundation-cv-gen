import { createContext } from 'react';

import type { LeaveDialogOptions } from './LeaveDialogProvider';

export type LeaveDialogContextType = {
  openDialog: (option: LeaveDialogOptions) => void;
};

export const LeaveDialogContext = createContext<LeaveDialogContextType | undefined>(undefined);
