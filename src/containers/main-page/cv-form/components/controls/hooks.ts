import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import type { Step } from "containers/main-page/cv-form/utils/constants"
import { CV_FORM_STEPS } from "containers/main-page/cv-form/utils/constants"

interface SetLanguagesReturnType {
  activeStep: Step
  handlePrevious: VoidFunction
  handleNext: VoidFunction
}

export const useSetStep = (): SetLanguagesReturnType => {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeStep, setStep] = useState<number>(0)
  const handleNextStep = useCallback(() => {
    if (activeStep < CV_FORM_STEPS.length - 1) {
      navigate(CV_FORM_STEPS[activeStep + 1].route)
    }
  }, [activeStep, navigate])

  const handlePreviousStep = useCallback((): void => {
    if (activeStep > 0) {
      navigate(CV_FORM_STEPS[activeStep - 1].route)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, navigate, activeStep])

  useEffect(() => {
    setStep(() => CV_FORM_STEPS.findIndex((step) => location.pathname.includes(step.route)))
  }, [activeStep, location.pathname])

  return {
    activeStep,
    handlePrevious: handlePreviousStep,
    handleNext: handleNextStep,
  }
}
