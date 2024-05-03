import React, { memo, useCallback, useEffect } from "react"
import type { PercentCrop, PixelCrop } from "react-image-crop"
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop"

import { Button } from "@mbicycle/foundation-ui-kit"

import { useUserPhoto } from "shared/api/user-service/hooks/useUserPhoto"
import { debounce } from "shared/lib/helpers/debounce"

import { blobToCanvas, compressImageToLimit, toBlob } from "./lib/helpers"
import { useFileUpload } from "./lib/hooks"
import { Text } from "./model/types"

import "react-image-crop/dist/ReactCrop.css"

interface AvatarModalContentProps {
  setFiles: CallableFunction
  setFileToUpload: CallableFunction
  onToggleModal: CallableFunction
}

const AvatarModalContent: React.FC<AvatarModalContentProps> = function (props) {
  const { photo } = useUserPhoto()
  const {
    previewCropCanvasRef,
    imgCropRef,
    getRootProps,
    getInputProps,
    completedCrop,
    crop,
    onSetCompletedCrop,
    onSetCrop,
    imgSrc,
    onSelectFile,
  } = useFileUpload()

  const { setFiles, setFileToUpload, onToggleModal } = props

  // This is to demonstate how to make and center a % aspect crop
  // which is a bit trickier so we use some helper functions.
  function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): PercentCrop {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  const toggleModalHandle = useCallback(() => {
    onToggleModal((val: boolean) => !val)
  }, [onToggleModal])

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>): void {
    const { width, height } = e.currentTarget
    onSetCrop(centerAspectCrop(width, height, 16 / 16))
  }

  const setCompletedCropHandle = (pixelCrop: PixelCrop): void => {
    onSetCompletedCrop(pixelCrop)
  }

  const onPreparePhotoToChange = useCallback(async () => {
    if (previewCropCanvasRef.current) {
      const blob = await toBlob(previewCropCanvasRef.current)
      const fileFromBlob = new File([blob ?? ({} as Blob)], new Date().toISOString(), {
        type: blob?.type,
      })

      setFiles([
        Object.assign(fileFromBlob, {
          preview: URL.createObjectURL(fileFromBlob),
        }),
      ])
      setFileToUpload(fileFromBlob)
    }
    toggleModalHandle()
  }, [previewCropCanvasRef, setFileToUpload, setFiles, toggleModalHandle])

  const changeQualityHandle = debounce(async (): Promise<void> => {
    if (previewCropCanvasRef?.current) {
      const blob = await toBlob(previewCropCanvasRef.current)
      const fileFromBlob = new File([blob ?? ({} as Blob)], new Date().toISOString(), {
        type: blob?.type,
      })

      compressImageToLimit(fileFromBlob, (compressed) => {
        blobToCanvas(previewCropCanvasRef.current, compressed)
      })
    }
  }, 250)

  useEffect(() => () => changeQualityHandle.cancel(), [changeQualityHandle])

  function renderReactCrop(): JSX.Element | null {
    if (!imgSrc) return null

    return (
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => onSetCrop(percentCrop)}
        onComplete={setCompletedCropHandle}
        aspect={16 / 16}
      >
        <img
          ref={imgCropRef}
          alt="Crop me"
          src={imgSrc}
          onLoad={onImageLoad}
          style={{
            maxHeight: 260,
          }}
        />
      </ReactCrop>
    )
  }

  function renderPreviewCrop(): JSX.Element | null {
    if (!completedCrop) return null

    return (
      <div className="ml-6 flex flex-col items-center">
        <canvas
          className="size-[240px] rounded-full border object-contain"
          onChange={changeQualityHandle.handleChange}
          ref={previewCropCanvasRef}
        />
      </div>
    )
  }

  return (
    <div
      className="absolute left-1/2 top-1/2 min-w-[600px] max-w-[1200px]
     -translate-x-1/2 -translate-y-1/2 transform bg-white p-8"
    >
      <div {...getRootProps({ className: "dropzone" })} className="mb-4">
        <div className="flex items-center justify-center rounded-lg border border-dashed px-5 py-16">
          <h5 className="text-gray-500">{photo ? Text.UpdatePhoto : Text.FileUpload}</h5>
          &nbsp;
          <h5 className="cursor-pointer text-blue-500 hover:underline">{Text.UploadOne}</h5>
        </div>
      </div>
      <div className="App">
        <div className="Crop-Controls">
          <input {...getInputProps()} onChange={onSelectFile} />
        </div>
        <div className="flex items-center">
          {renderReactCrop()}
          {renderPreviewCrop()}
        </div>
        <Button variant="transparent" onClick={onPreparePhotoToChange} className="mt-6">
          {Text.AddPhoto}
        </Button>
      </div>
    </div>
  )
}

export default memo(AvatarModalContent)
