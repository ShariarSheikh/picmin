import { RefObject } from 'react'
import { PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import blobToBase64 from '../utils/blobToBase64'

interface downloadBlobProps {
  blob: Blob
  fileName: string
}

export function downloadBlob(props: downloadBlobProps) {
  const { blob, fileName } = props

  const url = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

interface CanvasToImageStringProps {
  imgRef: RefObject<HTMLImageElement>
  previewCanvasRef: RefObject<HTMLCanvasElement>
  completedCrop: PixelCrop | undefined
}

export default async function CanvasToImageString(
  props: CanvasToImageStringProps,
): Promise<string> {
  const { imgRef, previewCanvasRef, completedCrop } = props

  const image = imgRef.current
  const previewCanvas = previewCanvasRef.current

  if (!image || !previewCanvas || !completedCrop) {
    return Promise.reject(new Error('Crop canvas does not exist'))
  }

  // Size relative to the uploaded image
  // If you want to size according to the screen, remove scaleX + scaleY
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const offscreen = new OffscreenCanvas(
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
  )
  const ctx = offscreen.getContext('2d')

  if (!ctx) {
    return Promise.reject(new Error('No 2d context'))
  }

  ctx.drawImage(
    previewCanvas,
    0,
    0,
    previewCanvas.width,
    previewCanvas.height,
    0,
    0,
    offscreen.width,
    offscreen.height,
  )

  // You might want { type: "image/jpeg", quality: <0 to 1> } to
  // reduce image size
  const blobImg = await offscreen.convertToBlob({
    type: 'image/png',
  })

  return new Promise((resolve, reject) => {
    blobToBase64(blobImg, (base64String) => {
      if (base64String) {
        resolve(base64String)
      } else {
        reject(new Error('Failed to convert Blob to base64.'))
      }
    })
  })
}

export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
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
