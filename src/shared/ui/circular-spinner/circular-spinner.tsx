import { memo } from "react"

import { Spinner } from "@mbicycle/foundation-ui-kit"

type Size = "small" | "medium" | "large"
const CircularSpinner = function ({ size, className = "" }: { size: Size; className?: string }): JSX.Element {
  return <Spinner size={size} className={className || "flex items-center justify-center p-1"} />
}

export default memo(CircularSpinner)
