'use client'

import compress from '@/assets/compress.svg'
import crop from '@/assets/crop.svg'
import img_to_favicon from '@/assets/image-to-favicon.jpg'
import text_to_favicon from '@/assets/text-to-favicon.jpg'
import { useGetServerHealthQuery } from '@/redux/services/api'
import { Card, CardHeader, Image } from '@nextui-org/react'
import Link from 'next/link'

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useGetServerHealthQuery()

  return (
    <main className='flex min-h-[80vh] flex-col items-center justify-between p-16 relative'>
      <div className='w-full max-w-[1290px] pt-[20px] mx-auto text-center relative'>
        <div className='w-full h-full bg-transparent z-[10]'>
          <h1 className='text-[3vw] font-semibold static leading-[7.8vw] text-center text-gray-800'>
            Turbocharge Your Productivity in Seconds
          </h1>
          <p className='w-full max-w-[580px] text-sm mx-auto mt-1 text-gray-700 mb-12'>
            Explore the Future of Work with Picmin: Unleashing Rapid
            Productivity Through Images.{' '}
            <b className='text-primary cursor-pointer'>Tutorial.</b>
          </p>
          <div className='grid grid-cols-4 gap-6 w-full mb-10 max-w-[1024px] mx-auto'>
            <Link href='/favicon-generate/from-image'>
              <Card className='h-[300px] cursor-pointer bg-white group'>
                <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
                  <p className='text-tiny text-white/60 uppercase font-bold'>
                    Favicon
                  </p>
                  <h4 className='text-white font-medium text-large'>
                    Image Fo Favicon
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt='Card background'
                  className='z-0 w-full h-full object-cover group-hover:scale-95'
                  src={img_to_favicon.src}
                />
              </Card>
            </Link>

            <Link href='/favicon-generate/from-text'>
              <Card className='h-[300px] cursor-pointer bg-white group'>
                <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
                  <p className='text-tiny text-white/60 uppercase font-bold'>
                    Favicon
                  </p>
                  <h4 className='text-white font-medium text-large'>
                    Text To Favicon
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt='Card background'
                  className='z-0 w-full h-full object-cover group-hover:scale-95'
                  src={text_to_favicon.src}
                />
              </Card>
            </Link>

            <Link href='/img-crop'>
              <Card className='h-[300px] cursor-pointer bg-white group'>
                <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
                  <p className='text-tiny text-white/60 uppercase font-bold'>
                    Crop
                  </p>
                  <h4 className='text-white font-medium text-large'>
                    Crop Image
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt='Card background'
                  className='z-0 bg-[#d8bfd8] object-cover w-full h-full group-hover:scale-95'
                  src={crop.src}
                />
              </Card>
            </Link>

            <Link href='/img-compress'>
              <Card className='h-[300px] cursor-pointer bg-white group'>
                <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
                  <p className='text-tiny text-white/60 uppercase font-bold'>
                    Compress
                  </p>
                  <h4 className='text-white font-medium text-large'>
                    Compress Image Size
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt='Card background'
                  className='z-0 bg-black object-cover w-full h-full group-hover:scale-95'
                  src={compress.src}
                />
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
