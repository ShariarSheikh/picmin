/* eslint-disable react/no-unescaped-entities */
import Button from '@/components/button'
import { FC, createElement, useEffect, useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { FaFileZipper } from 'react-icons/fa6'
import base64ToZipFile from '../utils/base64ToZipFile'

//----------------------------------
interface IProps {
  htmlLinks: string
  zipFileBase64: string
}

const Result: FC<IProps> = ({ htmlLinks, zipFileBase64 }) => {
  const [zipFile, setZipFile] = useState<Blob>()

  // download zip file
  const downloadHandler = () => {
    if (!zipFile)
      return alert('Sorry! something is wrong. Please contact support.')

    const url = URL.createObjectURL(zipFile)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style.display = 'none'
    a.href = url
    a.download = 'favicon.zip'
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  // convert base54 file to zip file
  useEffect(() => {
    if (!htmlLinks || !zipFileBase64) return
    const convertToZip = base64ToZipFile(zipFileBase64)
    setZipFile(convertToZip)
  }, [htmlLinks, zipFileBase64])
  return (
    <div className='min-h-[600px] flex flex-col justify-between w-full py-5'>
      <div className='lg:pt-5'>
        <h1 className='text-2xl mb-3 font-semibold'>Your favicon is ready!</h1>
        <p className='text-[#6e6e78] mb-1 text-sm'>
          Copy and paste the following code into the &lt;head&gt; section of
          your HTML document to include various link and meta tags for favicon
          and touch icons:
        </p>
        <CopyHtml links={htmlLinks} />
      </div>

      <div className='w-full flex items-center justify-center mt-4'>
        <FaFileZipper className='w-[100px] h-[120px] text-gray-600' />
      </div>

      <div className='pt-[20px] w-full flex items-center justify-center'>
        <Button
          onClick={downloadHandler}
          type='button'
          className='inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white'
        >
          <svg
            className='w-3 h-3 me-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z' />
            <path d='M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z' />
          </svg>
          Download Favicon
        </Button>
      </div>
    </div>
  )
}

export default Result

const CopyHtml: FC<{ links: string }> = ({ links }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const ref = useRef<HTMLPreElement>(null)

  const onCopyHandler = async () => {
    if (!ref.current) return

    const codeContent = ref.current.innerText

    try {
      await navigator.clipboard.writeText(codeContent)
      setIsCopied(true)
    } catch (error) {
      alert('Unable to copy. Please contact support.')
    } finally {
      setTimeout(() => {
        if (!isCopied) {
          setIsCopied(false)
        }
      }, 5000)
    }
  }

  const decodedHtml = createElement('div', {
    dangerouslySetInnerHTML: { __html: links },
    className:
      'text-[#9f9fad] relative z-10 flex flex-col text-base space-y-[3px]',
    ref: ref,
  })

  return (
    <div className='relative rounded-[10px] p-5 bg-[#262b31]'>
      <Button
        onClick={() => {
          isCopied ? {} : onCopyHandler()
        }}
        className='active:scale-95 duration-150 flex items-center space-x-3 absolute z-20
           right-0 top-0 px-3 py-2 rounded-sm bg-primary text-white rounded-tr-[10px]'
      >
        <FaCopy /> <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </Button>
      {decodedHtml}
    </div>
  )
}
