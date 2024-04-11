import type { CSSProperties } from "react"
import { memo } from "react"

import CircularSpinner from "common/components/circular-spinner/circular-spinner"
import DragIndicatorIcon from "common/icons/DragIndicatorIcon"
import GarbageIcon from "common/icons/GarbageIcon"

type T = React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLSpanElement>

interface ProfiencyItemProps {
  headText: string
  onDelete: (id?: string) => void
  bodyText?: string
  isLoading?: boolean
  isDraggable?: boolean
  disabled?: boolean
  onClick?: () => void
  border?: CSSProperties
  link?: string
  linkText?: string
}

const ProfiencyItem = function ({
  headText,
  bodyText,
  onDelete,
  onClick,
  isLoading,
  border,
  disabled,
  isDraggable,
  link,
  linkText = "Go to certificate...",
}: ProfiencyItemProps): JSX.Element {
  const setIdHandle = (): void => {
    if (onClick) {
      onClick()
    }
  }

  const onDeleteEntryHandle = (): void => {
    onDelete()
  }

  function renderIcons(): JSX.Element {
    if (isLoading) {
      return <CircularSpinner size="small" />
    }
    return <GarbageIcon className="size-5 text-blue-500" />
  }

  function linkCer(event: React.MouseEvent<HTMLLinkElement>): void {
    event.stopPropagation()
  }

  return (
    <div
      className={`mb-2 inline-flex w-full items-center rounded-lg border p-2
       ${disabled && "pointer-events-none opacity-50"}`}
      style={border}
    >
      {isDraggable && <DragIndicatorIcon className="size-8 text-gray-500" />}
      <button type="button" className="w-full cursor-pointer text-left" onClick={setIdHandle}>
        <div className="pl-4">
          <p>{headText}</p>
          <p className="text-gray-500">{bodyText}</p>
          {link && (
            <a href={link} className="link" target="_blank" rel="noreferrer" onClick={linkCer as T}>
              {linkText}
            </a>
          )}
        </div>
      </button>
      <button type="button" className="deleteBtn" onClick={onDeleteEntryHandle}>
        {renderIcons()}
      </button>
    </div>
  )
}

export default memo(ProfiencyItem)
