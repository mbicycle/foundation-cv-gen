import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getGuestTokenValidity, logoutFn } from '@mbicycle/msal-bundle';

import useAuthStore from 'stores/auth';
import useGuestTokenStore from 'stores/guestToken';
import useUserStore from 'stores/user';

import { AuthState, COOKIE_NAME } from 'utils/const';
import { CONFIG } from 'utils/envConfig';
import msGraphInstance from 'utils/msal';

export const useAuth = () => {
  const { state: authState, setState: setAuthState } = useAuthStore();
  const { user, setUser, removeUser } = useUserStore();
  const { guestToken, setGuestToken, clearGuestToken } = useGuestTokenStore();

  const [{ msalUserEmail }, , removeCookie] = useCookies([COOKIE_NAME]);

  const ssoSilentAuth = useCallback(async () => {
    try {
      const res = await msGraphInstance.ssoSilent(msalUserEmail);
      setAuthState(AuthState.LoggedIn);
      setUser({ name: res.account.username, role: res.idTokenClaims.roles[0] || '' });
    } catch (e) {
      console.error(e);
      setAuthState(AuthState.LoggedOut);
    }
  }, [setAuthState, setUser]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryGuestToken = searchParams.get('guestToken') || '';

    if (queryGuestToken) setGuestToken(queryGuestToken);
  }, [setGuestToken]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryGuestToken = searchParams.get('guestToken') || '';

    const anyGuestToken = guestToken || queryGuestToken;

    if (!msalUserEmail && !anyGuestToken) {
      setAuthState(AuthState.LoggedOut);
      return;
    }

    if (!anyGuestToken && authState !== AuthState.LoggedIn) {
      ssoSilentAuth();
    } else if (anyGuestToken) {
      getGuestTokenValidity(anyGuestToken)
        .then((isValid: boolean) => {
          if (isValid) {
            setAuthState(AuthState.LoggedIn);
            setUser({ name: 'Guest', role: 'guest' });
          } else {
            alert('Token invalid');
            setAuthState(AuthState.LoggedOut);
          }
        });
    }
  }, [guestToken, authState, msalUserEmail, setAuthState, setUser, ssoSilentAuth]);

  const logout = useCallback(async () => {
    removeCookie(COOKIE_NAME);
    clearGuestToken();
    removeUser();
    setAuthState(AuthState.LoggedOut);
    if (guestToken) return;
    await logoutFn(msGraphInstance.msalInstance, `${CONFIG.redirectUri}?logout=true`);
  }, [clearGuestToken, guestToken, removeCookie, removeUser, setAuthState]);

  return {
    user,
    authState,
    logout,
  };
};
