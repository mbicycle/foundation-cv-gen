import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import AppSnackbarProvider from "common/providers/AppSnackbar/AppSnackbarProvider"

import AppContextProvider from "./AppContextProvider"

const AppProvider = function ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AppSnackbarProvider>
      <AppContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>{children}</BrowserRouter>
        </LocalizationProvider>
      </AppContextProvider>
    </AppSnackbarProvider>
  )
}

export default AppProvider
