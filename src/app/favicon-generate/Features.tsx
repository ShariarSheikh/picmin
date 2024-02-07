const Features = () => {
  return (
    <div className='w-full max-w-[870px] mx-auto bg-white p-6 rounded-md shadow-md mb-12'>
      <h1 className='text-2xl font-bold mb-4'>Favicon Generator Features</h1>

      <ul className='list-disc pl-10 mb-4'>
        <li className='mb-4'>
          <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
            Text Favicon
          </h2>
          <p className='text-gray-600'>
            Easily generate a favicon with custom text, choosing from various
            fonts and styles.
          </p>
        </li>

        <li className='mb-4'>
          <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
            Image Favicon
          </h2>
          <p className='text-gray-600'>
            Upload your own image to create a personalized favicon for your
            website.
          </p>
        </li>

        <li className='mb-4'>
          <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
            Preview
          </h2>
          <p className='text-gray-600'>
            Visualize your favicon in real-time before downloading it.
          </p>
        </li>

        <li className='mb-4'>
          <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
            Customization
          </h2>
          <p className='text-gray-600'>
            Adjust the size, color, and other parameters to match your
            website&apos;s aesthetic.
          </p>
        </li>

        <li className='mb-4'>
          <h2 className='text-xl font-semibold mb-[3px] text-gray-600'>
            Download Options
          </h2>
          <p className='text-gray-600'>
            Download the generated favicon in various formats for compatibility
            with different browsers.
          </p>
        </li>
      </ul>

      <div className='lg:px-2 rounded-sm min-h-[40px] lg:bg-primary bg-opacity-40 text-black inline py-2'>
        Create a distinctive and eye-catching favicon to enhance your
        website&apos;s identity!
      </div>
    </div>
  )
}

export default Features
