import Button from '@/components/button'
import { FC } from 'react'

const Thumbnail: FC = () => {
  return (
    <div className='w-full h-full pt-10 flex flex-col items-center justify-center'>
      <Button className='rounded-full bg-primary font-semibold text-white px-10 py-4 mb-5'>
        Upload File
      </Button>
      <p className='text-lg font-bold mb-1'>
        Drag And drop an image here, or click to upload a file
      </p>
      <p className='text-sm text-slate-500'>
        Supported file types: JPEG, PNG, WebP, Avif.
      </p>
    </div>
  )
}

export default Thumbnail
