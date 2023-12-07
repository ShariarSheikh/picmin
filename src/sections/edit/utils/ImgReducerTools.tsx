import base64ToImageFile from '@/app/utils/base64ToImageFile'
import calculateFileSize from '@/app/utils/calculateFileSize'
import getImageDimension from '@/app/utils/getImageDimensions'
import { useEffect, useState } from 'react'

const ImgReducerTools = ({
  originalImg,
  editedImg,
}: {
  originalImg: string
  editedImg: string
}) => {
  const [originalFileInfo, setOriginalFileInfo] = useState({
    file: '',
    height: 0,
    width: 0,
    size: '',
  })

  const [editedFileInfo, setEditedFileInfo] = useState({
    file: '',
    height: 0,
    width: 0,
    size: '',
  })

  useEffect(() => {
    if (!originalImg) return
    ;(async function () {
      const dimension = await getImageDimension(base64ToImageFile(originalImg))
      const size = calculateFileSize(originalImg)

      setOriginalFileInfo({
        file: originalImg,
        width: dimension.width,
        height: dimension.height,
        size: size,
      })
    })()
  }, [originalImg])

  useEffect(() => {
    if (!editedImg)
      return setEditedFileInfo({
        file: '',
        width: 0,
        height: 0,
        size: '',
      })
    ;(async function () {
      const dimension = await getImageDimension(base64ToImageFile(editedImg))
      const size = calculateFileSize(editedImg)

      setEditedFileInfo({
        file: editedImg,
        width: dimension.width,
        height: dimension.height,
        size: size,
      })
    })()
  }, [editedImg, originalImg])

  return (
    <ul className='h-full w-full max-w-[670px] pt-12'>
      {originalFileInfo.file && (
        <li className='mb-6 p-[10px] border border-primary rounded-[6px]'>
          <h1>Original File Info</h1>
          <div className='mb-2 flex items-center space-x-2'>
            <span>Size</span>
            <span>{originalFileInfo.size}</span>
          </div>

          <div className='flex items-center space-x-2'>
            <span>Dimension:</span>
            <span className='bg-gray-200 px-4 py-1 rounded-[6px] text-sm'>
              {originalFileInfo.width}
            </span>
            <span className='bg-gray-200 px-4 py-1 rounded-[6px] text-sm'>
              {originalFileInfo.height}
            </span>
          </div>
        </li>
      )}

      {editedFileInfo.file && (
        <li className='mb-8 p-[10px] border border-green-500 rounded-[6px]'>
          <h1>Edited File Info</h1>
          <div className='mb-2 flex items-center space-x-2'>
            <span>Size</span>
            <span>{editedFileInfo.size}</span>
          </div>

          <div className='flex items-center space-x-2'>
            <span>Dimension:</span>
            <span className='bg-gray-200 px-4 py-1 rounded-[6px] text-sm'>
              {editedFileInfo.width}
            </span>
            <span className='bg-gray-200 px-4 py-1 rounded-[6px] text-sm'>
              {editedFileInfo.height}
            </span>
          </div>
        </li>
      )}
    </ul>
  )
}

export default ImgReducerTools
