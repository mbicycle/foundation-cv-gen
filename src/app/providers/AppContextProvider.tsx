import GuestTokenContextProvider from "common/context/guest-token/GuestTokenProvider"
import GuestUserProvider from "common/context/guest-user/GuestUserProvider"
import LeaveDialogProvider from "common/context/leave-dialog/LeaveDialogProvider"
import { ToggleSensetiveDataContextProvider } from "common/context/toggle-sensetive-data"
import UnsavedContextProvider from "common/context/unsaved/UnsavedContextProvider"

const AppContextProvider: React.FC<React.PropsWithChildren> = function ({ children }): JSX.Element {
  return (
    <GuestTokenContextProvider>
      <GuestUserProvider>
        <ToggleSensetiveDataContextProvider>
          <UnsavedContextProvider>
            <LeaveDialogProvider>{children}</LeaveDialogProvider>
          </UnsavedContextProvider>
        </ToggleSensetiveDataContextProvider>
      </GuestUserProvider>
    </GuestTokenContextProvider>
  )
}

export default AppContextProvider
