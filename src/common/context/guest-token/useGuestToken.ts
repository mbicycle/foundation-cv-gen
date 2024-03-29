import { useContext } from 'react';

import type { GuestTokenContextType } from './GuestTokenContext';
import { GuestTokenContext } from './GuestTokenContext';

export function useGuestToken(): GuestTokenContextType {
  const context = useContext(GuestTokenContext);
  if (context === undefined) {
    throw new Error('GuestTokenContext must be used within a AppProvider');
  }
  return context;
}
