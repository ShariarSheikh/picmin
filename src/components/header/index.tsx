'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import Link from 'next/link'
import { TbWorldWww } from 'react-icons/tb'

import { FC } from 'react'
import { CiImageOn } from 'react-icons/ci'
import { IoText } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md'

const Header: FC = () => {
  return (
    <Navbar
      maxWidth='lg'
      classNames={{
        wrapper: 'rounded-lg bg-[#4b53ff]',
      }}
      className='z-[1110] w-full sticky top-0 pt-6'
    >
      <NavbarContent className='items-center' justify='start'>
        <NavbarBrand className='max-w-[75px] w-full'>
          <Link href='/'>
            <h1 className='font-bold text-white text-2xl'>PicMin</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='items-center text-white' justify='center'>
        <Dropdown showArrow radius='sm'>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className='text-white bg-transparent data-[hover=true]:bg-transparent text-base font-semibold rounded-[6px] px-3 py-3'
                endContent={<MdKeyboardArrowDown />}
                startContent={<TbWorldWww className='text-gray-100' />}
                radius='sm'
                // variant='light'
              >
                Favicon
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label='favicon'
            className='w-[240px]'
            variant={'faded'}
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem
              // color='#e5ecf9'
              className='hover:bg-gray-100'
              key='autoscaling'
              description='Generate favicon from your image'
              href='/favicon-generate/from-image'
              startContent={
                <CiImageOn className='w-[22px] h-[22px] text-indigo-500' />
              }
            >
              Image
            </DropdownItem>
            <DropdownItem
              key='autoscaling'
              description='Generate favicon from your Text'
              href='/favicon-generate/from-text'
              startContent={
                <IoText className='w-[22px] h-[22px text-yellow-500' />
              }
            >
              Text
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link
            className='text-base font-semibold rounded-[6px] hover:bg-gray-100 hover:text-primary px-3 py-3'
            href='/img-crop'
            aria-current='page'
          >
            Image Crop
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className='text-base font-semibold rounded-[6px] hover:bg-gray-100 hover:text-primary px-3 py-3'
            href='/img-compress'
          >
            Image Compress
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='items-center' justify='end'>
        <NavbarItem>
          <Button className='text-white' variant='flat'>
            Tutorial
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
