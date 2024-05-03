import { memo } from "react"

import { useSetStep } from "widgets/cv-form/lib/hooks"
import { CVTitles } from "widgets/cv-form/model/constants"

const CVFormTitle = function (): JSX.Element {
  const { activeStep } = useSetStep()

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-2xl font-bold">{CVTitles[activeStep]?.title}</h2>
    </div>
  )
}

export default memo(CVFormTitle)
