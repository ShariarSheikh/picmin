import Link from 'next/link'
import { FC } from 'react'
import Button from '../button'

const Footer: FC = () => {
  return (
    <footer className='bg-primary text-white w-full max-w-[1024px] mx-auto rounded-lg mb-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:px-8 md:pt-8 md:pb-4'>
        <div className='flex flex-col items-center justify-center'>
          <Link href='/'>
            <h1 className='font-bold text-white text-2xl'>PicMin</h1>
          </Link>

          <ul className='flex flex-wrap items-center mt-6 mb-6 text-base font-medium text-white'>
            <li>
              <Link
                href='/favicon-generate/from-image'
                className='hover:underline me-4 md:me-6'
              >
                Image To Favicon
              </Link>
            </li>
            <li>
              <Link
                href='/favicon-generate/from-text'
                className='hover:underline me-4 md:me-6'
              >
                Text To Favicon
              </Link>
            </li>

            <li>
              <Link
                href='/favicon-generate/img-crop'
                className='hover:underline me-4 md:me-6'
              >
                Crop Image
              </Link>
            </li>

            <li>
              <Link
                href='/favicon-generate/img-compress'
                className='hover:underline me-4 md:me-6'
              >
                Compress Image
              </Link>
            </li>
            <li>
              <Button className='me-4 md:me-6'>Tutorial</Button>
            </li>
          </ul>
        </div>
        <div className='flex items-center justify-center space-x-10 mt-6 lg:mt-8'>
          <span className='block text-sm'>© 2024 PicMin.vercel.app</span>
          <Link href='https://shariar.vercel.app' className='block text-sm'>
            Creator Shariar Sheikh
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
