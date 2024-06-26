import { memo, useEffect, useState } from "react"

import { Autocomplete, Select } from "@mbicycle/foundation-ui-kit"

import type { CategoryNameStateLanguage } from "widgets/cv-form/local-state/CategoryIdContext"

import { LANGUAGES as languages } from "features/cv-form-components/languages/api/constants"
import { LANGUAGE, LanguageInputName, LEVEL } from "features/cv-form-components/languages/model/constants"

import type { UserLanguage } from "entities/user/model"

import { LEVELS as levels } from "./model/constants"
import type { Labels } from "./model/level.enum"

interface LanguageSelectionFormProps {
  isLoading: boolean
  onGetSelectedLanguage: (language: UserLanguage) => void
  defaultValue?: CategoryNameStateLanguage
  setDirtyFlag: (language: string, level: string) => void
}

type Levels = keyof typeof Labels

const languagesOptions = languages.map((name) => ({ id: name, name }))
const levelOptions = levels.map(({ name }) => ({ id: name, name }))

const LanguageSelectionForm = function (props: LanguageSelectionFormProps): JSX.Element {
  const { onGetSelectedLanguage, isLoading, defaultValue, setDirtyFlag } = props
  const [language, setLanguage] = useState(defaultValue?.language || "")
  const [level, setLevel] = useState<Levels | "">((defaultValue?.level as Levels) || "")

  useEffect(
    () => {
      if (level) {
        onGetSelectedLanguage({
          name: language,
          level,
        })
      }
      setDirtyFlag(language, level)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, level],
  )

  const handelLevelChange = (value: string | string[]): void => {
    setLevel(value as Levels)
  }

  const handelLanguageChange = (newValue: string | null): void => {
    setLanguage(newValue || "")
  }

  return (
    <div className="flex w-full flex-row items-center justify-between gap-6">
      <div className="w-1/2">
        <div className="w-full pt-1">
          <Autocomplete label={LANGUAGE} value={language} onChange={handelLanguageChange} options={languagesOptions} />
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full pt-1">
          <Select
            options={levelOptions}
            value={level}
            label={LEVEL}
            name={LanguageInputName.Level}
            onChange={handelLevelChange}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
export default memo(LanguageSelectionForm)
