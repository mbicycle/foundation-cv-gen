import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react"
import msGraphInstance from "shared/lib/msal/instance"
import { getGuestTokenValidity } from "shared/msalUtils/features/api"
import { setCookie } from "shared/utils/cookie"

import ApplicationBar from "containers/application-bar"
import Login from "containers/login"
import { MESSAGE_TEXT } from "common/components/info-pages/constants"
import ErrorScreen from "common/components/info-pages/error"
import MainWrapper from "common/components/main-wrapper"
import Routing from "common/components/routes/Routing"
import { useGuestToken } from "common/context/guest-token/useGuestToken"
import ReactQueryProvider from "common/providers/ReactQueryProvider"
import useBeforeUnload from "common/utils/hooks/useBeforeUnload"

export const AUTH_COOKIE_NAME = "msalUserEmail"
export const TOKEN_COOKIE_NAME = "token"

const AppRender = function (): JSX.Element {
  const [{ msalUserEmail }] = useCookies([AUTH_COOKIE_NAME])

  useEffect(() => {
    if (msalUserEmail) {
      msGraphInstance.ssoSilent(msalUserEmail)
    } else {
      msGraphInstance.msalInstance.clearCache()
    }
  }, [msalUserEmail])

  const {
    dispatch,
    state: { isGuest, tokenState },
  } = useGuestToken()
  useBeforeUnload(isGuest)

  const params = new URL(document.location.toString()).searchParams
  const token = params.get("token")

  setCookie(TOKEN_COOKIE_NAME, token || "")

  useEffect(() => {
    const clearCookie = (): void => {
      setCookie(TOKEN_COOKIE_NAME, "")
    }

    window.addEventListener("beforeunload", clearCookie)
    return () => {
      window.removeEventListener("beforeunload", clearCookie)
    }
  }, [])

  useEffect(() => {
    if (token) {
      dispatch({ isGuest: true })
      getGuestTokenValidity(token).then((isValid) => {
        dispatch({ tokenState: isValid ? "valid" : "invalid" })
      })
    }
  }, [dispatch, token])

  if (!isGuest && !token) {
    return (
      <MsalProvider instance={msGraphInstance.msalInstance}>
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
    )
  }
  if (tokenState === "loading")
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  if (tokenState === "invalid") {
    return <ErrorScreen title={MESSAGE_TEXT.invalidTokenTitle} message={MESSAGE_TEXT.invalidTokenMessage} />
  }
  return (
    <ReactQueryProvider>
      <ApplicationBar />
      <MainWrapper>
        <Routing />
      </MainWrapper>
    </ReactQueryProvider>
  )
}

export default AppRender
