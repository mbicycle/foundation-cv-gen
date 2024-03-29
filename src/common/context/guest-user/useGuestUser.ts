import React from 'react';

import type { GuestUserContextType } from './GuestUserContext';
import { GuestUserContext } from './GuestUserContext';

export function useGuestUser(): GuestUserContextType {
  const context = React.useContext(GuestUserContext);
  if (context === undefined) {
    throw new Error('GuestUserContext must be used within a AppProvider');
  }
  return context;
}
