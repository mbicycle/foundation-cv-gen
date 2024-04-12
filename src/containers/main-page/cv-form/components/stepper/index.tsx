import { memo } from "react"
import { useNavigate } from "react-router-dom"

import { Breadcrumb } from "@mbicycle/foundation-ui-kit"

import { useSetStep } from "containers/main-page/cv-form/components/controls/hooks"
import { CV_FORM_STEPS } from "containers/main-page/cv-form/utils/constants"
import useUnsaved from "common/utils/hooks/useUnSaved"

const CVFormStepper = function (): JSX.Element {
  const { activeStep } = useSetStep()
  const navigate = useNavigate()
  const { openDialogHandler } = useUnsaved()

  const navigateStepHandle = ({ event, route }: { event: React.MouseEvent; route: string }): void => {
    openDialogHandler({ handleLeave: () => navigate(route) })
    event.currentTarget.scrollIntoView({ block: "center", inline: "center" })
  }

  return <Breadcrumb activeStep={activeStep} routes={CV_FORM_STEPS} onClickStep={navigateStepHandle} />
}

export default memo(CVFormStepper)
