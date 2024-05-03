import { BrowserRouter } from "react-router-dom"

const AppProviderBasic = function ({ children }: { children: React.ReactNode }): JSX.Element {
  return <BrowserRouter>{children}</BrowserRouter>
}

export default AppProviderBasic
