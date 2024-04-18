import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { EnglishLanguageButton } from "fields/languages/components/utils/constants"

import { Button } from "@mbicycle/foundation-ui-kit"

import { useCategoryLanguageContext } from "containers/main-page/cv-form/local-state/hooks"

interface EnglishLanguageItemProps {
  level?: string
}

const EnglishLanguageItem: React.FC<EnglishLanguageItemProps> = function ({ level = "" }): JSX.Element {
  const navigate = useNavigate()
  const { dispatch: dispatchCategoryName } = useCategoryLanguageContext()

  const openHandle = (): void => {
    dispatchCategoryName({ type: "set", language: "English", level })
    navigate("edit")
  }

  return (
    <div className="mb-2 inline-flex w-full items-center rounded-lg border p-2">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="w-full cursor-pointer" onClick={openHandle}>
        <div className="pl-4">
          <p>English</p>
          <p className="text-gray-500">{level}</p>
        </div>
      </div>
      {!level && (
        <Button variant="outline" onClick={openHandle} className="w-[290px] break-words">
          {EnglishLanguageButton}
        </Button>
      )}
    </div>
  )
}

export default memo(EnglishLanguageItem)
