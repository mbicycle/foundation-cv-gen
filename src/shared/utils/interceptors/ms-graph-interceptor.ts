import type { AccountInfo, SilentRequest } from "@azure/msal-browser"
import { InteractionRequiredAuthError, InteractionType, PublicClientApplication } from "@azure/msal-browser"
import { Client } from "@microsoft/microsoft-graph-client"
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser"
import { loginRequest, msalConfig } from "shared/utils/authConfig"

const msGraph = (): {
  graphClient: Client
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
  msalInstance: PublicClientApplication
  setActiveAccount: () => Promise<AccountInfo | null>
  getRequest: () => SilentRequest
} => {
  const msalInstance = new PublicClientApplication(msalConfig)

  const getRequest = (): SilentRequest => {
    const account = msalInstance.getActiveAccount()
    return {
      ...loginRequest,
      account: account ?? ({} as AccountInfo),
      forceRefresh: true,
      redirectUri: "/",
    }
  }

  let graphClient: Client | undefined

  const setActiveAccount = async (): Promise<AccountInfo | null> => {
    const activeAccount = msalInstance.getActiveAccount()
    const request = getRequest()

    if (!activeAccount) {
      if (request.account) {
        msalInstance.setActiveAccount(request.account)
      }
    }
    try {
      await msalInstance.acquireTokenSilent(request)
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        msalInstance.acquireTokenSilent(request)
      }
    }

    return activeAccount
  }

  const ensureClient = (authProvider: AuthCodeMSALBrowserAuthenticationProvider): Client => {
    setActiveAccount()

    if (!graphClient) {
      graphClient = Client.initWithMiddleware({ authProvider })
    }

    return graphClient
  }
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance as PublicClientApplication, {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    account: msalInstance.getActiveAccount()!,
    scopes: loginRequest.scopes,
    interactionType: InteractionType.Silent,
  })

  return {
    authProvider,
    graphClient: ensureClient(authProvider),
    msalInstance,
    setActiveAccount,
    getRequest,
  }
}

export default msGraph()
