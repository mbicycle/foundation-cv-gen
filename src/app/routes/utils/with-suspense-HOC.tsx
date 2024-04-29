import { Suspense } from "react"
import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"

function withSuspense(Component: JSX.Element): JSX.Element {
  return <Suspense fallback={<CircularSpinner size="large" />}>{Component}</Suspense>
}

export default withSuspense
