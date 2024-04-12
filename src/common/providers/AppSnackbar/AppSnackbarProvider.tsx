import { createRef, memo, useCallback } from "react"
import { XMarkIcon as CloseIcon } from "@heroicons/react/24/solid"
import type { SnackbarKey } from "notistack"
import { SnackbarProvider } from "notistack"

import { SnackbarUtilsConfigurator } from "common/components/SnackBar/SnackBarUtils"

function IconButtonMemoized(key: SnackbarKey, onClickDismiss: CallableFunction): React.ReactNode {
  return (
    <button type="button" aria-label="dismiss" onClick={(e) => onClickDismiss(e, key)}>
      <CloseIcon className="size-10" />
    </button>
  )
}

const AppSnackbarProvider = function ({ children }: { children: React.ReactElement }): JSX.Element {
  const notistackRef = createRef<SnackbarProvider>()

  const onClickDismiss = useCallback(
    (_: React.MouseEvent<HTMLButtonElement>, key: SnackbarKey): void => {
      notistackRef.current?.closeSnackbar(key as SnackbarKey)
    },
    [notistackRef],
  )

  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      dense
      preventDuplicate
      action={(key) => IconButtonMemoized(key, onClickDismiss)}
      style={{ fontSize: "14px" }}
    >
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  )
}

export default memo(AppSnackbarProvider)
