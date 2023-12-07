'use client'

import toolsFeatures from '@/data/toolsFeatures'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { FC } from 'react'
import Button from '../button'

const Header: FC = () => {
  const segment = useSelectedLayoutSegment()

  return (
    <header className='z-[1110] bg-white w-full sticky top-0 border-b border-gray-200'>
      <div className='w-full max-w-[1290px] h-[80px] flex items-center justify-between mx-auto px-[10px] relative'>
        <div>
          <h1 className='font-bold text-primary text-2xl'>PicMin</h1>
        </div>

        <ul className='flex items-center space-x-3'>
          {toolsFeatures.map((tool) => (
            <li key={tool.title}>
              <Link
                href={`/${tool.query}`}
                className={`text-base font-semibold rounded-[6px] hover:bg-gray-50 hover:text-primary px-3 py-3 
                ${
                  segment === tool.query
                    ? 'bg-gray-50 text-primary'
                    : 'text-slate-600'
                }`}
              >
                {tool.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex items-center space-x-5 justify-start text-base font-medium'>
          <Button className='text-white bg-primary px-3 py-1 border border-primary rounded-sm hover:bg-white hover:text-primary duration-150'>
            Tutorial
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
