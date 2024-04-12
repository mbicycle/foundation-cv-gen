import { memo } from "react"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"

import type { Step } from "./constants"

interface TitleProps {
  name: `${Step}`
  onReturn: VoidFunction
}

const Title = function ({ name, onReturn }: TitleProps): JSX.Element {
  const onBackHandle = (): void => {
    onReturn()
  }

  return (
    <div className="mb-4 flex w-full items-center justify-start">
      <button type="button" aria-label="go back" onClick={onBackHandle} className="mr-1">
        <ChevronLeftIcon className="text-blue-500" />
      </button>
      <p className="text-base">{name}</p>
    </div>
  )
}

export default memo(Title)
