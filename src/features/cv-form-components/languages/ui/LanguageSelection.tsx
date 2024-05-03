import { memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@mbicycle/foundation-ui-kit"

import { ButtonStep } from "widgets/cv-form/model/constants"

import { useAddUserLanguage } from "features/cv-form-components/languages/api/query-hooks"
import { addUserLanguage } from "features/cv-form-components/languages/lib/functions"

import type { UserLanguage } from "entities/user/model"

import { useGuestToken } from "shared/context/guest-token"
import { useGuestUser } from "shared/context/guest-user"
import useBeforeUnload from "shared/lib/hooks/useBeforeUnload"
import useUnsaved from "shared/lib/hooks/useUnSaved"

import LanguageSelectionForm from "./LanguageSelectionForm"

const LanguageSelection = function (): JSX.Element {
  const navigate = useNavigate()
  const {
    state: { isGuest },
  } = useGuestToken()
  const { state: user, dispatch } = useGuestUser()
  const { mutateAsync: addLangugeAsync, isLoading } = useAddUserLanguage()

  const [isSaveDisabled, setSaveDisabled] = useState(true)
  const [isDirtyLanguageForm, setIsDirtyLanguageForm] = useState(false)
  const [leveledLanguage, setLeveledLanguage] = useState<UserLanguage>({ name: "", level: "Beginner (A1)" })

  const onSaveHandle = async (): Promise<void> => {
    if (isGuest) dispatch({ languages: addUserLanguage(user, leveledLanguage) })
    else await addLangugeAsync(leveledLanguage)
    navigate("/dashboard/languages")
  }

  const setDirtyFlag = (language: string, level: string): void => {
    if (language.length || level.length) setIsDirtyLanguageForm(true)
  }

  const onGetSelectedLanguageHandle = useCallback((language: UserLanguage): void => {
    setSaveDisabled(!(language.name && language.level))
    setLeveledLanguage(language)
  }, [])

  useBeforeUnload(isDirtyLanguageForm)
  useUnsaved(isDirtyLanguageForm)

  return (
    <div className="w-full p-3">
      <div className="flex flex-nowrap justify-between gap-6">
        <LanguageSelectionForm
          onGetSelectedLanguage={onGetSelectedLanguageHandle}
          isLoading={isLoading}
          setDirtyFlag={setDirtyFlag}
        />
      </div>
      <div className="saveBtnWrapper">
        <Button disabled={isSaveDisabled} onClick={onSaveHandle} isLoading={isLoading}>
          {ButtonStep.Save}
        </Button>
      </div>
    </div>
  )
}

export default memo(LanguageSelection)
