import { memo } from "react"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"

import { Button } from "@mbicycle/foundation-ui-kit"

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
    <div className="mb-4 w-full">
      <Button
        type="button"
        aria-label="go back"
        onClick={onBackHandle}
        classNameIcon="size-4 text-blue-500"
        icon={ChevronLeftIcon}
        variant="empty"
      >
        <span className="text-base">{name}</span>
      </Button>
    </div>
  )
}

export default memo(Title)
