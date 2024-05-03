import { memo } from "react"
import { CloudArrowUpIcon as CloudUploadIcon, XCircleIcon as CancelRoundedIcon } from "@heroicons/react/24/solid"

import { Button } from "@mbicycle/foundation-ui-kit"

import type { ExtendedFileType } from "./model/types"

interface ThumbsProps {
  files: ExtendedFileType[]
  onDropFiles: VoidFunction
  onUploadNewAvatar: VoidFunction
  onOpenModal: VoidFunction
}

const Thumbs: React.FC<ThumbsProps> = function (props): JSX.Element {
  const { files, onDropFiles, onOpenModal, onUploadNewAvatar } = props

  const onDeleteImageHandle = (event: React.MouseEvent): void => {
    event.stopPropagation()
    onDropFiles()
  }

  const onUploadNewAvatarHandle = (event: React.MouseEvent): void => {
    event.stopPropagation()
    onUploadNewAvatar()
  }

  return (
    <>
      {files.map((file) => (
        <div className="ml-6 mr-3 box-border inline-flex size-[60px] rounded-full border p-1" key={file.name}>
          <div className="relative flex min-w-0 text-center">
            <Button className="absolute ml-9 mt-[-4]" size="small" onClick={onDeleteImageHandle}>
              <CancelRoundedIcon className="size-8 text-red-600" />
            </Button>
            <Button className="ml-8 mt-9" size="small" onClick={onUploadNewAvatarHandle}>
              <CloudUploadIcon className="text-blue-500" />
            </Button>
            <button type="button" aria-label="user menu" onClick={onOpenModal}>
              <img
                className="avatarImage w-full cursor-pointer"
                alt={file.name}
                src={file.preview}
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default memo(Thumbs)
