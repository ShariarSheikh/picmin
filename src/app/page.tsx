import Button from '@/components/button'
import toolsFeatures from '@/data/toolsFeatures'
import ImageSelection from '@/sections/home/ImageSelection'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-[80vh] flex-col items-center justify-between p-16 relative'>
      <div className='w-full max-w-[1290px] pt-[20px] mx-auto text-center relative'>
        <ImageSelection />

        <div className='w-full h-full bg-transparent z-[10]'>
          <h1 className='text-[3vw] font-semibold static leading-[7.8vw] text-center text-gray-800'>
            Boots your productivity in a seconds
          </h1>
          <p className='w-full max-w-[580px] text-sm mx-auto mt-4 text-gray-700'>
            LazyOwle will help you remove your image Background and generate
            Favicon. LazyOwle will help you to understand how to use it, by{' '}
            <b className='text-primary cursor-pointer'>Tutorial.</b>
          </p>
          <div className='flex items-center justify-center space-x-5 pt-6'>
            {toolsFeatures.map((feature) => (
              <Link href={`/edit?tools=${feature.query}`} key={feature.title}>
                <Button className='text-primary px-3 bg-white py-1 border border-primary rounded-sm hover:bg-primary hover:text-white duration-150'>
                  {feature.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
