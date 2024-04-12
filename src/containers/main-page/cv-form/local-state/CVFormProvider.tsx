import { useMemo, useReducer } from "react"

import { INITIAL_SERTIFICATE } from "containers/main-page/cv-form/utils/constants"

import { CategoryByIdContextCertificates, CategoryByIdContextLanguage, SkillByIdContext } from "./CategoryIdContext"
import { certificatesReducer, languageReducer, skillIdReducer } from "./reducers"

const CvFormProvider: React.FC<React.PropsWithChildren> = function ({ children }): JSX.Element {
  const [skillNameState, skillNameDispatch] = useReducer(skillIdReducer, { id: null })
  const [languageState, languageDispatch] = useReducer(languageReducer, { language: null, level: null })
  const [certificatesState, certificatesDispatch] = useReducer(certificatesReducer, {
    ...INITIAL_SERTIFICATE,
  })

  const skillNameContextValue = useMemo(
    () => ({
      state: skillNameState,
      dispatch: skillNameDispatch,
    }),
    [skillNameState],
  )

  const languageContextValue = useMemo(
    () => ({
      state: languageState,
      dispatch: languageDispatch,
    }),
    [languageState],
  )

  const certificatesContextValue = useMemo(
    () => ({
      state: certificatesState,
      dispatch: certificatesDispatch,
    }),
    [certificatesState],
  )

  return (
    <CategoryByIdContextCertificates.Provider value={certificatesContextValue}>
      <CategoryByIdContextLanguage.Provider value={languageContextValue}>
        <SkillByIdContext.Provider value={skillNameContextValue}>{children}</SkillByIdContext.Provider>
      </CategoryByIdContextLanguage.Provider>
    </CategoryByIdContextCertificates.Provider>
  )
}

export default CvFormProvider
