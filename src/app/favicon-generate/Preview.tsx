import { FC, ReactElement } from 'react'
import { FiPlus } from 'react-icons/fi'
import { HiMiniLockClosed } from 'react-icons/hi2'
import { IoArrowBack, IoArrowForward, IoCloseSharp } from 'react-icons/io5'
import { TbReload } from 'react-icons/tb'

interface IProps {
  favIconCanvas: ReactElement
}

const Preview: FC<IProps> = ({ favIconCanvas }) => {
  const favIconTabViewContainer = (
    <div className='mt-1 bg-[#1E1E2A] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-[151px] w-[380px] max-w-[380px] pt-[8px] rounded-t-[4px] overflow-hidden'>
      <div className='flex items-center h-[48px] bg-inherit relative'>
        <div className='w-[11px] min-w-[11px] bg-inherit absolute bottom-0 left-0 h-[43px] border-r-2 border-b-2 border-[#626262] rounded-br-[5px]' />

        {/* favicon website name close icon container */}
        <div className='ml-[8px] w-[304px] min-w-[304px] h-[48px] text-[#f8f8ff] bg-[#2F3140] px-[14px] py-[8px] border-t-2 border-r border-l border-2 border-[#626262] border-b-0 rounded-t-[10px] flex justify-between items-center'>
          <div className='flex items-center'>
            <div className=''>{favIconCanvas}</div>
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
    <div className='bg-gray-200 rounded-xl p-4 overflow-hidden overflow-x-auto'>
      <h1 className='mb-4 text-lg text-gray-600'>Preview</h1>
      <div className='lg:py-8 flex flex-col lg:flex-row items-start justify-center space-y-8 lg:space-x-8 border border-gray-200 rounded-[6px]'>
        <div>
          <p className='text-sm text-slate-600'>Browser Tab View</p>
          {favIconTabViewContainer}
        </div>

        <div className='pr-4 lg:pr-0'>
          <p className='text-sm text-slate-600'>Google Result Page View</p>
          <div className='mt-1 rounded-t-[4px] bg-white min-h-[108px] min-w-[380px] lg:min-w-[420px] max-w-[420px] p-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
            <div className='flex items-center space-x-4 h-[30px]'>
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
    </div>
  )
}

export default Preview
