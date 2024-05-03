import { memo } from "react"
import { Navigate, useLocation, useRoutes } from "react-router-dom"
import { useMsal } from "@azure/msal-react"

import useRole from "shared/lib/msal/hooks/useRole"
import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"

import { ROUTE } from "./utils/constants"
import routerConfig from "./utils/router-config"

const Routing = function (): JSX.Element | null {
  const { inProgress } = useMsal()
  const location = useLocation()
  const element = useRoutes(routerConfig)

  const { role } = useRole()

  if (location.pathname === "/" || location.pathname === "") {
    if (role === "user" || role === "god" || role === "guest") {
      return <Navigate to={`dashboard/${ROUTE.DASHBOARD.PERSONAL_INFORMATION}`} />
    }
    if (role === "admin") {
      return <Navigate to={ROUTE.ADMIN.DEFAULT} />
    }
  }

  if (inProgress !== "none") {
    return <CircularSpinner size="large" className="flex h-full w-full items-center justify-center" />
  }

  return element
}

export default memo(Routing)
