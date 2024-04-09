import { memo } from "react"

import { Spinner } from "@mbicycle/foundation-ui-kit"

type Size = "small" | "medium" | "large"
const CircularSpinner = function ({ size }: { size: Size }): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <Spinner size={size} />
    </div>
  )
}

export default memo(CircularSpinner)
