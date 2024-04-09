import { memo } from "react"

import { useSetStep } from "containers/main-page/cv-form/components/controls/hooks"
import { CVTitles } from "containers/main-page/cv-form/utils/constants"

const CVFormTitle = function (): JSX.Element {
  const { activeStep } = useSetStep()

  return (
    <div className="mt-4">
      <h2 className="mb-8 mt-6 text-2xl font-bold">{CVTitles[activeStep]?.title}</h2>
    </div>
  )
}

export default memo(CVFormTitle)
