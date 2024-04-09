import React from "react"

import type { ToggleSensetiveDataContextType } from "./ToggleSensetiveDataContext"
import { ToggleSensetiveDataContext } from "./ToggleSensetiveDataContext"

export function useToggleSensitiveData(): ToggleSensetiveDataContextType {
  const context = React.useContext(ToggleSensetiveDataContext)
  if (context === undefined) {
    throw new Error("ToggleSensitiveDataContext must be used within a AppProvider")
  }
  return context
}
