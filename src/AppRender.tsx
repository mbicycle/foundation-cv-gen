import { useEffect } from 'react';
import { InteractionType } from '@azure/msal-browser';
import {
  AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsalAuthentication,
} from '@azure/msal-react';
import { getGuestTokenValidity } from 'shared/msalUtils/features/api';
import Login from 'shared/msalUtils/widgets/Login';
import { setCookie } from 'shared/utils/cookie';
import { msalInstance } from 'shared/utils/interceptors';

import ApplicationBar from 'containers/application-bar';
import { MESSAGE_TEXT } from 'common/components/info-pages/constants';
import ErrorScreen from 'common/components/info-pages/error';
import MainWrapper from 'common/components/main-wrapper';
import Routing from 'common/components/routes/Routing';
import { useGuestToken } from 'common/context/guest-token/useGuestToken';
import ReactQueryProvider from 'common/providers/ReactQueryProvider';
import useBeforeUnload from 'common/utils/hooks/useBeforeUnload';

const AppRender = function (): JSX.Element {
  useMsalAuthentication(InteractionType.Redirect);
  const { dispatch, state: { isGuest, tokenState } } = useGuestToken();
  useBeforeUnload(isGuest);

  const params = (new URL(document.location.toString())).searchParams;
  const token = params.get('token');

  setCookie('token', token || '');

  useEffect(() => {
    const clearCookie = (): void => {
      setCookie('token', '');
    };

    window.addEventListener('beforeunload', clearCookie);
    return () => {
      window.removeEventListener('beforeunload', clearCookie);
    };
  }, []);

  useEffect(() => {
    if (token) {
      dispatch({ isGuest: true });
      getGuestTokenValidity(token)
        .then((isValid) => {
          dispatch({ tokenState: isValid ? 'valid' : 'invalid' });
        });
    }
  }, [dispatch, token]);

  if (!isGuest && !token) {
    return (
      <MsalProvider instance={msalInstance}>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <ReactQueryProvider>
            <ApplicationBar />
            <MainWrapper>
              <Routing />
            </MainWrapper>
          </ReactQueryProvider>
        </AuthenticatedTemplate>
      </MsalProvider>
    );
  }
  if (tokenState === 'loading') return <p>Loading</p>;
  if (tokenState === 'invalid') {
    return (
      <ErrorScreen
        title={MESSAGE_TEXT.invalidTokenTitle}
        message={MESSAGE_TEXT.invalidTokenMessage}
      />
    );
  }
  return (
    <ReactQueryProvider>
      <ApplicationBar />
      <MainWrapper>
        <Routing />
      </MainWrapper>
    </ReactQueryProvider>
  );
};

export default AppRender;
