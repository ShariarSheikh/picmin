import iconPng1 from '@/assets/Helix.png'
import iconPng2 from '@/assets/Icosahedron.png'
import iconPng3 from '@/assets/Pyramid1.png'
import Button from '@/components/button'
import Image from 'next/image'
import { FC } from 'react'

const Thumbnail: FC = () => {
  return (
    <div className='w-full h-full text-center pt-0 lg:pt-10 px-[10px] lg:px-0 relative flex flex-col items-center justify-center'>
      <Button className='rounded-full bg-primary font-semibold text-white px-4 py-2 lg:px-10 lg:py-4 mt-[10px] mb-[2px] lg:mb-5'>
        Upload File
      </Button>
      <p className='text-base lg:text-lg font-bold mb-1'>
        Drag And drop an image here, or click to upload a file
      </p>
      <p className='text-sm text-slate-500'>
        Supported file types: JPEG, PNG, WebP, Avif.
      </p>

      <div className='w-full z-[8] absolute h-full transition-all'>
        <Image
          src={iconPng1}
          width={50}
          height={50}
          alt='icon'
          style={{
            top: '18vh',
          }}
          className='object-cover hidden lg:block absolute left-12'
        />
        <Image
          src={iconPng2}
          width={50}
          height={50}
          alt='icon'
          className='object-cover hidden lg:block absolute -top-4 left-[48%]'
        />
        <Image
          src={iconPng3}
          width={50}
          height={50}
          alt='icon'
          style={{
            top: '18vh',
          }}
          className='object-cover hidden lg:block absolute right-12'
        />
      </div>
    </div>
  )
}

export default Thumbnail
