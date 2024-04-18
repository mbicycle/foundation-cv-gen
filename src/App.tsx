import { CONFIG } from "shared/config/envConfig"

import { MESSAGE_TEXT } from "common/components/info-pages/constants"
import ErrorScreen from "common/components/info-pages/error"
import AppProvider from "common/providers/AppProvider"
import AppProviderBasic from "common/providers/AppProviderBasic"

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
