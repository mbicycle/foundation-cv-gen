import { memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { UserLanguage } from "entities/user/model"
import { useAddUserLanguage } from "fields/languages/lib/query-hooks"
import { addUserLanguage } from "fields/languages/utils/functions"
import useBeforeUnload from "shared/utils/hooks/useBeforeUnload"
import useUnsaved from "shared/utils/hooks/useUnSaved"

import { Button } from "@mbicycle/foundation-ui-kit"

import { ButtonStep } from "containers/main-page/cv-form/utils/constants"
import { useGuestToken } from "common/context/guest-token"
import { useGuestUser } from "common/context/guest-user"

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
