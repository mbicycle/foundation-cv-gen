import { memo } from "react"
import type { RouteProps } from "react-router-dom"
import { Navigate, useLocation } from "react-router-dom"
import { useIsAuthenticated } from "@azure/msal-react"

import { useGuestToken } from "shared/context/guest-token"
import useRole from "shared/lib/msal/hooks/useRole"

import { ROUTE } from "./utils/constants"

type PrivateRouteProps = RouteProps & {
  children: JSX.Element
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element | null {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  const { role } = useRole()
  const { state } = useGuestToken()

  if (!isAuthenticated && !state.isGuest) {
    return <Navigate to={ROUTE.LOGIN} state={{ from: location }} />
  }

  if (isAuthenticated && role === "user" && location.pathname === ROUTE.DASHBOARD.DEFAULT) {
    return <Navigate to={ROUTE.DASHBOARD.PERSONAL_INFORMATION} state={{ from: location }} />
  }

  if (isAuthenticated && role === "admin" && location.pathname !== ROUTE.ADMIN.DEFAULT) {
    return <Navigate to={`${ROUTE.ADMIN.DEFAULT}`} state={{ from: location }} />
  }

  if (isAuthenticated && location.pathname.includes(ROUTE.ADMIN.DEFAULT) && role === "user") {
    return <Navigate to={`/dashboard/${ROUTE.DASHBOARD.PERSONAL_INFORMATION}`} replace />
  }

  if (isAuthenticated && location.pathname.includes(ROUTE.DASHBOARD.DEFAULT) && role === "admin") {
    return <Navigate to={ROUTE.ADMIN.DEFAULT} />
  }

  return children
}

export default memo(PrivateRoute)
