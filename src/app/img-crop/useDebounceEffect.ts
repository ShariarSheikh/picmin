import { DependencyList, useEffect } from 'react'

export function useDebounceEffect(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => void,
  waitTime: number,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn(...deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
