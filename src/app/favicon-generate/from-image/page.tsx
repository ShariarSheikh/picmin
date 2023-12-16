'use client'

import base64ToImageFile from '@/app/utils/base64ToImageFile'
import ImageInputButton from '@/components/ImageInputButton'
import Button from '@/components/button'
import { useGenerateFaviconMutation } from '@/redux/services/imageApi'
import { Slider, Switch, cn } from '@nextui-org/react'
import * as htmlToImage from 'html-to-image'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'
import Preview from '../Preview'
import Result from '../Result'

//----------------------------------------------
export interface CustomOptionsType {
  isCustom: boolean
  backgroundColor: string
  borderRadius: number
  imgInputRange: number
  demo: {
    imageSize: number
  }
  real: {
    imageSize: number
  }
}
//----------------------------------------------

export default function FromImage() {
  const [generateFavicon, generateFaviconApi] = useGenerateFaviconMutation()
  const [imageInput, setImageInput] = useState<string>('')
  const [options, setOptions] = useState<CustomOptionsType>({
    isCustom: false,
    backgroundColor: '#ff333300',
    borderRadius: 0,
    imgInputRange: 0,
    demo: {
      imageSize: 28,
    },
    real: {
      imageSize: 500,
    },
  })

  const favIconContainerRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionChange = (option: string, value: any) => {
    if (option === 'imageSize') {
      // Map the input range (0-100) to specific pixel values for demo and real sizes
      const demoSize = Math.round((value / 100) * (30 - 26) + 26)
      const realSize = Math.round((value / 100) * (555 - 500) + 500)

      // Update both demo.imageSize and real.imageSize in the state
      return setOptions((prevOptions) => ({
        ...prevOptions,
        imgInputRange: value,
        demo: {
          ...prevOptions.demo,
          imageSize: demoSize,
        },
        real: {
          ...prevOptions.real,
          imageSize: realSize,
        },
      }))
    }

    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value,
    }))
  }

  const generateFaviconHandler = async () => {
    if (!favIconContainerRef.current) return

    try {
      const dataUrl = await htmlToImage.toPng(favIconContainerRef.current)

      const formData = new FormData()
      const imgFile = base64ToImageFile(dataUrl)
      formData.append('imgData', imgFile)

      await generateFavicon({
        imgData: formData,
      })
    } catch (error) {
      alert('something is wrong. please contact support!')
    }
  }

  const customizeOptions = (
    <div className='w-full'>
      <Switch
        checked={options.isCustom}
        onClick={() => handleOptionChange('isCustom', !options.isCustom)}
        classNames={{
          base: cn(
            'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
            'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
            'data-[selected=true]:border-primary',
          ),
          wrapper: 'p-0 h-4 overflow-visible',
          thumb: cn(
            'w-6 h-6 border-2 shadow-lg',
            'group-data-[hover=true]:border-primary',
            //selected
            'group-data-[selected=true]:ml-6',
            // pressed
            'group-data-[pressed=true]:w-7',
            'group-data-[selected]:group-data-[pressed]:ml-4',
          ),
        }}
      >
        <div className='flex flex-col gap-1'>
          <p className='text-medium'>Enable Customize Options</p>
          <p className='text-tiny text-default-400'>
            After enabling this feature, you will be able to customize your
            image to suit your preferences.
          </p>
        </div>
      </Switch>

      <div className='grid grid-cols-3 items-center gap-5'>
        <Slider
          label='Border Radius'
          size='sm'
          minValue={0}
          maxValue={100}
          isDisabled={!options.isCustom}
          getValue={(donuts) => `${donuts} of 100 %`}
          onChange={(value) => handleOptionChange('borderRadius', value)}
          className='w-full text-slate-500'
        />

        <Slider
          label='Image Size'
          size='sm'
          minValue={0}
          maxValue={100}
          isDisabled={!options.isCustom}
          getValue={(donuts) => `${donuts} of 100 %`}
          onChange={(value) => handleOptionChange('imageSize', value)}
          className='w-full text-slate-500'
        />

        <div>
          <h1 className='mb-2 text-slate-500'>Background Color</h1>
          <TwitterPicker
            color={options.backgroundColor}
            onChange={({ hex }) => handleOptionChange('backgroundColor', hex)}
          />
        </div>
      </div>
    </div>
  )

  const devFavIconPrevView = (
    <div className='w-0 h-0 overflow-hidden opacity-0'>
      <div
        className='w-[550px] h-[550px] flex items-center justify-center overflow-hidden'
        style={{
          borderRadius: `${options.borderRadius}%`,
          background: options.backgroundColor,
        }}
        ref={favIconContainerRef}
      >
        <div
          style={{
            width: options.real.imageSize,
            height: options.real.imageSize,
          }}
          className='relative'
        >
          <Image fill className='' src={imageInput} alt='favicon' />
        </div>
      </div>
    </div>
  )

  const faviconCanvas = (
    <div
      className='w-[30px] h-[30px] overflow-hidden flex items-center justify-center'
      style={{
        borderRadius: `${options.borderRadius}%`,
        background: options.backgroundColor,
      }}
    >
      <div
        style={{
          width: options.demo.imageSize,
          height: options.demo.imageSize,
        }}
        className='relative'
      >
        <Image fill className='' src={imageInput} alt='favicon' />
      </div>
    </div>
  )

  return (
    <section className='w-full bg-white pb-10'>
      <div className='w-full bg-white max-w-[1200px] mx-auto min-h-[300px] pt-10 py-3 mb-12'>
        {imageInput && !generateFaviconApi.isSuccess && (
          <div className='pt-10'>
            {devFavIconPrevView}
            <Preview inputImg={imageInput} favIconCanvas={faviconCanvas} />
            {customizeOptions}
            {generateFaviconApi.isLoading ? (
              <Button
                className='w-full h-10 mt-10 bg-[#E5ECF9] text-slate-600 flex items-center justify-center'
                disabled
              >
                Generating Favicon...
              </Button>
            ) : (
              <Button
                className='w-full h-10 mt-10 bg-primary text-white active:scale-95 duration-150 flex items-center justify-center'
                onClick={generateFaviconHandler}
              >
                Generate Favicon
              </Button>
            )}
          </div>
        )}

        {generateFaviconApi.isSuccess && (
          <Result
            zipFileBase64={generateFaviconApi.data.data.faviconZip}
            htmlLinks={generateFaviconApi.data.data.htmlLinks}
          />
        )}

        {!imageInput && (
          <div className='bg-gray-200 w-full min-h-[300px] flex justify-center items-center'>
            <ImageInputButton image='' setImage={setImageInput} />
          </div>
        )}
      </div>

      <div className='w-full max-w-[1200px] mx-auto bg-white p-6 rounded-md shadow-md mb-12'>
        <h1 className='text-2xl font-bold mb-4'>Favicon Generator Features</h1>

        <ul className='list-disc pl-10 mb-4'>
          <li className='mb-4'>
            <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
              Text Favicon
            </h2>
            <p className='text-gray-600'>
              Easily generate a favicon with custom text, choosing from various
              fonts and styles.
            </p>
          </li>

          <li className='mb-4'>
            <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
              Image Favicon
            </h2>
            <p className='text-gray-600'>
              Upload your own image to create a personalized favicon for your
              website.
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
    </section>
  )
}
