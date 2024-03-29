import type { AccountInfo } from '@azure/msal-common';
import { useAccount, useMsal } from '@azure/msal-react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useMsalAccountInfo = (): AccountInfo => {
  const { accounts } = useMsal();

  return useAccount({ username: accounts[0]?.username }) as AccountInfo;
};
