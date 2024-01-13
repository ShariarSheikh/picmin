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

import { toggleTutorialButton } from '@/redux/features/headerButtonsSlice'
import { FC } from 'react'
import { CiImageOn } from 'react-icons/ci'
import { IoText } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch } from 'react-redux'

const Header: FC = () => {
  const dispatch = useDispatch()
  return (
    <Navbar
      maxWidth='lg'
      classNames={{
        wrapper: 'rounded-lg bg-primary',
      }}
      className='z-[1110] w-full sticky top-0 py-6 bg-transparent'
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
            className='text-base font-semibold rounded-[6px] hover:bg-[#4b53ff] hover:text-white px-3 py-3'
            href='/img-crop'
            aria-current='page'
          >
            Image Crop
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className='text-base font-semibold rounded-[6px] hover:bg-[#4b53ff] hover:text-white px-3 py-3'
            href='/img-compress'
          >
            Image Compress
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='items-center' justify='end'>
        <NavbarItem>
          <Button
            onClick={() => dispatch(toggleTutorialButton())}
            className='text-white'
            variant='flat'
          >
            Tutorial
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
