import { memo, useState } from "react"
import { useUserPhoto } from "shared/api/user-service/hooks/useUserPhoto"
import ChangeCircleIcon from "shared/ui/icons/ChangeCircleIcon"
import ChangeCircleOutlinedIcon from "shared/ui/icons/ChangeCircleOutlineIcon"
import PersonIcon from "shared/ui/icons/PersonIcon"

import { Button, Modal } from "@mbicycle/foundation-ui-kit"

import { useGuestToken } from "common/context/guest-token"
import { useToggleSensitiveData } from "common/context/toggle-sensetive-data"

import { useFileUpload } from "./utils/hooks"
import { Text } from "./utils/types"
import AvatarModalContent from "./AvatarModalContent"
import Thumbs from "./Thumbs"

import "react-image-crop/dist/ReactCrop.css"

const FileUpload = function (): JSX.Element {
  const {
    state: { checked: hiddenSensitiveData },
  } = useToggleSensitiveData()
  const {
    state: { isGuest },
  } = useGuestToken()
  const { photo } = useUserPhoto()
  const {
    isUploading,
    onUploadNewAvatar,
    onSetFileToUpload,
    files,
    onResetFilesHandle,
    onSetFiles: setFiles,
  } = useFileUpload()

  const [isOpen, setOpen] = useState(false)

  const closeHandle = (): void => {
    setOpen(false)
  }
  const openHandle = (): void => {
    setOpen(true)
  }

  function renderModal(): JSX.Element {
    return (
      <Modal open={isOpen} onClose={closeHandle}>
        <AvatarModalContent setFileToUpload={onSetFileToUpload} setFiles={setFiles} onToggleModal={closeHandle} />
      </Modal>
    )
  }

  function renderUserImage(): JSX.Element {
    if (!photo || hiddenSensitiveData) return <PersonIcon className="avatarImage size-[60px]" />

    return <img className="avatarImage size-[60px]" referrerPolicy="no-referrer" alt="user-avatar" src={photo} />
  }

  function renderChangeCircleIcon(): JSX.Element {
    if (!files[0]) {
      return (
        <Button onClick={openHandle} size="small" variant="outline" disabled={isGuest}>
          <ChangeCircleOutlinedIcon className={`size-6 ${isGuest ? "text-gray-500" : "text-blue-500"}`} />
          &nbsp;
          <p className="link">{Text.Change}</p>
        </Button>
      )
    }

    return (
      <div className="ml-6">
        <ChangeCircleIcon className={`size-6 text-gray-500 ${isUploading && "animate-spin"}`} />
      </div>
    )
  }

  return (
    <div className="flex flex-row flex-nowrap gap-0 lg:gap-[-4px]">
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-full items-center justify-between break-words rounded-lg border p-2 lg:w-1/2">
          {renderUserImage()}
          {renderChangeCircleIcon()}
          <aside className="flex flex-row flex-wrap">
            <Thumbs
              files={files}
              onDropFiles={onResetFilesHandle}
              onUploadNewAvatar={onUploadNewAvatar}
              onOpenModal={openHandle}
            />
          </aside>
          {renderModal()}
        </div>
      </div>
    </div>
  )
}

export default memo(FileUpload)
