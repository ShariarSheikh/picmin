import Button from '@/components/button'
import { setNewImg } from '@/redux/features/imgSlice'
import { useAppDispatch } from '@/redux/hooks'
import React from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { FaFileImage } from 'react-icons/fa'

const SelectNewImg = () => {
  const dispatch = useAppDispatch()

  const { getInputProps, getRootProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    noDrag: true,
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
        // set new image
        dispatch(
          setNewImg({
            newImg: reader.result as string,
          }),
        )
      }
      reader.readAsDataURL(file)
    },
  })

  return (
    <Button
      style={{ border: '2px dashed #0d128e3b' }}
      className='bg-[#E5ECF9] active:scale-95 px-2 duration-150 text-slate-600 text-sm h-10 rounded-[6px] flex space-x-2 items-center justify-center relative overflow-hidden'
    >
      <FaFileImage /> <span>Add New Image</span>
      <div
        {...(getRootProps() as DropzoneRootProps)}
        className='h-full w-full bg-transparent absolute inset-0'
      >
        <input
          {...(getInputProps() as DropzoneRootProps)}
          className='h-full w-full'
        />
      </div>
    </Button>
  )
}

export default SelectNewImg
