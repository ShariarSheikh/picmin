import { RefObject } from 'react'
import { PixelCrop } from 'react-image-crop'

interface CanvasToImageStringProps {
  imgRef: RefObject<HTMLImageElement>
  previewCanvasRef: RefObject<HTMLCanvasElement>
  completedCrop: PixelCrop | undefined
}

export default async function CanvasToImageString(
  props: CanvasToImageStringProps,
) {
  const { imgRef, previewCanvasRef, completedCrop } = props

  const image = imgRef.current
  const previewCanvas = previewCanvasRef.current

  if (!image || !previewCanvas || !completedCrop) {
    throw new Error('Crop canvas does not exist')
  }

  // This will size relative to the uploaded image
  // size. If you want to size according to what they
  // are looking at on screen, remove scaleX + scaleY
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const offscreen = new OffscreenCanvas(
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
  )
  const ctx = offscreen.getContext('2d')
  if (!ctx) {
    throw new Error('No 2d context')
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
  const blob = await offscreen.convertToBlob({
    type: 'image/png',
  })

  return blob

  // if (blobUrlRef.current) {
  //   URL.revokeObjectURL(blobUrlRef.current)
  // }
  // blobUrlRef.current = URL.createObjectURL(blob)
  // hiddenAnchorRef.current!.href = blobUrlRef.current
  // hiddenAnchorRef.current!.click()
}
