import { useCallback, useEffect, useRef, useState } from "react"
import type { DropzoneState, FileRejection } from "react-dropzone"
import { useDropzone } from "react-dropzone"
import type { Crop, PixelCrop } from "react-image-crop"
import { canvasPreview } from "fields/personal-information/image-crop/canvasPreview"
import { useDebounceEffect } from "fields/personal-information/image-crop/useDebounceEffect"
import { useUpdateMsAvatar } from "fields/personal-information/lib/query-hooks"

import SnackBarUtils from "common/components/SnackBar/SnackBarUtils"
import { useGuestToken } from "common/context/guest-token"
import { useGuestUser } from "common/context/guest-user"
import { useGetUserPhotoDB } from "common/services/user-service/query-hooks"

import { compressImageToLimit, MS4MbLimitation } from "./helpers"
import type { ExtendedFileType } from "./types"

type UseFileUploadReturnType = Pick<DropzoneState, "getRootProps" | "getInputProps"> & {
  files: ExtendedFileType[]
  isUploading: boolean
  previewCropCanvasRef: React.RefObject<HTMLCanvasElement>
  imgCropRef: React.RefObject<HTMLImageElement>
  completedCrop: PixelCrop | undefined
  crop: Crop | undefined
  imgSrc: string
  acceptedFilesFrom: File[]
  onUploadNewAvatar: VoidFunction
  onResetFilesHandle: VoidFunction
  onSetCompletedCrop: (pixelCrop: PixelCrop) => void
  onSetCrop: (crop: Crop | undefined) => void
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>, acceptedFiles?: File[]) => void
  onSetFileToUpload: CallableFunction
  onSetFiles: CallableFunction
}

export const useFileUpload = (): UseFileUploadReturnType => {
  const mutation = useUpdateMsAvatar()
  const { refetch: refetchAvatar } = useGetUserPhotoDB()
  const { state } = useGuestToken()
  const { dispatch } = useGuestUser()

  const [files, setFiles] = useState<ExtendedFileType[]>([])
  const [fileToUpload, setFileToUpload] = useState<File | undefined>()
  const [imgSrc, setImgSrc] = useState("")
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | undefined>()
  const [crop, setCrop] = useState<Crop | undefined>()

  const previewCropCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const imgCropRef = useRef<HTMLImageElement | null>(null)

  const {
    getRootProps,
    getInputProps,
    acceptedFiles: acceptedFilesFrom,
  } = useDropzone({
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onDrop: async (acceptedFiles: File[]) => {
      setFileToUpload(acceptedFiles[0])

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
    maxSize: MS4MbLimitation,
    onDropRejected: (fileRejections: FileRejection[]) =>
      fileRejections.forEach((fileRejection) =>
        fileRejection.errors.forEach((error) => {
          SnackBarUtils.warning(error.message)
        }),
      ),
  })

  const onUploadNewAvatar = useCallback(async (): Promise<void> => {
    if (fileToUpload) {
      compressImageToLimit(fileToUpload, async (compressed) => {
        try {
          if (state.isGuest) {
            dispatch({ avatar: compressed })
            setFiles([])
          } else {
            await mutation.mutateAsync(compressed as File)
            await refetchAvatar()
          }
        } catch (error) {
          SnackBarUtils.error(`${(error as Error).message}. Too large photo. Please comress it.`)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fileToUpload, mutation, state.isGuest])

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  const onResetFilesHandle = useCallback((): void => {
    setFiles([])
  }, [])

  const onSelectFile = useCallback((e?: React.ChangeEvent<HTMLInputElement>, acceptedFiles?: File[]) => {
    const reader = new FileReader()
    setCrop(undefined) // Makes crop preview update between images.
    reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""))

    if (e?.target.files?.length) {
      reader.readAsDataURL(e.target.files[0])
    } else if (acceptedFiles?.length) {
      reader.readAsDataURL(acceptedFiles[0])
    }
  }, [])

  useEffect(() => {
    if (acceptedFilesFrom) {
      onSelectFile(undefined, acceptedFilesFrom)
    }
  }, [acceptedFilesFrom, onSelectFile])

  useEffect(() => {
    if (mutation.isSuccess) {
      setFiles([])
    }
  }, [mutation.isSuccess])

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgCropRef.current && previewCropCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgCropRef.current,
          previewCropCanvasRef.current,
          completedCrop,
          1, // scale
          0, // rotate
        )
      }
    },
    100,
    [completedCrop],
  )

  return {
    isUploading: mutation.isLoading,
    files,
    previewCropCanvasRef,
    imgCropRef,
    completedCrop,
    crop,
    imgSrc,
    acceptedFilesFrom,
    getRootProps,
    getInputProps,
    onResetFilesHandle,
    onUploadNewAvatar,
    onSetCompletedCrop: setCompletedCrop,
    onSetCrop: setCrop,
    onSelectFile,
    onSetFileToUpload: setFileToUpload,
    onSetFiles: setFiles,
  }
}
