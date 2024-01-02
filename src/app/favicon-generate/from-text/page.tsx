'use client'

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
import Preview from '../Preview'
import useFontsList from './useFontsList'
import { OptionsState, initialOptions } from './utils'

//------------------------------------------

//------------------------------------------

export default function FromText() {
  const { listedFonts, isLoading, onLoadMore } = useFontsList()
  const [options, setOptions] = useState<OptionsState>(initialOptions)
  const [imgData, setImgData] = useState<string>('')
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
    const styleElement = document.createElement('style')
    styleElement.textContent = `
         @font-face {
           font-family: '${fontFamily}';
           src: url(${url}) format('truetype');
         }
       `

    document.head.appendChild(styleElement)
  }

  const editContent = (
    <div className='w-full flex items-center justify-center py-12'>
      {/* <!-- Utils Component --> */}
      <div className='w-full max-w-[768px] mx-auto px-8'>
        <div className='flex space-x-8'>
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

        <div className='flex w-full space-x-8'>
          <div
            style={{
              fontSize: 100,
              fontFamily: options.fontFamily,
              fontStyle: options.selectedFontVariant.style,
              fontWeight: options.selectedFontVariant.weight,
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
      }}
    >
      <span>{options.font}</span>
    </div>
  )
  const generateHtmlToImgData = async () => {
    if (!favIconContainerRef.current) return
    const dataUrl = await htmlToImage.toPng(favIconContainerRef.current)
    // const imgFile = base64ToImageFile(dataUrl)
    setImgData(dataUrl)
  }

  useEffect(() => {
    generateHtmlToImgData()
  }, [options])

  return (
    <div className='w-full bg-white min-h-[300px] py-3'>
      <div className='w-full bg-white max-w-[870px] mx-auto min-h-[300px] pt-10 py-3 mb-12'>
        {devFavIconPrevView}
        <Preview mode='text' inputImg={imgData} favIconCanvas={faviconCanvas} />
        {editContent}
      </div>
    </div>
  )
}
