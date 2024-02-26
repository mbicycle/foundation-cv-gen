import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getGuestTokenValidity, logoutFn } from '@mbicycle/msal-bundle';
import useAuthStore from 'stores/auth';
import useGuestTokenStore from 'stores/guestToken';
import useUserStore from 'stores/user';

import { AuthState } from 'utils/const';
import msGraphInstance from 'utils/msal';

export const useAuth = () => {
  const { state: authState, setState: setAuthState } = useAuthStore();
  const { user, setUser, removeUser } = useUserStore();
  const { guestToken, setGuestToken } = useGuestTokenStore();

  const [{ token = 'token' }, , removeCookie] = useCookies(['token']);

  const ssoSilentAuth = async () => {
    try {
      const res = await msGraphInstance.ssoSilent();
      setAuthState(AuthState.LoggedIn);
      setUser({ name: res.account.username, role: res.idTokenClaims.roles[0] || '' });
    } catch (e) {
      console.error(e);
      setAuthState(AuthState.LoggedOut);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryGuestToken = searchParams.get('guestToken') || '';

    if (queryGuestToken) setGuestToken(queryGuestToken);
  }, [setGuestToken]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryGuestToken = searchParams.get('guestToken') || '';

    const anyGuestToken = guestToken || queryGuestToken;

    if (!token && !anyGuestToken) {
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
  }, [guestToken, authState, token, setAuthState, ssoSilentAuth, setUser]);

  const logout = useCallback(async () => {
    removeCookie('token');
    removeUser();
    setAuthState(AuthState.LoggedOut);
    await logoutFn(msGraphInstance.msalInstance, `${msGraphInstance.config.auth.redirectUri}?logout=true`);
  }, [removeCookie, removeUser, setAuthState]);

  return {
    user,
    token,
    authState,
    logout,
  };
};
