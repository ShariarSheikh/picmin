import Image from 'next/image'
import { FC, ReactElement } from 'react'
import { FiPlus } from 'react-icons/fi'
import { HiMiniLockClosed } from 'react-icons/hi2'
import { IoArrowBack, IoArrowForward, IoCloseSharp } from 'react-icons/io5'
import { TbReload } from 'react-icons/tb'

interface IProps {
  inputImg: string
  favIconCanvas: ReactElement
}

const Preview: FC<IProps> = ({ inputImg, favIconCanvas }) => {
  const favIconTabViewContainer = (
    <div className='mt-1 bg-[#1E1E2A] h-[108px] w-[380px] max-w-[380px] pt-[8px] rounded-t-[4px] overflow-hidden'>
      <div className='flex items-center h-[48px] bg-inherit relative'>
        <div className='w-[11px] min-w-[11px] bg-inherit absolute bottom-0 left-0 h-[43px] border-r-2 border-b-2 border-[#626262] rounded-br-[5px]' />

        {/* favicon website name close icon container */}
        <div className='ml-[8px] w-[304px] min-w-[304px] h-[48px] text-[#f8f8ff] bg-[#2F3140] px-[14px] py-[8px] border-t-2 border-r border-l border-2 border-[#626262] border-b-0 rounded-t-[10px] flex justify-between items-center'>
          <div className='flex items-center'>
            <Image
              width={26}
              height={18}
              className='max-h-[20px]'
              src={inputImg}
              alt='favicon'
            />
            <span className='ml-[10px] w-full max-w-[197px] line-clamp-1'>
              PicMin | Image Tools
            </span>
          </div>
          <IoCloseSharp className='font-semibold' />
        </div>
        <div className='absolute bottom-0 right-0 h-[43px] border-l-2 border-b-2 border-[#626262] rounded-bl-[5px] bg-inherit w-[71px] flex items-center justify-center text-[#f8f8ff]'>
          <FiPlus className='w-[20px] h-[20px]' />
        </div>
      </div>

      <div className='bg-[#2F3140] w-full pl-[10px] flex items-center space-x-5 h-[55px] text-[#f8f8ff] relative overflow-hidden'>
        <IoArrowBack className='w-[20px] h-[20px]' />
        <IoArrowForward className='w-[20px] h-[20px] text-[#9d9d9d]' />
        <TbReload className='w-[20px] h-[20px]' />
        <div className='w-[250px] h-[43px] bg-[#282A37] rounded-l-[27px] flex items-center space-x-4 pl-3 absolute -right-2'>
          <HiMiniLockClosed className='w-[18px] h-[16px] text-[#aeaeae]' />
          <span>picmin.vercel.app</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className='mb-16 flex items-start justify-around space-x-6'>
      <div>
        <p className='text-sm text-slate-600'>Uploaded Image</p>
        <Image
          src={inputImg}
          alt='Uploaded'
          className='shadow-md w-[110px] h-[100px]'
          width={110}
          height={100}
        />
      </div>

      <div>
        <p className='text-sm text-slate-600'>Browser Tab View</p>
        {favIconTabViewContainer}
      </div>

      <div>
        <p className='text-sm text-slate-600'>Google Result Page View</p>
        <div className='mt-1 bg-white min-h-[108px] min-w-[420px] max-w-[420px] p-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
          <div className='flex items-center space-x-4 h-[30px]'>
            {/* <Image
              width={26}
              height={26}
              className='w-[26px] max-w-[26px] h-[26px] max-h-[26px]'
              src={inputImg}
              alt='favicon'
            /> */}
            {favIconCanvas}

            <div>
              <h2 className='font-semibold text-[#1967d2]'>
                PicMin | Image Tools
              </h2>
              <p className='text-[13px] text-slate-600'>
                https://picmin.vercel.app/favicon-generate
              </p>
            </div>
          </div>

          <p className='mt-3 text-[15px] text-slate-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            explicabo?Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Preview