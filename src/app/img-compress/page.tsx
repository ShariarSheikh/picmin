'use client'

import ImageUpload from '@/components/ImageUpload'
import { useCompressImageMutation } from '@/redux/services/imageApi'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaDownload, FaFileImage } from 'react-icons/fa'
import base64ToImageFile from '../utils/base64ToImageFile'
import formatFileSize from '../utils/formatFileSize'

//----------------------------------------------
interface ImageInputProps {
  imgSrc: string
  fileName: string
  fileSize: number
}
//----------------------------------------------
export default function ImgCompress() {
  const [imgCompress, imgCompressApi] = useCompressImageMutation()
  const [compressImgSize, setCompressImgSize] = useState<number>(0)
  const [imageInput, setImageInput] = useState<ImageInputProps>({
    imgSrc: '',
    fileName: '',
    fileSize: NaN,
  })

  const removeImg = () => {
    setImageInput({
      imgSrc: '',
      fileName: '',
      fileSize: NaN,
    })
    imgCompressApi.reset()
  }

  const onSubmitHandler = async () => {
    if (!imageInput.imgSrc) return

    const imgFile = base64ToImageFile(imageInput.imgSrc)
    const formData = new FormData()
    formData.append('imgData', imgFile)
    imgCompress({ imgData: formData })
  }

  const onDownloadHandler = () => {
    if (!imgCompressApi.data?.data.image)
      return alert("Image doesn't exit compress again")
    const link = document.createElement('a')
    link.href = imgCompressApi.data?.data.image // Assuming base64Image is the base64-encoded image data
    link.download = `picmin-${imageInput.fileName}` // Specify the desired filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    if (imgCompressApi.isLoading || !imgCompressApi.isSuccess) return

    const imgBase64 = imgCompressApi.data.data.image
    const imgFile = base64ToImageFile(imgBase64)
    setCompressImgSize(imgFile.size)
  }, [imgCompressApi])

  return (
    <main className='w-full bg-white pb-10'>
      <div className='w-full bg-white max-w-[870px] mx-auto min-h-[300px] px-5 py-3 mb-12'>
        <div
          style={{
            height: imageInput.imgSrc ? 0 : 300,
            overflow: imageInput.imgSrc ? 'hidden' : 'auto',
            opacity: imageInput.imgSrc ? 0 : 100,
          }}
          className='transition-all duration-500 mt-[70px] w-full'
        >
          {!imageInput.imgSrc && (
            <ImageUpload
              getFileInfo={({ fileName, fileSize, imgString }) => {
                setImageInput((prevS) => ({
                  ...prevS,
                  fileName: fileName,
                  fileSize: fileSize,
                  imgSrc: imgString,
                }))
              }}
            />
          )}
        </div>

        <div
          style={{
            height: imageInput.imgSrc ? 'auto' : 0,
            overflow: imageInput.imgSrc ? 'auto' : 'hidden',
            opacity: imageInput.imgSrc ? 100 : 0,
          }}
          className='w-full rounded-[10px] p-6 bg-[#F5F5FA]'
        >
          <div className='w-full flex items-center justify-between'>
            <h1 className='text-lg lg:text-2xl font-semibold text-gray-600 mb-6'>
              Compress Image Size
            </h1>
            <Button
              color='danger'
              variant='flat'
              size='sm'
              className='mb-2'
              onClick={removeImg}
            >
              Close
            </Button>
          </div>

          <div className='flex flex-col lg:flex-row items-center justify-center lg:space-x-8 lg:p-4'>
            <div className='w-full p-3 rounded-md bg-white'>
              <div className='py-1'>
                <p className='line-clamp-1'>FileName: {imageInput.fileName}</p>
                <p>FileSize: {formatFileSize(imageInput.fileSize)}</p>
              </div>
              <div className='w-full lg:w-[300px] min-h-[220px] lg:h-[350px] relative'>
                <Image fill src={imageInput.imgSrc} alt='input image' />
              </div>
              <p className='text-center mt-2'>Current Image</p>
            </div>

            <div>
              {imgCompressApi.isSuccess ? (
                <div className='w-full p-3 flex flex-col lg:flex-row items-center lg:space-x-5'>
                  <span>VS</span>
                  <div className='w-full max-w-[235px] p-3 rounded-md bg-white'>
                    <div className='py-1'>
                      <p className='line-clamp-1'>
                        FileName: {imageInput.fileName}
                      </p>
                      <p>FileSize: {formatFileSize(compressImgSize)}</p>
                    </div>
                    <div className='w-full lg:w-[300px] min-h-[220px] lg:h-[350px] relative'>
                      <Image
                        fill
                        src={imgCompressApi.data.data.image}
                        alt='input image'
                      />
                    </div>
                    <p className='text-center mt-2'>Cropped Image</p>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={onSubmitHandler}
                  isLoading={imgCompressApi.isLoading}
                  startContent={<FaFileImage />}
                  color='primary'
                  className='h-12 w-full lg:w-[300px] text-2xl mt-6 lg:mt-0'
                >
                  Compress Image
                </Button>
              )}
            </div>
          </div>
          {imgCompressApi.isSuccess && (
            <Button
              onClick={onDownloadHandler}
              startContent={<FaDownload />}
              color='primary'
              className='h-12 w-full text-2xl mt-4'
            >
              Download
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
