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
import { useSelectedLayoutSegment } from 'next/navigation'
import { FC } from 'react'
import { CiImageOn } from 'react-icons/ci'
import { IoText } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md'

const Header: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const segment = useSelectedLayoutSegment()

  return (
    <Navbar
      isBordered
      maxWidth='xl'
      className='z-[1110] bg-[#FAFAFA] w-full sticky top-0'
    >
      <NavbarContent className='items-center' justify='start'>
        <NavbarBrand className='max-w-[75px] w-full'>
          <Link href='/'>
            <h1 className='font-bold text-primary text-2xl'>PicMin</h1>
          </Link>
        </NavbarBrand>
        <Dropdown showArrow radius='sm'>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className='bg-transparent data-[hover=true]:bg-transparent text-base font-semibold rounded-[6px] hover:bg-gray-50 hover:text-primary px-3 py-3'
                endContent={<MdKeyboardArrowDown />}
                radius='sm'
                variant='light'
              >
                Favicon
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label='favicon'
            className='w-[240px]'
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem
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
              href='/favicon-generate/text'
              startContent={
                <IoText className='w-[22px] h-[22px text-yellow-500' />
              }
            >
              Text
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link href='#' aria-current='page'>
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      {/* <NavbarContent justify='center'>
        <ul className='flex items-center space-x-3'>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className='bg-transparent data-[hover=true]:bg-transparent text-base font-semibold rounded-[6px] hover:bg-gray-50 hover:text-primary px-3 py-3'
                  endContent={<MdKeyboardArrowDown />}
                  radius='sm'
                  variant='light'
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label='ACME features'
              className='w-[340px]'
              itemClasses={{
                base: 'gap-4',
              }}
            >
              <DropdownItem
                key='autoscaling'
                description='ACME scales apps to meet user demand, automagically, based on load.'
                // startContent={icons.scale}
              >
                Autoscaling
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      </NavbarContent> */}
      {/* <NavPageLinks /> */}

      <NavbarContent className='items-center' justify='end'>
        <Button className='text-white bg-primary px-3 py-1 border border-primary rounded-sm hover:bg-white hover:text-primary duration-150'>
          Tutorial
        </Button>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
