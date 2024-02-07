'use client'

import base64ToImageFile from '@/app/utils/base64ToImageFile'
import Button from '@/components/button'
import { useGenerateFaviconMutation } from '@/redux/services/imageApi'
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Slider,
} from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import * as htmlToImage from 'html-to-image'
import { useEffect, useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'
import { FaFont } from 'react-icons/fa'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { RxFontFamily } from 'react-icons/rx'
import Features from '../Features'
import Preview from '../Preview'
import Result from '../Result'
import useFontsList from './useFontsList'
import { OptionsState, initialOptions } from './utils'

//------------------------------------------

//------------------------------------------

export default function FromText() {
  const [generateFavicon, generateFaviconApi] = useGenerateFaviconMutation()

  const { listedFonts, isLoading, onLoadMore } = useFontsList()
  const [options, setOptions] = useState<OptionsState>(initialOptions)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const favIconContainerRef = useRef<HTMLDivElement>(null)
  const canvasElementDemoRef = useRef<HTMLDivElement>(null)

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: true,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore: onLoadMore,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChangeHandler = (field: keyof OptionsState, value: any) => {
    //@ts-ignore
    if (field === 'fontSize') {
      const demoSize = Math.round((value / 100) * (30 - 16) + 16)
      const realSize = Math.round((value / 100) * (610 - 200) + 200)

      return setOptions((prevState) => ({
        ...prevState,
        demo: {
          fontSize: demoSize,
        },
        real: {
          fontSize: realSize,
        },
      }))
    }

    if (field === 'fontFamily') {
      const findFontFamilyIndex = listedFonts.findIndex(
        (family) => family.family === value,
      )

      const findFontFamily = listedFonts[findFontFamilyIndex]?.variants
      addFontFace(value, findFontFamily[0].url)
      return setOptions((prevState) => ({
        ...prevState,
        fontFamily: value,
        fontVariant: findFontFamily,
        selectedFontVariant: findFontFamily[0],
      }))
    }

    if (field === 'fontVariant') {
      const findVariantsIndex = options.fontVariant.findIndex(
        (variant) => variant.name === value,
      )
      const findVariant = options.fontVariant[findVariantsIndex]
      addFontFace(options.fontFamily, findVariant.url)
      return setOptions((prevState) => ({
        ...prevState,
        selectedFontVariant: findVariant,
      }))
    }

    setOptions((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const addFontFace = (fontFamily: string, url: string) => {
    const styleContent = `
    @font-face {
      font-family: '${fontFamily}';
      src: url(${url}) format('truetype');
    }
  `
    // Check if any style element with @font-face rules exists
    const styleTag = document.getElementById('styleTagForFontFace')

    if (styleTag) {
      while (styleTag.firstChild) {
        styleTag.removeChild(styleTag.firstChild)
      }

      styleTag.textContent = styleContent
    } else {
      const styleElement = document.createElement('style')
      styleElement.id = 'styleTagForFontFace'
      styleElement.textContent = styleContent
      document.head.appendChild(styleElement)
    }
  }

  useEffect(() => {
    if (!options.selectedFontVariant.url) return
    addFontFace(options.fontFamily, options.selectedFontVariant.url)
  }, [])

  const getFontStyle = () => ({
    fontFamily: options.fontFamily,
    fontStyle: options.selectedFontVariant.style,
    fontWeight: options.selectedFontVariant.weight,
  })

  const editContent = (
    <div className='w-full flex items-center justify-center py-12'>
      {/* <!-- Utils Component --> */}
      <div className='w-full max-w-[768px] mx-auto lg:px-8 '>
        <div className='flex flex-col lg:flex-row lg:space-x-8 mb-5 lg:mb-0'>
          <div className='mb-8'>
            <h1 className='mb-2 text-slate-500'>Font Color</h1>
            <TwitterPicker
              color={options.fontColor}
              onChange={({ hex }) => inputChangeHandler('fontColor', hex)}
            />
          </div>
          <div>
            <h1 className='mb-2 text-slate-500'>Background Color</h1>
            <TwitterPicker
              color={options.backgroundColor}
              onChange={({ hex }) => inputChangeHandler('backgroundColor', hex)}
            />
          </div>
        </div>

        <div className='flex w-full space-x-4 lg:space-x-8'>
          <div
            style={{
              fontSize: 100,
              ...getFontStyle(),
            }}
            className='w-[300px] bg-gray-200 flex items-center justify-center overflow-hidden'
          >
            <span>{options.font}</span>
          </div>

          <div className='w-[300px]'>
            <Slider
              label='Font Size'
              size='sm'
              minValue={8}
              maxValue={100}
              getValue={(donuts) => `${donuts} of 100 %`}
              //@ts-ignore
              onChange={(value) => inputChangeHandler('fontSize', value)}
              className='w-full text-slate-500 mb-8'
            />
            <Slider
              label='Border Radius'
              size='sm'
              minValue={0}
              maxValue={100}
              getValue={(donuts) => `${donuts} of 100 %`}
              //@ts-ignore
              onChange={(value) => inputChangeHandler('borderRadius', value)}
              className='w-full text-slate-500 mb-8'
            />
            <div className='text-slate-500'>
              <Input
                className='h-12 outline-none mb-8 active:border-transparent'
                type='text'
                variant='underlined'
                label='Font'
                startContent={<FaFont className='mb-0.5 flex-shrink-0' />}
                value={options.font}
                onChange={(value) => {
                  inputChangeHandler('font', value.target.value)
                }}
              />

              <Autocomplete
                scrollRef={scrollerRef}
                defaultItems={listedFonts}
                isLoading={isLoading}
                required
                defaultSelectedKey={options.fontFamily}
                label='Font Family'
                placeholder='Select Font Family'
                className='max-h-[48px] mb-8'
                variant='underlined'
                startContent={<RxFontFamily />}
                scrollShadowProps={{
                  hideScrollBar: false,
                }}
                onOpenChange={setIsOpen}
                onSelectionChange={(value) => {
                  inputChangeHandler('fontFamily', value)
                }}
              >
                {(fontFamily) => (
                  <AutocompleteItem
                    value={fontFamily.family}
                    key={fontFamily.family}
                    className='h-12'
                  >
                    {fontFamily.family}
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Autocomplete
                defaultItems={options.fontVariant}
                isLoading={isLoading}
                defaultSelectedKey={options.selectedFontVariant.name}
                label='Font Variant'
                placeholder='Select Font Variant'
                className='max-h-[48px]'
                variant='underlined'
                startContent={<GiWeightLiftingUp />}
                onSelectionChange={(value) => {
                  inputChangeHandler('fontVariant', value)
                }}
              >
                {(fontVariant) => (
                  <AutocompleteItem
                    key={fontVariant.name}
                    value={fontVariant.name}
                    className='h-12'
                  >
                    {fontVariant.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  //
  const devFavIconPrevView = (
    <div className='w-0 h-0 overflow-hidden opacity-0'>
      <div
        className='w-[550px] h-[550px] flex items-center justify-center overflow-hidden relative'
        style={{
          borderRadius: `${options.borderRadius}%`,
          background: options.backgroundColor,
          fontSize: options.real.fontSize,
          color: options.fontColor,
          ...getFontStyle(),
        }}
        ref={favIconContainerRef}
      >
        <span>{options.font}</span>
      </div>
    </div>
  )
  const faviconCanvas = (
    <div
      ref={canvasElementDemoRef}
      className='w-[30px] h-[30px] overflow-hidden flex items-center justify-center relative'
      style={{
        borderRadius: `${options.borderRadius}%`,
        background: options.backgroundColor,
        fontSize: options.demo.fontSize,
        color: options.fontColor,
        ...getFontStyle(),
      }}
    >
      <span>{options.font}</span>
    </div>
  )

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

  return (
    <div className='w-full bg-white min-h-[300px] py-3 px-5'>
      <div className='w-full bg-white max-w-[870px] mx-auto min-h-[300px] pt-10 py-3 mb-12'>
        {!generateFaviconApi.isSuccess && (
          <>
            {devFavIconPrevView}
            <Preview favIconCanvas={faviconCanvas} />
            {editContent}
          </>
        )}

        {!generateFaviconApi.isSuccess && (
          <>
            {generateFaviconApi.isLoading && (
              <Button
                className='w-full h-10 mt-10 bg-[#E5ECF9] text-slate-600 flex items-center justify-center'
                disabled
              >
                Generating Favicon...
              </Button>
            )}

            {!generateFaviconApi.isLoading && (
              <Button
                className='w-full h-10 mt-10 bg-primary text-white active:scale-95 duration-150 flex items-center justify-center'
                onClick={generateFaviconHandler}
              >
                Generate Favicon
              </Button>
            )}
          </>
        )}

        {generateFaviconApi.isSuccess && (
          <Result
            zipFileBase64={generateFaviconApi.data.data.faviconZip}
            htmlLinks={generateFaviconApi.data.data.htmlLinksString}
          />
        )}
      </div>
      <Features />
    </div>
  )
}
