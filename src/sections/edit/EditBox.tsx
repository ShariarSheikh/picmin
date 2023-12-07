import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import SelectNewImg from './utils/SelectNewImg'

const EditBox = () => {
  const { originalImg, editedImg } = useAppSelector((state) => state.imgSlice)

  return (
    <div className='w-full max-w-[450px] p-8 bg-white relative h-auto sidebarUtilsScrollBar shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-[6px]'>
      <div className='absolute right-2 bottom-2'>
        <SelectNewImg />
      </div>
      <ImgPreview originalImg={originalImg} editedImg={editedImg} />
    </div>
  )
}

export default EditBox

const ImgPreview = ({
  originalImg,
  editedImg,
}: {
  originalImg: string
  editedImg: string
}) => {
  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      {originalImg && (
        <div className='w-full max-w-[300px] mx-auto h-[200px] relative'>
          <div className='z-[10000] absolute right-0 top-0 p-2 rounded-[6px] bg-primary text-white text-sm'>
            Original
          </div>
          <Image src={originalImg} fill alt='image data' />
        </div>
      )}
      {editedImg && (
        <div className='w-full max-w-[300px] mx-auto h-[200px] relative'>
          <div className='z-[10000] absolute right-0 top-0 p-2 rounded-[6px] bg-green-600 text-white text-sm'>
            Edited
          </div>
          <Image src={editedImg} fill alt='image data' />
        </div>
      )}
    </div>
  )
}
