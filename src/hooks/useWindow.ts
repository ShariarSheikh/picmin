import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

const useWindow = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    //@ts-ignore
    width: undefined,
    //@ts-ignore
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial size
    handleResize()

    // Event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array ensures that effect runs only once

  return windowSize
}

export default useWindow
