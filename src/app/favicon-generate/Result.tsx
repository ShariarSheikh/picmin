/* eslint-disable react/no-unescaped-entities */
import ex from '@/assets/Helix.png'
import Button from '@/components/button'
import Image from 'next/image'
import { FC, useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'

const Result = () => {
  return (
    <div className='min-h-[600px] flex flex-col justify-between w-full py-5'>
      <div className='pt-5'>
        <div className='pb-5 w-full min-h-[200px]'>
          <div className='flex items-center justify-start'>
            <div>
              <h2>Original Image</h2>
              <Image width={100} height={100} src={ex} alt='original picture' />
            </div>

            <div>
              <h2>Original Image</h2>
              <Image width={100} height={100} src={ex} alt='original picture' />
            </div>
          </div>
        </div>

        <p className='text-[#6e6e78] mb-1 text-sm'>
          Copy and paste the following code into the &lt;head&gt; section of
          your HTML document to include various link and meta tags for favicon
          and touch icons:
        </p>

        <CopyHtml />
      </div>

      <div className='pt-[20px] w-full flex items-center justify-end'>
        <Button
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

const CopyHtml: FC = () => {
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

  return (
    <div className='relative rounded-[10px] p-3 bg-[#262b31]'>
      <Button
        onClick={() => {
          isCopied ? {} : onCopyHandler()
        }}
        className='active:scale-95 duration-150 flex items-center space-x-3 absolute z-20
           right-0 top-0 px-3 py-2 rounded-sm bg-primary text-white rounded-tr-[10px]'
      >
        <FaCopy /> <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </Button>
      <pre ref={ref} className='text-sm text-[#9f9fad] relative z-10'>
        &lt;link <span className='text-blue-300'>rel</span>="
        <span className='text-pink-400'>apple-touch-icon</span>"{' '}
        <span className='text-yellow-300'>sizes</span>="
        <span className='text-yellow-200'>180x180</span>"{' '}
        <span className='text-yellow-300'>href</span>="
        <span className='text-green-300'>/apple-touch-icon.png</span>"&gt;
        <br />
        &lt;link <span className='text-blue-300'>rel</span>="
        <span className='text-yellow-300'>icon</span>"{' '}
        <span className='text-yellow-200'>type</span>="
        <span className='text-yellow-300'>image/png</span>"{' '}
        <span className='text-yellow-300'>sizes</span>="
        <span className='text-yellow-200'>32x32</span>"{' '}
        <span className='text-yellow-300'>href</span>="
        <span className='text-green-300'>/favicon-32x32.png</span>"&gt;
        <br />
        &lt;link <span className='text-blue-300'>rel</span>="
        <span className='text-yellow-300'>icon</span>"{' '}
        <span className='text-yellow-200'>type</span>="
        <span className='text-yellow-300'>image/png</span>"{' '}
        <span className='text-yellow-300'>sizes</span>="
        <span className='text-yellow-200'>16x16</span>"{' '}
        <span className='text-yellow-300'>href</span>="
        <span className='text-green-300'>/favicon-16x16.png</span>"&gt;
        <br />
        &lt;link <span className='text-blue-300'>rel</span>="
        <span className='text-yellow-300'>manifest</span>"{' '}
        <span className='text-yellow-300'>href</span>="
        <span className='text-green-300'>/site.webmanifest</span>"&gt;
        <br />
        &lt;link <span className='text-blue-300'>rel</span>="
        <span className='text-yellow-300'>mask-icon</span>"{' '}
        <span className='text-yellow-300'>href</span>="
        <span className='text-green-300'>/safari-pinned-tab.svg</span>"{' '}
        <span className='text-yellow-300'>color</span>="
        <span className='text-green-300'>#5bbad5</span>"&gt;
        <br />
        &lt;meta <span className='text-yellow-300'>name</span>="
        <span className='text-yellow-300'>msapplication-TileColor</span>"{' '}
        <span className='text-yellow-300'>content</span>="
        <span className='text-green-300'>#da532c</span>"&gt;
        <br />
        &lt;meta <span className='text-yellow-300'>name</span>="
        <span className='text-yellow-300'>theme-color</span>"{' '}
        <span className='text-yellow-300'>content</span>="
        <span className='text-green-300'>#ffffff</span>"&gt;
        <br />
      </pre>
    </div>
  )
}
