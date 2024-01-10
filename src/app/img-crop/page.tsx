'use client'

import ImageUpload from '@/components/ImageUpload'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { BsAspectRatio } from 'react-icons/bs'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import ReactCrop, {
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import CanvasToImageString, { centerAspectCrop } from './utils'

//----------------------------------------------

export default function ImgCrop() {
  const [imageInput, setImageInput] = useState<string>('')
  const [cropImage, setCropImage] = useState<string>('')
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [crop, setCrop] = useState<Crop>()
  const [scale, setScale] = useState<number>(1)
  const [rotate, setRotate] = useState<number>(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setCropInputs({
  //     ...cropInputs,
  //     [name]: parseInt(value, 10),
  //   })
  // }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  const doneCropHandler = async () => {
    const imgString = await CanvasToImageString({
      imgRef,
      previewCanvasRef,
      completedCrop,
    })
    // console.log(imgString)
    setCropImage(imgString)
    onOpen()
  }

  const downloadHandler = () => {
    const link = document.createElement('a')
    link.href = cropImage

    link.setAttribute('download', 'crop_image.png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className='w-full bg-white pb-10'>
      <div className='w-full bg-white max-w-[870px] mx-auto min-h-[300px] py-3 mb-12'>
        <div
          style={{
            height: imageInput ? 0 : 300,
            overflow: imageInput ? 'hidden' : 'auto',
            opacity: imageInput ? 0 : 100,
          }}
          className='transition-all duration-500 mt-[70px] w-full'
        >
          {!imageInput && (
            <ImageUpload
              getFileInfo={({ imgString }) => {
                setImageInput(imgString)
              }}
            />
          )}
        </div>

        <div
          style={{
            height: imageInput ? 'auto' : 0,
            overflow: imageInput ? 'auto' : 'hidden',
            opacity: imageInput ? 100 : 0,
          }}
          className='w-full rounded-[10px] p-6 bg-gray-200'
        >
          <h1 className='text-2xl font-semibold text-gray-600 mb-6'>
            Crop Image
          </h1>
          <div className='w-full flex justify-between'>
            <div className='w-[65%] h-[560px] relative rounded-[10px] overflow-hidden'>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                minHeight={100}
              >
                {/* eslint-disable-next-line @next/next/no-img-element  */}
                <img
                  ref={imgRef}
                  alt='Crop me'
                  src={imageInput}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>
            <div className='w-[30%] p-6 bg-white rounded-[10px]'>
              <div className='min-w-[200px] overflow-hidden'>
                {!!completedCrop && (
                  <canvas
                    className='w-full h-full'
                    ref={previewCanvasRef}
                    style={{
                      // border: '1px solid black',
                      objectFit: 'contain',
                      // width: completedCrop.width,
                      // height: completedCrop.height,
                    }}
                  />
                )}
              </div>
              <div className='w-full mb-4 mt-8'>
                <Button
                  onClick={handleToggleAspectClick}
                  endContent={<BsAspectRatio className='w-6 h-6' />}
                  className='w-full mb-3'
                  variant='flat'
                  color='primary'
                >
                  Toggle Aspect
                </Button>
              </div>
              <div>
                <Input
                  className='h-10 outline-none mb-4 active:border-transparent'
                  type='number'
                  min={1}
                  max={100}
                  variant='flat'
                  label='Scale'
                  value={scale.toString()}
                  onChange={(e) => {
                    setScale(Number(e.target.value))
                  }}
                />
                <Input
                  className='h-10 outline-none mb-4 active:border-transparent'
                  type='number'
                  min={0}
                  max={360}
                  variant='flat'
                  label='Rotate'
                  value={rotate.toString()}
                  onChange={(e) => {
                    setRotate(Number(e.target.value))
                  }}
                />
              </div>

              <Button
                onClick={doneCropHandler}
                endContent={
                  <IoCheckmarkDoneCircle className='text-white w-6 h-6' />
                }
                className='w-full bg-gradient-to-tr from-blue-500 to-blue-400 text-white shadow-lg'
                variant='flat'
              >
                Done
              </Button>
            </div>
          </div>
        </div>

        <Modal size='xl' isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className='flex flex-col gap-1'>
              Cropped image
            </ModalHeader>

            <ModalBody>
              <div className='mx-auto relative w-[400px] h-[400px] overflow-hidden'>
                <Image src={cropImage} fill alt='crop image' />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button
                onClick={downloadHandler}
                color='primary'
                onPress={onClose}
              >
                Download
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </main>
  )
}
