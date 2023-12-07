import iconPng1 from '@/assets/Helix.png'
import iconPng2 from '@/assets/Icosahedron.png'
import iconPng3 from '@/assets/Pyramid1.png'
import toolsFeatures from '@/data/toolsFeatures'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import Button from '../button'
import ChevronRightIcon from '../icons/ChevroRightIcon'

const AllTools = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsMenuOpen(false)
    },
  })

  const menuToggleHandler = () => {
    setIsMenuOpen((prevS) => !prevS)
  }

  return (
    <div className='relative' ref={ref}>
      <Button
        onClick={menuToggleHandler}
        className='h-[60px] cursor-pointer group flex space-x-2 items-center justify-center group transition-all duration-150'
      >
        <span className={isMenuOpen ? 'text-primary' : ''}>All Tools</span>
        <ChevronRightIcon
          width={20}
          height={20}
          className={isMenuOpen ? 'text-primary rotate-90' : ''}
        />
      </Button>

      {
        <div
          style={{
            height: isMenuOpen ? 300 : 0,
            padding: isMenuOpen ? 12 : 0,
          }}
          className='bg-white z-50 absolute duration-150 overflow-hidden right-0 top-[59px] w-[1200px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
        >
          <div className='w-full h-full flex'>
            <div className='p-12 h-full relative min-h-[275] bg-white rounded-[6px] w-full max-w-[300px] flex flex-col justify-center items-start border-r border-gray-200'>
              <h1 className='text-3xl text-primary mb-2'>Features</h1>
              <p className='text-sm text-slate-500'>
                More then 5 free features
              </p>
              <Image
                src={iconPng3}
                width={50}
                height={50}
                alt='icon'
                className='home_page_icon1 object-cover absolute top-[8%] left-[40%] animate-bounce'
              />

              <Image
                src={iconPng1}
                width={50}
                height={50}
                alt='icon'
                className='home_page_icon1 object-cover absolute top-[80%] left-[20%] animate-bounce'
              />
              <Image
                src={iconPng2}
                width={50}
                height={50}
                alt='icon'
                className='home_page_icon2 object-cover absolute top-[80%] right-[20%] animate-bounce'
              />
            </div>
            <ul className='p-6 grid gap-6 grid-cols-3'>
              {toolsFeatures.map((feature) => {
                const { Icon } = feature
                return (
                  <li key={feature.title}>
                    <Link href={`/edit?tools=${feature.query}`}>
                      <div className='flex h-[105px] px-[10px] py-3 group border-b border-b-primary hover:scale-95 hover:rounded-[6px] hover:bg-primary duration-150'>
                        {React.cloneElement(Icon, {
                          className:
                            'group-hover:animate-bounce w-10 h-10 text-slate-400 group-hover:text-primary group-hover:text-[#f5deb3]',
                        })}

                        <div className='pl-4'>
                          <h1 className='text-primary font-semibold group-hover:text-[#f5deb3] mb-1'>
                            {feature.title}
                          </h1>
                          {/* <p className='text-sm text-slate-500 group-hover:text-white font-[400] '>
                            {feature.description}
                          </p> */}
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default AllTools
