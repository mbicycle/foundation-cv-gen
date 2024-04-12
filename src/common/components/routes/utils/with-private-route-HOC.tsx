import { PrivateRoute } from "common/components/routes/PrivateRoute"

function withPrivate(Component: JSX.Element): JSX.Element {
  return <PrivateRoute>{Component}</PrivateRoute>
}

export default withPrivate
