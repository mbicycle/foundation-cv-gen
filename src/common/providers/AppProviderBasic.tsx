import { BrowserRouter } from "react-router-dom"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

const AppProviderBasic = function ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>{children}</BrowserRouter>
    </LocalizationProvider>
  )
}

export default AppProviderBasic
