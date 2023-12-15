'use client'

import { store } from '@/redux/store'
import { NextUIProvider } from '@nextui-org/react'
import { Provider as ReduxProvider } from 'react-redux'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </ReduxProvider>
  )
}
