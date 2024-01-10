'use client'

import { FC } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import ImageDraggingThumbnail from './ImageDraggingThumbnail'
import Thumbnail from './Thumbnail'

//-----------------------------------------------
interface GetFileInfo {
  imgString: string
  fileName: string
  fileSize: number
}
interface PropsImageUpload {
  getFileInfo?: (props: GetFileInfo) => void
}
//-----------------------------------------------

const ImageUpload: FC<PropsImageUpload> = ({ getFileInfo }) => {
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
          getFileInfo?.({
            fileName: file.name,
            fileSize: file.size,
            imgString: reader.result as string,
          })
        }
        reader.readAsDataURL(file)
      },
    })

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
    <div className='relative mb-[3vw] bg-white h-[250px] w-full max-w-5xl mx-auto rounded-[6px] transition-all duration-150'>
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
    </div>
  )
}

export default ImageUpload
