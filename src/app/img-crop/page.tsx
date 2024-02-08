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
import { ChangeEvent, useRef, useState } from 'react'
import { Cropper, CropperRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { BsAspectRatio } from 'react-icons/bs'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { useDebouncedCallback } from 'use-debounce'

//----------------------------------------------

export default function ImgCrop() {
  const [imageInput, setImageInput] = useState<string>('')
  const [cropImage, setCropImage] = useState<string>('')
  const [coordinates, setCoordinates] = useState({
    height: 0,
    width: 0,
    top: 0,
    left: 0,
  })
  const [isAspect, setIsAspect] = useState<boolean>(false)
  const [cropper, setCropper] = useState<CropperRef>()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cropperRef = useRef<CropperRef>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCoordinates({
      ...coordinates,
      [name]: parseInt(value, 10),
    })

    if (!cropperRef?.current) return

    cropperRef.current.setCoordinates({
      [name]: value,
    })
  }

  const handleToggleAspectClick = () => {
    setIsAspect(!isAspect)
    setCoordinates(cropper?.getCoordinates() as typeof coordinates)
  }
  const removeImgStateHandler = () => {
    setImageInput('')
    cropperRef?.current?.reset()
  }

  const doneCropHandler = async () => {
    setCropImage(cropper?.getCanvas()?.toDataURL() ?? '')
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

  // const downloadHandler = async () => {
  //   const canvas = document.createElement('canvas')
  //   const ctx = canvas.getContext('2d')

  //   const originalImage = new window.Image() // Alias the HTML Image constructor

  //   // Set the canvas dimensions to the cropped size
  //   canvas.width = coordinates.width
  //   canvas.height = coordinates.height

  //   // Set the original image source
  //   originalImage.src = cropImage
  //   console.log(cropper?.getImage())

  //   // Wait for the image to load before drawing on the canvas
  //   originalImage.onload = function () {
  //     ctx.drawImage(
  //       originalImage,
  //       0,
  //       0,
  //       originalImage.width,
  //       originalImage.height,
  //     )

  //     // Draw the cropped portion onto the canvas
  //     ctx.drawImage(
  //       canvas,
  //       coordinates.left,
  //       coordinates.top,
  //       coordinates.width,
  //       coordinates.height,
  //       0,
  //       0,
  //       coordinates.width,
  //       coordinates.height,
  //     )
  //   }

  //   // Convert the canvas content to a data URL with compression options
  //   const croppedDataURL = canvas.toDataURL('image/jpg', 1) // Adjust quality as needed

  //   // Create a link and trigger the download
  //   const link = document.createElement('a')
  //   link.href = croppedDataURL
  //   link.setAttribute('download', 'crop_image.jpg') // Use appropriate file extension
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }

  const onChange = useDebouncedCallback((cropper: CropperRef) => {
    setCropper(cropper)
    setCropImage(cropper?.getCanvas()?.toDataURL() || '')
    setCoordinates(cropper.getCoordinates() as typeof coordinates)
  }, 500)

  return (
    <main className='w-full bg-white pb-10'>
      <div className='w-full bg-white max-w-[870px] px-5 mx-auto min-h-[300px] py-3 mb-12'>
        <div
          style={{
            height: imageInput ? 0 : 300,
            overflow: imageInput ? 'hidden' : 'auto',
            opacity: imageInput ? 0 : 100,
          }}
          className='transition-all duration-500 mt-[30px] lg:mt-[70px] w-full'
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
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-semibold text-gray-600'>Crop Image</h1>

            <Button
              color='danger'
              onClick={removeImgStateHandler}
              variant='flat'
              size='sm'
            >
              Close
            </Button>
          </div>

          <div className='w-full flex flex-col lg:flex-row lg:justify-between'>
            <div className='w-full lg:w-[65%] min-h-[130px] max-h-[255px] lg:max-h-[auto] lg:h-[560px] mb-6 lg:mb-0 relative rounded-[10px]'>
              <Cropper
                ref={cropperRef}
                src={imageInput}
                stencilProps={isAspect ? { aspectRatio: 1 / 2 } : undefined}
                onChange={onChange}
                className={'cropper'}
              />
            </div>
            <div className='w-full lg:w-[30%] p-6 bg-white rounded-[10px]'>
              <div className='relative w-[200px] h-[200px] overflow-hidden'>
                <Image
                  fill
                  src={cropImage ?? ''}
                  alt='preview'
                  className='w-full h-full object-contain'
                />
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
              <div className='flex space-x-4 items-start mb-4'>
                <Input
                  className='h-10 outline-none active:border-transparent'
                  type='number'
                  min={0}
                  variant='underlined'
                  label='Height'
                  name='height'
                  value={coordinates?.height?.toString()}
                  onChange={handleInputChange}
                />
                <Input
                  className='h-10 outline-none active:border-transparent'
                  type='number'
                  min={0}
                  variant='underlined'
                  label='Width'
                  name='width'
                  value={coordinates?.width?.toString()}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex space-x-4 items-start mb-4'>
                <Input
                  className='h-10 outline-none active:border-transparent'
                  type='number'
                  min={0}
                  variant='underlined'
                  label='Position X'
                  name='left'
                  value={coordinates?.left?.toString()}
                  onChange={handleInputChange}
                />
                <Input
                  className='h-10 outline-none active:border-transparent'
                  type='number'
                  min={0}
                  variant='underlined'
                  label='Position Y'
                  name='top'
                  value={coordinates?.top?.toString()}
                  onChange={handleInputChange}
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
