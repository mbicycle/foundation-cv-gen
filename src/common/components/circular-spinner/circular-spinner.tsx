import { memo } from "react"

import { Spinner } from "@mbicycle/foundation-ui-kit"

type Size = "small" | "medium" | "large"
const CircularSpinner = function ({ size, className = "" }: { size: Size; className?: string }): JSX.Element {
  return <Spinner size={size} className={className} />
}

export default memo(CircularSpinner)
