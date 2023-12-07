import { EditToolType } from '@/app/edit/page'
import base64ToImageFile from '@/app/utils/base64ToImageFile'
import Button from '@/components/button'
import { setEditedImg } from '@/redux/features/imgSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useImgBgRemoveMutation } from '@/redux/services/imageApi'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import SelectTools from './utils/SelectTools'

//----------------------------------------------
interface IProps {
  toolType: EditToolType
  setToolType: Dispatch<SetStateAction<EditToolType>>
}
const SidebarUtils: FC<IProps> = (props) => {
  const [sizeReduce, imgBgRemoveApi] = useImgBgRemoveMutation()
  const { originalImg } = useAppSelector((state) => state.imgSlice)

  const dispatch = useAppDispatch()

  const applyStyleHandler = async () => {
    const formData = new FormData()
    const imgFile = base64ToImageFile(originalImg)
    formData.append('imgData', imgFile)

    sizeReduce({
      imgData: formData,
    })
  }

  useEffect(() => {
    if (imgBgRemoveApi.isLoading || !imgBgRemoveApi.isSuccess) return
    if (!imgBgRemoveApi.data.file) return
    dispatch(setEditedImg({ editedImg: imgBgRemoveApi.data?.file || '' }))
  }, [imgBgRemoveApi.data])

  return (
    <div className='w-full flex flex-col space-y-3 bg-white min-h-[70vh] rounded-[6px] max-w-[776px] px-4 py-2'>
      <div className='w-full h-full flex flex-col justify-between space-y-3 pt-2'>
        <SelectTools {...props} />

        {/* <div className='w-full h-full max-h-[435px] overflow-y-auto sidebarUtilsScrollBar rounded-[6px] p-1'> */}
        {/* {props.toolType === 'sizeReducer' && (
            <ImgReducerTools originalImg={originalImg} editedImg={editedImg} />
          )} */}
        {/* </div> */}
      </div>

      <div>
        {imgBgRemoveApi.isLoading ? (
          <Button
            disabled={imgBgRemoveApi.isLoading}
            className='h-10 w-full bg-[#E5ECF9] text-slate-600 rounded-[6px] mb-3'
          >
            Please Wait...
          </Button>
        ) : (
          <>
            {props.toolType ? (
              <Button
                disabled={imgBgRemoveApi.isLoading}
                onClick={applyStyleHandler}
                className='h-10 w-full bg-primary text-white rounded-[6px] mb-3 active:scale-95 duration-150'
              >
                Apply
              </Button>
            ) : (
              <Button
                disabled
                className='h-10 w-full bg-[#E5ECF9] text-slate-600 rounded-[6px] mb-3'
              >
                Please Select Tool
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SidebarUtils
