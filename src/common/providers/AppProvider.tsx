import React from "react"
import { BrowserRouter } from "react-router-dom"

import AppSnackbarProvider from "common/providers/AppSnackbar/AppSnackbarProvider"

import AppContextProvider from "./AppContextProvider"

const AppProvider = function ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AppSnackbarProvider>
      <AppContextProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AppContextProvider>
    </AppSnackbarProvider>
  )
}

export default AppProvider
