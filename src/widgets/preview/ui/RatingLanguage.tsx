import { memo } from "react"

import { ProgressBar } from "@mbicycle/foundation-ui-kit"

import { Labels } from "features/cv-form-components/languages/ui/model/level.enum"

const RatingLanguage = function ({ level }: { level: keyof typeof Labels }): JSX.Element {
  return <ProgressBar progress={(Labels[level] / 6) * 100} size="default" />
}

export default memo(RatingLanguage)
