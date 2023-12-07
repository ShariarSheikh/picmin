'use client'

import iconPng1 from '@/assets/Helix.png'
import iconPng2 from '@/assets/Icosahedron.png'
import iconPng3 from '@/assets/Pyramid1.png'
import { setImgHandler } from '@/redux/features/imgSlice'
import { useAppDispatch } from '@/redux/hooks'
import Image from 'next/image'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import ImageDraggingThumbnail from './ImageDraggingThumbnail'
import Thumbnail from './Thumbnail'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

//-----------------------------------------------

//-----------------------------------------------

const ImageSelection = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      multiple: false,
      maxFiles: 1,

      accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
        'image/avif': ['.avif'],
      },

      onDrop: (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]

        const reader = new FileReader()
        reader.onload = () => {
          dispatch(
            setImgHandler({
              originalImg: reader.result as string,
            }),
          )
          router.push('/edit')
        }
        reader.readAsDataURL(file)
      },
    })

  // PREFETCH EDIT PAGE
  useEffect(() => {
    router.prefetch('/edit')
  }, [])

  const fileRejectionItems = fileRejections.map((_v, i) => {
    return (
      <div
        className='absolute z-40 inset-0 border-[5px] border-dashed border-[#8b0000] w-full h-full bg-white'
        key={i}
      >
        <ul className='w-full h-full flex items-center justify-center'>
          <li className='text-[2vw] text-[#8b0000]'>
            File Type must be: .jpeg, .jpg, .png, .webp, .avif
          </li>
        </ul>
      </div>
    )
  })

  return (
    <div
      style={{
        height: 230,
      }}
      className='relative mb-[3vw] bg-white w-full max-w-5xl mx-auto rounded-[6px] transition-all duration-150'
    >
      <div className='w-full h-full absolute inset-0 z-30'>
        <div
          style={{ border: '5px dashed #eee' }}
          {...(getRootProps() as DropzoneRootProps)}
          className='h-full w-full bg-white'
        >
          <input
            {...(getInputProps() as DropzoneRootProps)}
            className='h-full w-full'
          />
          <Thumbnail />
          {isDragActive && <ImageDraggingThumbnail />}
        </div>

        {fileRejectionItems && fileRejectionItems}
      </div>

      <div className='w-full z-[8] relative transition-all'>
        <Image
          src={iconPng1}
          width={50}
          height={50}
          alt='icon'
          style={{
            top: '30vh',
          }}
          className='home_page_icon1 object-cover absolute left-12'
        />
        <Image
          src={iconPng2}
          width={50}
          height={50}
          alt='icon'
          className='home_page_icon2 object-cover absolute -top-16 left-[48%]'
        />
        <Image
          src={iconPng3}
          width={50}
          height={50}
          alt='icon'
          style={{
            top: '30vh',
          }}
          className='home_page_icon3 object-cover absolute right-12'
        />
      </div>
    </div>
  )
}

export default ImageSelection
