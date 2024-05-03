import { MESSAGE_TEXT } from "pages/constants"
import ErrorScreen from "pages/error"

import { CONFIG } from "shared/config/envConfig"

import AppProvider from "./providers/AppProvider"
import AppProviderBasic from "./providers/AppProviderBasic"
import AppRender from "./AppRender"

const App = function (): JSX.Element {
  if (CONFIG.freezed === "true") {
    return (
      <AppProviderBasic>
        <ErrorScreen title={MESSAGE_TEXT.notAvailableTitle} message={MESSAGE_TEXT.notAvailableMessage} />
      </AppProviderBasic>
    )
  }
  return (
    <AppProvider>
      <AppRender />
    </AppProvider>
  )
}

export default App
