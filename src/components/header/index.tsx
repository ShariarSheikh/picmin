'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { TbWorldWww } from 'react-icons/tb'

import { toggleTutorialButton } from '@/redux/features/headerButtonsSlice'
import { FC, useState } from 'react'
import { CiImageOn } from 'react-icons/ci'
import { IoText } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch } from 'react-redux'

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const dispatch = useDispatch()
  return (
    <Navbar
      maxWidth='lg'
      classNames={{
        wrapper: 'rounded-lg bg-primary',
      }}
      className='z-[1110] w-full sticky px-4 top-0 py-4 lg:py-6 bg-transparent'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='items-center' justify='start'>
        <NavbarBrand className='max-w-[75px] w-full'>
          <Link href='/'>
            <h1 className='font-bold text-white text-2xl'>PicMin</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='items-center text-white' justify='center'>
        <Dropdown showArrow radius='sm' className='hidden sm:block'>
          <NavbarItem className='hidden sm:block'>
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
        <NavbarItem className='hidden sm:block'>
          <Link
            className='text-base text-white font-semibold rounded-[6px] hover:bg-[#4b53ff] hover:text-white px-3 py-3'
            href='/img-crop'
            aria-current='page'
          >
            Image Crop
          </Link>
        </NavbarItem>
        <NavbarItem className='hidden sm:block'>
          <Link
            className='text-base text-white font-semibold rounded-[6px] hover:bg-[#4b53ff] hover:text-white px-3 py-3'
            href='/img-compress'
          >
            Image Compress
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='hidden sm:block' justify='end'>
        <div className='flex items-center justify-end h-full'>
          <NavbarItem>
            <Button
              onClick={() => dispatch(toggleTutorialButton())}
              className='text-white'
              variant='flat'
            >
              Tutorial
            </Button>
          </NavbarItem>
        </div>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='sm:hidden text-white'
      />

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className='w-full font-semibold text-xl' href='/' size='lg'>
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className='w-full font-semibold text-xl'
            href='/favicon-generate/from-image'
            size='lg'
          >
            Image To Favicon
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className='w-full font-semibold text-xl'
            href='/favicon-generate/from-text'
            size='lg'
          >
            Text To Favicon
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className='w-full font-semibold text-xl'
            href='/img-crop'
            size='lg'
          >
            Crop Image
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className='w-full font-semibold text-xl'
            href='/img-compress'
            size='lg'
          >
            Compress Image
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
