import ImageInputButton from '@/components/ImageInputButton'
import { useState } from 'react'
import Result from './Result'

export default function ImageInput() {
  const [imageInput, setImageInput] = useState<string>('')

  const isLoading = false
  const isSuccess = true

  return (
    <div className='w-full min-h-[300px] py-3'>
      {imageInput && (
        <>
          {isSuccess && <Result />}

          {isLoading && (
            <div className=' w-full min-h-[300px] flex justify-center items-center'>
              <span className='text-gray-500'>Creating Your Favicon...</span>
            </div>
          )}
        </>
      )}

      {!imageInput && (
        <div className='bg-gray-200 w-full min-h-[300px] flex justify-center items-center'>
          <ImageInputButton image='' setImage={setImageInput} />
        </div>
      )}
    </div>
  )
}
