import { memo, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { UserLanguage } from "entities/user/model"
import { useAddUserLanguage } from "fields/languages/lib/query-hooks"
import { addUserLanguage } from "fields/languages/utils/functions"
import useBeforeUnload from "shared/utils/hooks/useBeforeUnload"
import useUnsaved from "shared/utils/hooks/useUnSaved"

import { Button } from "@mbicycle/foundation-ui-kit"

import { useCategoryLanguageContext } from "containers/main-page/cv-form/local-state/hooks"
import { ButtonStep } from "containers/main-page/cv-form/utils/constants"
import { useGuestToken } from "common/context/guest-token"
import { useGuestUser } from "common/context/guest-user"

import LanguageSelectionForm from "./LanguageSelectionForm"

const EditLanguageCategory = function (): JSX.Element {
  const navigate = useNavigate()
  const {
    state: { isGuest },
  } = useGuestToken()
  const { state: user, dispatch } = useGuestUser()
  const { state: languageValue } = useCategoryLanguageContext()
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
    const isEqual = language === languageValue.language && level === languageValue.level
    if (!(isDirtyLanguageForm || isEqual)) setIsDirtyLanguageForm(true)
  }

  const onGetSelectedLanguageHandle = (language: UserLanguage): void => {
    setSaveDisabled(!(language.name && language.level))
    setLeveledLanguage(language)
  }

  useBeforeUnload(isDirtyLanguageForm)
  useUnsaved(isDirtyLanguageForm)

  return (
    <div className="h-full w-full">
      <div className="flex flex-nowrap justify-between gap-6">
        <LanguageSelectionForm
          onGetSelectedLanguage={onGetSelectedLanguageHandle}
          isLoading={isLoading}
          defaultValue={languageValue}
          setDirtyFlag={setDirtyFlag}
        />
      </div>
      <div className="inline-flex w-full justify-end pt-4">
        <Button disabled={isSaveDisabled} onClick={onSaveHandle} variant="outline" isLoading={isLoading}>
          {ButtonStep.Save}
        </Button>
      </div>
    </div>
  )
}

export default memo(EditLanguageCategory)
