import { EditToolType } from '@/app/edit/page'
import { AiOutlineGlobal } from 'react-icons/ai'
import { FaExchangeAlt } from 'react-icons/fa'
import { GiSmallFire } from 'react-icons/gi'
import { MdCrop } from 'react-icons/md'

interface FeaturesTypes {
  title: string
  description: string
  Icon: JSX.Element
  query: EditToolType
}

export default [
  {
    title: 'Favicon Generate',
    description: 'LazyOwle will help you remove your image Background',
    Icon: <AiOutlineGlobal width={50} height={50} />,
    query: 'favicon-generate',
  },
  {
    title: 'Size Reducer',
    description: 'LazyOwle will help you remove your image Background',
    Icon: <GiSmallFire />,
    query: 'size-compress',
  },
  {
    title: 'Crop And Resize',
    description: 'LazyOwle will help you remove your image Background',
    Icon: <MdCrop width={50} height={50} />,
    query: 'crop',
  },

  {
    title: 'File type change',
    description: 'LazyOwle will help you remove your image Background',
    Icon: <FaExchangeAlt width={50} height={50} />,
    query: 'file-type-change',
  },
  {
    title: 'Background Remove',
    description: 'LazyOwle will help you remove your image Background',
    Icon: <AiOutlineGlobal width={50} height={50} />,
    query: 'background-remove',
  },
] as FeaturesTypes[]
