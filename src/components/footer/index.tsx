import Link from 'next/link'
import { FC } from 'react'
import Button from '../button'
import Logo from '../logo/Logo'

const Footer: FC = () => {
  return (
    <footer className='bg-primary text-white w-full max-w-[1290px] mx-auto rounded-lg mb-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:px-8 md:pt-8 md:pb-4'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <Logo color='white' />

          <ul className='flex flex-wrap items-center mb-6 text-base font-medium text-white'>
            <li>
              <Link
                href='/imgBgRemove'
                className='hover:underline me-4 md:me-6'
              >
                Image Background Remove
              </Link>
            </li>
            <li>
              <Link
                href='/generateFavicon'
                className='hover:underline me-4 md:me-6'
              >
                Generate Favicon
              </Link>
            </li>
            <li>
              <Button className='me-4 md:me-6'>Tutorial</Button>
            </li>
          </ul>
        </div>
        <div className='flex items-center justify-center space-x-10 mt-6 lg:mt-8'>
          <span className='block text-sm'>© 2024 lazyowle.vercel.app</span>
          <Link href='https://shariar.vercel.app' className='block text-sm'>
            Creator Shariar Sheikh
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
