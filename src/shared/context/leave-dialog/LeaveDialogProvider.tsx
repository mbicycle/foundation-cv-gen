import { useCallback, useMemo, useState } from "react"

import LeaveDialog from "features/LeaveDialog"

import { LeaveDialogContext } from "./LeaveDialogContext"

export interface LeaveDialogOptions {
  handleLeave: () => void
}

const LeaveDialogProvider: React.FC<React.PropsWithChildren> = function ({ children }): JSX.Element {
  const [isOpen, setOpen] = useState(false)
  const [option, setOption] = useState<LeaveDialogOptions>()

  const openDialog = useCallback((dialogOptions: LeaveDialogOptions): void => {
    setOpen(true)
    setOption(dialogOptions)
  }, [])

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleLeave = (): void => {
    setOpen(false)
    option?.handleLeave()
  }

  const leaveDialogContextValue = useMemo(
    () => ({
      openDialog,
    }),
    [openDialog],
  )

  return (
    <LeaveDialogContext.Provider value={leaveDialogContextValue}>
      <LeaveDialog isOpen={isOpen} handleClose={handleClose} handleLeave={handleLeave} />
      {children}
    </LeaveDialogContext.Provider>
  )
}

export default LeaveDialogProvider
