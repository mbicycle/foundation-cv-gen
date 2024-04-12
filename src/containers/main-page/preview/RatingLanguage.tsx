import { memo } from "react"
import { Labels } from "fields/languages/components/utils/level.enum"

import { ProgressBar } from "@mbicycle/foundation-ui-kit"

const RatingLanguage = function ({ level }: { level: keyof typeof Labels }): JSX.Element {
  return <ProgressBar progress={(Labels[level] / 6) * 100} size="default" />
}

export default memo(RatingLanguage)
