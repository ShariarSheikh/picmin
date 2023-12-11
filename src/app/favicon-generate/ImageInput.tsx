import ImageInputButton from '@/components/ImageInputButton'
import Button from '@/components/button'
import { useGenerateFaviconMutation } from '@/redux/services/imageApi'
import * as htmlToImage from 'html-to-image'
import Image from 'next/image'
import { useRef, useState } from 'react'
import base64ToImageFile from '../utils/base64ToImageFile'
import Preview from './Preview'

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

export default function ImageInput() {
  const [generateFavicon, generateFaviconApi] = useGenerateFaviconMutation()

  const [imageInput, setImageInput] = useState<string>('')
  const [customizeImg, setCustomizeImg] = useState<string>('')
  const [options, setOptions] = useState<CustomOptionsType>({
    isCustom: false,
    backgroundColor: '#ffffff',
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
      setCustomizeImg(dataUrl)

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
    <div className='w-full max-w-[40%]'>
      <h3 className='text-lg font-semibold mb-2'>Customize Options</h3>
      <label className='flex items-center mb-2'>
        <input
          type='checkbox'
          checked={!options.isCustom}
          onChange={() => handleOptionChange('isCustom', false)}
          className='mr-2'
        />
        <span>Use Original Image</span>
      </label>

      <label className='flex items-center mb-2'>
        <input
          type='checkbox'
          checked={options.isCustom}
          onChange={() => handleOptionChange('isCustom', true)}
          className='mr-2'
        />
        <span>Customize</span>
      </label>

      <label
        className={`flex items-center mb-2 ${
          !options.isCustom ? 'text-gray-500' : ''
        }`}
      >
        Border Radius:
        <input
          type='range'
          min='0'
          max='100'
          value={options.borderRadius}
          disabled={!options.isCustom}
          onChange={(e) =>
            handleOptionChange('borderRadius', parseInt(e.target.value, 10))
          }
          className={`ml-2`}
        />
      </label>

      <label
        className={`flex items-center mb-2 ${
          !options.isCustom ? 'text-gray-500' : ''
        }`}
      >
        Image Size:
        <input
          type='range'
          min='0'
          max='100'
          disabled={!options.isCustom}
          value={options.imgInputRange}
          onChange={(e) =>
            handleOptionChange('imageSize', parseInt(e.target.value, 10))
          }
          className={`ml-2`}
        />
      </label>

      <label
        className={`flex items-center mb-2 ${
          !options.isCustom ? 'text-gray-500' : ''
        }`}
      >
        Background Color:
        <input
          type='color'
          value={options.backgroundColor}
          disabled={!options.isCustom}
          onChange={(e) =>
            handleOptionChange('backgroundColor', e.target.value)
          }
          className={`ml-2`}
        />
      </label>
    </div>
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const devFavIconPrevView =
    process.env.NODE_ENV === 'development' ? (
      <>
        {customizeImg && (
          <Image src={customizeImg} width={555} height={555} alt='favicon' />
        )}
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
      </>
    ) : null

  return (
    <div className='w-full min-h-[300px] py-3'>
      {imageInput && (
        <div className='pt-10'>
          {/* {devFavIconPrevView} */}
          <Preview
            inputImg={imageInput}
            favIconCanvas={
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
            }
          />
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
              className='w-full h-10 mt-10 bg-primary text-white flex items-center justify-center'
              onClick={generateFaviconHandler}
            >
              Generate Favicon
            </Button>
          )}
        </div>
      )}
      {!imageInput && (
        <div className='bg-gray-200 w-full min-h-[300px] flex justify-center items-center'>
          <ImageInputButton image='' setImage={setImageInput} />
        </div>
      )}
    </div>
  )
}
