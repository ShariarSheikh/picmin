'use client'

import { Input, Slider } from '@nextui-org/react'
import { useState } from 'react'
import { SketchPicker } from 'react-color'

//------------------------------------------
interface OptionsState {
  font: string
  fontColor: string
  backgroundColor: string
  fontSize: number
  fontWeight: {
    weight: string[]
    fontStyle: string[]
  }
}
//------------------------------------------

export default function FromText() {
  const [options, setOptions] = useState<OptionsState>({
    font: 'H',
    fontColor: '#3a14f4',
    backgroundColor: '#ffffff',
    fontSize: 16,
    fontWeight: {
      weight: [],
      fontStyle: [],
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChangeHandler = (field: keyof OptionsState, value: any) => {
    setOptions((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const editContent = (
    <div className='w-full flex items-center min-h-[460px] py-12'>
      {/* <!-- Icon Component --> */}
      <div
        style={{
          background: options.backgroundColor,
        }}
        className='min-w-[200px] h-[200px] rounded-sm overflow-hidden self-start flex items-center justify-center border border-gray-200 '
      >
        <h1
          style={{
            color: options.fontColor,
          }}
        >
          {options.font || ''}
        </h1>
      </div>

      {/* <!-- Utils Component --> */}
      <div className='w-full flex justify-between px-8'>
        <div className='w-[300px]'>
          <Slider
            label='Font Size'
            size='sm'
            minValue={8}
            maxValue={100}
            getValue={(donuts) => `${donuts} of 100 px`}
            onChange={(value) => inputChangeHandler('fontSize', value)}
            className='w-full text-slate-500 mb-8'
          />
          <div className='text-slate-500'>
            <Input
              className='h-12 outline-none mb-8'
              type='text'
              variant='bordered'
              label='Font'
              value={options.font}
              onChange={(value) =>
                inputChangeHandler('font', value.target.value)
              }
            />

            {/* <SelectItem
              className='h-12 outline-none mb-4'
              key={animal.value}
              value={animal.value}
            >
              {animal.label}
            </SelectItem> */}
          </div>
        </div>

        <div className='flex space-x-8'>
          <div>
            <h1 className='mb-2 text-slate-500'>Font Color</h1>
            <SketchPicker
              color={options.fontColor}
              onChange={({ hex }) => inputChangeHandler('fontColor', hex)}
            />
          </div>
          <div>
            <h1 className='mb-2 text-slate-500'>Background Color</h1>
            <SketchPicker
              color={options.backgroundColor}
              onChange={({ hex }) => inputChangeHandler('backgroundColor', hex)}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return <div className='w-full bg-white min-h-[300px] py-3'>{editContent}</div>
}
