import { useEffect, useState } from 'react'

interface FontList {
  copyright: string
  family: string
  license: string
  variants: Array<{
    name: string
    style: string
    url: string
    weight: string
  }>
}

interface ReturnType {
  listedFonts: FontList[]
  isLoading: boolean
  onLoadMore: () => void
}

export default function useFontsList(): ReturnType {
  const [fontsData, setFontsData] = useState<FontList[]>([])
  const [listedFonts, setListedFonts] = useState<FontList[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadFonts = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(`https://api.favicon.io/fonts.json`)
      const data = await response.json()

      setFontsData(data)
      // eslint-disable-next-line no-empty
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  }

  const onLoadMore = () => {
    const itemsToAdd = 200

    // Calculate the start index based on the current length of listedFonts
    const startIndex = listedFonts.length

    // Calculate the end index based on the start index and the number of items to add
    const endIndex = startIndex + itemsToAdd

    // Extract the items from fontsData and add them to listedFonts
    const newItems = fontsData.slice(startIndex, endIndex)

    // Update listedFonts state
    setListedFonts((prevListedFonts) => [...prevListedFonts, ...newItems])
  }

  useEffect(() => {
    loadFonts()
  }, [])

  useEffect(() => {
    if (fontsData.length === 0) return
    onLoadMore()
  }, [fontsData])

  return {
    listedFonts,
    isLoading,
    onLoadMore,
  }
}
