import { Dispatch, FC, SetStateAction } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { FaFileImage } from 'react-icons/fa'
import Button from '../button'

//------------------------------------
interface IProps {
  image: string
  setImage: Dispatch<SetStateAction<string>>
}
//------------------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageInputButton: FC<IProps> = ({ image, setImage }) => {
  const { getInputProps, getRootProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    noDrag: true,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/avif': ['.avif'],
    },

    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      const reader = new FileReader()
      reader.onload = () => {
        // set new image
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    },
  })

  return (
    <Button
      style={{ border: '0px dashed white' }}
      className='bg-primary active:scale-95 px-2 duration-150 text-white text-sm h-10 rounded-[6px] flex space-x-2 items-center justify-center relative overflow-hidden'
    >
      <FaFileImage /> <span>Add New Image</span>
      <div
        {...(getRootProps() as DropzoneRootProps)}
        className='h-full w-full bg-transparent absolute inset-0'
      >
        <input
          {...(getInputProps() as DropzoneRootProps)}
          className='h-full w-full'
        />
      </div>
    </Button>
  )
}

export default ImageInputButton
