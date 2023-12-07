'use client'

import { useAppSelector } from '@/redux/hooks'
import EditBox from '@/sections/edit/EditBox'
import SidebarUtils from '@/sections/edit/SidebarUtils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

//---------------------------------------
export type EditToolType =
  | 'favicon-generate'
  | 'size-compress'
  | 'crop'
  | 'file-type-change'
  | 'background-remove '
  | ''

//---------------------------------------

export default function Page() {
  const [toolType, setToolType] = useState<EditToolType>('')
  const originalImg = useAppSelector((state) => state.imgSlice.originalImg)
  const router = useRouter()

  useEffect(() => {
    if (!originalImg) return router.replace('/')
  }, [originalImg, router])
  return (
    <main className='min-h-[80vh] p-16 relative'>
      <div className='w-full flex justify-between max-w-[1290px] p-[20px] mx-auto relative bg-white shadow-sidebar'>
        <EditBox />
        <SidebarUtils toolType={toolType} setToolType={setToolType} />
      </div>
    </main>
  )
}
