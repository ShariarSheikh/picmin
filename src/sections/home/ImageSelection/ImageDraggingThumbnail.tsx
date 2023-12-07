'use client'

const ImageDraggingThumbnail = () => {
  return (
    <div className='bg-white z-20 bg-opacity-[90%] fixed inset-0 h-screen w-screen flex flex-col items-center justify-center'>
      <img
        width={200}
        className='mb-6 bg-white'
        src='https://cdn-icons-png.flaticon.com/512/2729/2729647.png?ga=GA1.1.2086604709.1697816251'
        alt='hand image'
      />
      <h1 className='uppercase font-semibold text-[4vw] text-primary'>
        Yes you can drop your file
      </h1>
    </div>
  )
}

export default ImageDraggingThumbnail
