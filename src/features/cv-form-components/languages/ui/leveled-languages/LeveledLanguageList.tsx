import { memo, useMemo } from "react"

import { useDeleteUserLanguage } from "features/cv-form-components/languages/api/query-hooks"
import { deleteUserLanguage } from "features/cv-form-components/languages/lib/functions"
import EnglishLanguageItem from "features/cv-form-components/languages/ui/EnglishLanguageItem"

import type { UserLanguage } from "entities/user/model"

import { useGuestToken } from "shared/context/guest-token"
import { useGuestUser } from "shared/context/guest-user"

import LeveledLanguageItem from "./LeveledLanguageItem"

const LeveledLanguageList = function ({ languages }: { languages: UserLanguage[] }): JSX.Element {
  const { state: tokenState } = useGuestToken()
  const { dispatch } = useGuestUser()
  const { mutateAsync: deleteBy, isLoading } = useDeleteUserLanguage()

  const deleteHandle = async (language: string): Promise<void> => {
    if (tokenState.isGuest) {
      dispatch({ languages: deleteUserLanguage(languages, language) })
    } else {
      await deleteBy(language)
    }
  }

  const filteredLanguages = useMemo(() => languages.filter((language) => language.name !== "English"), [languages])
  const englishLanguage = languages.find((language) => language.name === "English")

  return (
    <div className="listWrapper">
      <EnglishLanguageItem level={englishLanguage?.level} />
      {filteredLanguages.map(({ name, level }) => (
        <LeveledLanguageItem key={name} language={name} level={level} onDelete={deleteHandle} isDeleting={isLoading} />
      ))}
    </div>
  )
}

export default memo(LeveledLanguageList)
