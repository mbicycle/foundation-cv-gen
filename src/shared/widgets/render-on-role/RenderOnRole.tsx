import type { UseRoleReturnType } from "shared/lib/msal/hooks/useRole"
import useRole from "shared/lib/msal/hooks/useRole"

type Props = {
  children: JSX.Element
  roles: UseRoleReturnType[]
}

function RenderOnRole({ children, roles }: Props): JSX.Element | null {
  const { role } = useRole()
  if (role && roles.includes(role)) {
    return children
  }

  return null
}

export default RenderOnRole
