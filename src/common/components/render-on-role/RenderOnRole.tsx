import type { UseRoleReturnType } from "shared/msalUtils/hooks/useRole"
import useRole from "shared/msalUtils/hooks/useRole"

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
