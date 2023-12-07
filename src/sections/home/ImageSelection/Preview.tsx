import Button from '@/components/button'
import toolsFeatures from '@/data/toolsFeatures'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { useRouter } from 'next/navigation'

interface PreviewProps {
  previewImg: string
}

const Preview = ({ previewImg }: PreviewProps) => {
  const [selectedQuery, setSelectedQuery] = useState<string[]>([])

  const router = useRouter()

  const toolsQueryHandler = (toolQuery: string) => {
    const isExistsQuery = selectedQuery.includes(toolQuery)

    // If QUERY ALREADY EXISTS THEN REMOVE IT
    if (isExistsQuery) {
      setSelectedQuery((prevQueries) =>
        prevQueries.filter((query) => query !== toolQuery),
      )
    } else {
      setSelectedQuery((prevQueries) => [...prevQueries, toolQuery])
    }
  }

  const goToProcessHandler = () => {
    // add too tools query and push
    router.push(`/edit?tools=${selectedQuery.join(',')}`)
  }

  const toolsContent = (
    <ul className='w-full grid grid-cols-4 gap-6'>
      {toolsFeatures.map((feature, i) => {
        const spittedTitle = feature.title.split(' ')

        const title =
          spittedTitle[0] === 'Image'
            ? `${spittedTitle.slice(1).join(' ')}`
            : spittedTitle.join(' ')

        const isSelected = selectedQuery.includes(feature.query)

        return (
          <li
            key={i}
            onClick={() => toolsQueryHandler(feature.query)}
            style={{
              background: isSelected ? '#0042C7' : 'white',
              color: isSelected ? 'white' : '#0042C7',
            }}
            className='text-sm cursor-pointer flex items-center justify-center px-2 py-1 border border-primary border-opacity-30 rounded-sm hover:bg-primary hover:text-white duration-150'
          >
            {title}
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className='w-full h-full flex justify-between items-center px-6 z-40'>
      <div className='min-w-[350px] max-w-[350px] h-[350px] border border-gray-200 rounded-md relative overflow-hidden'>
        <Image
          src={previewImg}
          fill
          alt='Uploaded Preview'
          className='w-full h-full'
        />
      </div>
      <div className='w-full h-full flex flex-col justify-between items-start px-10 py-10'>
        <div>
          <h1 className='text-start text-xl font-medium mb-4'>Select Tools</h1>
          {toolsContent}
        </div>

        <Button
          onClick={goToProcessHandler}
          disabled={selectedQuery.length === 0}
          style={{
            background: selectedQuery.length === 0 ? '#dcdcdc' : '#0042C7',
            color: selectedQuery.length === 0 ? '#b1b1b1' : 'white',
            cursor: selectedQuery.length === 0 ? 'not-allowed' : 'pointer',
          }}
          className='w-full h-12 rounded-[6px] flex items-center justify-center'
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default Preview
