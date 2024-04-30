import GuestTokenContextProvider from "shared/context/guest-token/GuestTokenProvider"
import GuestUserProvider from "shared/context/guest-user/GuestUserProvider"
import LeaveDialogProvider from "shared/context/leave-dialog/LeaveDialogProvider"
import { ToggleSensetiveDataContextProvider } from "shared/context/toggle-sensetive-data"
import UnsavedContextProvider from "shared/context/unsaved/UnsavedContextProvider"

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
