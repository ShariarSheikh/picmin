'use client'

import { DetailedHTMLProps, InputHTMLAttributes, useRef } from 'react'

export interface CustomInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fullWidth?: boolean
  disabled?: boolean
  containerClassName?: string
  labelClassName?: string
}

function Input({
  containerClassName,
  className,
  placeholder,
  labelClassName,
  ...rest
}: CustomInput) {
  const props = rest
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={`${containerClassName} w-full relative`}>
      <input
        {...props}
        className={`${className} block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-[8px] border border-[#373c4d] appearance-none focus:outline-none focus:ring-0 peer`}
        placeholder=' '
      />
      <label
        role='presentation'
        onClick={() => inputRef.current?.focus()}
        htmlFor={placeholder}
        className={`absolute text-black bg-inherit duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${labelClassName}`}
      >
        {placeholder}
      </label>
    </div>
  )
}

export default Input
