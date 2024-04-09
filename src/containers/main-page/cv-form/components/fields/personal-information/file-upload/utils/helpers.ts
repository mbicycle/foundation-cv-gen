import Compressor from "compressorjs"

export const MS4MbLimitation = 4e6 as const

export function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve)
  })
}

export const blobToCanvas = (canvas: HTMLCanvasElement | null, compressedResult: File | Blob): void => {
  if (canvas) {
    createImageBitmap(compressedResult).then((imageBitmap) => {
      canvas?.getContext("2d")?.drawImage(imageBitmap, 0, 0)
    })
  }
}

export const compressImageToLimit = (file: File | Blob, callback: (compressed: File | Blob) => void): void => {
  // eslint-disable-next-line no-new
  new Compressor(file, {
    convertSize: MS4MbLimitation,
    success: async (compressedResult) => {
      callback(compressedResult)
    },
  })
}
