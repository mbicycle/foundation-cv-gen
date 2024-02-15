import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import * as msGraph from 'msal-bundle';

import { AuthState } from 'utils/const';

export const useAuth = () => {
  const [authState, setAuthState] = useState(AuthState.Loading);
  const [userName, setUserName] = useState('');
  const [guestToken, setGuestToken] = useState('');

  const [{ token }, , removeCookie] = useCookies(['token']);

  const ssoSilentAuth = async () => {
    try {
      const res = await msGraph.ssoSilent();
      setAuthState(AuthState.LoggedIn);
      setUserName(res.account.username);
    } catch (e) {
      console.error(e);
      setAuthState(AuthState.LoggedOut);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryGuestToken = searchParams.get('token') || '';

    if (queryGuestToken) setGuestToken(queryGuestToken);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryGuestToken = searchParams.get('token') || '';

    const anyGuestToken = guestToken || queryGuestToken;

    if (!token && !anyGuestToken) {
      setAuthState(AuthState.LoggedOut);
      return;
    }

    if (!anyGuestToken && authState !== AuthState.LoggedIn) {
      ssoSilentAuth();
    } else if (anyGuestToken) {
      msGraph.getGuestTokenValidity(anyGuestToken)
        .then((isValid: boolean) => {
          if (isValid) {
            setAuthState(AuthState.LoggedIn);
            setUserName('Guest');
          } else {
            alert('Token invalid');
            setAuthState(AuthState.LoggedOut);
          }
        });
    }
  }, [guestToken, authState, token]);

  const logout = useCallback(async () => {
    removeCookie('token');
    setAuthState(AuthState.LoggedOut);
    await msGraph.logoutFn();
  }, [removeCookie]);

  return {
    userName,
    token,
    authState,
    logout,
  };
};
