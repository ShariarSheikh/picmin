'use client'

import base64ToImageFile from '@/app/utils/base64ToImageFile'
import ImageUpload from '@/components/ImageUpload'
import Button from '@/components/button'
import { useGenerateFaviconMutation } from '@/redux/services/imageApi'
import { Slider, Switch, cn } from '@nextui-org/react'
import * as htmlToImage from 'html-to-image'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'
import Features from '../Features'
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
    <div className='w-full mt-3'>
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

      <div className='mt-4 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 items-center gap-5'>
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
    <section className='w-full bg-white pb-10 px-5 lg:px-5'>
      <div className='w-full bg-white max-w-[870px] mx-auto min-h-[190px] lg:min-h-[300px] py-3 mt-[30px] lg:mt-0 mb-12'>
        {imageInput && !generateFaviconApi.isSuccess && (
          <div className='pt-10'>
            {devFavIconPrevView}
            <Preview favIconCanvas={faviconCanvas} />
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
            htmlLinks={generateFaviconApi.data.data.htmlLinksString}
          />
        )}

        {!imageInput && (
          <ImageUpload
            getFileInfo={({ imgString }) => setImageInput(imgString)}
          />
        )}
      </div>

      <Features />
    </section>
  )
}
