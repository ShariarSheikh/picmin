'use client'

import Button from '@/components/button'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { Element, Link } from 'react-scroll'

const ImageInput = dynamic(() => import('./ImageInput'))
const TextInput = dynamic(() => import('./TextInput'))

//----------------------------------------------------------------
type FavIconInputType = 'ImgType' | 'TextIcon'
//----------------------------------------------------------------

export default function FaviconGenerate() {
  const [favIconInputType, setFavIconInputType] =
    useState<FavIconInputType>('ImgType')

  const changeInputType = (prop: FavIconInputType) => setFavIconInputType(prop)

  return (
    <section className='w-full'>
      <div className='bg-primary text-white w-full h-[300px]'>
        <div className='max-w-[1220px] w-full h-full mx-auto px-5 flex flex-col justify-center'>
          <div className='w-full max-w-[60%] pr-2'>
            <h1 className='text-[2vw] font-semibold leading-[5vw] tracking-wide text-[#faebd7] uppercase'>
              Welcome to the Favicon Generator page!
            </h1>
            <p className='text-[1.2vw] text-[#faebd7]'>
              Easily create tiny icons for your website{`'`}s browser tab. Our
              user-friendly interface simplifies the process. Explore the
              <Link
                to='details'
                smooth={true}
                className='font-semibold underline cursor-pointer'
              >
                {' '}
                Details
              </Link>{' '}
              section for customization options. Stand out with a unique visual
              representation of your site!
            </p>
          </div>
        </div>
      </div>

      <div className='max-w-[1200px] w-full mx-auto px-5 py-[40px] '>
        <div className='bg-white p-6 rounded-md shadow-md my-5'>
          <div className='flex w-full h-10'>
            <Button
              onClick={() => changeInputType('ImgType')}
              className={`w-[50%] h-full bg-primary ${
                favIconInputType === 'ImgType'
                  ? 'bg-opacity-100 text-white'
                  : 'bg-opacity-10 text-black'
              }`}
            >
              Image Favicon
            </Button>
            <Button
              onClick={() => changeInputType('TextIcon')}
              className={`w-[50%] h-full bg-primary ${
                favIconInputType === 'TextIcon'
                  ? 'bg-opacity-100 text-white'
                  : 'bg-opacity-10 text-black'
              }`}
            >
              Text Favicon
            </Button>
          </div>

          {favIconInputType === 'ImgType' && (
            <Suspense
              fallback={
                <div className='text-gray-500 w-full h-[200px] flex items-center justify-center'>
                  <span>Loading...</span>
                </div>
              }
            >
              <ImageInput />
            </Suspense>
          )}

          {favIconInputType === 'TextIcon' && (
            <Suspense
              fallback={
                <div className='text-gray-500 w-full h-[200px] flex items-center justify-center'>
                  <span>Loading...</span>
                </div>
              }
            >
              <TextInput />
            </Suspense>
          )}
        </div>

        <Element name='details' className='min-h-[500px] w-full'>
          <div className='bg-white p-6 rounded-md shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>
              Favicon Generator Features
            </h1>

            <ul className='list-disc pl-10 mb-4'>
              <li className='mb-4'>
                <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
                  Text Favicon
                </h2>
                <p className='text-gray-600'>
                  Easily generate a favicon with custom text, choosing from
                  various fonts and styles.
                </p>
              </li>

              <li className='mb-4'>
                <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
                  Image Favicon
                </h2>
                <p className='text-gray-600'>
                  Upload your own image to create a personalized favicon for
                  your website.
                </p>
              </li>

              <li className='mb-4'>
                <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
                  Preview
                </h2>
                <p className='text-gray-600'>
                  Visualize your favicon in real-time before downloading it.
                </p>
              </li>

              <li className='mb-4'>
                <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
                  Customization
                </h2>
                <p className='text-gray-600'>
                  Adjust the size, color, and other parameters to match your
                  website&apos;s aesthetic.
                </p>
              </li>

              <li className='mb-4'>
                <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
                  Download Options
                </h2>
                <p className='text-gray-600'>
                  Download the generated favicon in various formats for
                  compatibility with different browsers.
                </p>
              </li>
            </ul>

            <div className='px-2 rounded-sm h-10 bg-primary bg-opacity-40 text-black inline py-2'>
              Create a distinctive and eye-catching favicon to enhance your
              website&apos;s identity!
            </div>
          </div>
        </Element>
      </div>
    </section>
  )
}
