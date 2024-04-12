/* eslint-disable react-hooks/exhaustive-deps */
import type { DependencyList } from "react"
import { useEffect } from "react"

export function useDebounceEffect(fn: () => void, waitTime: number, deps?: DependencyList): void {
  useEffect(() => {
    const t = setTimeout(() => {
      if (deps) {
        // eslint-disable-next-line prefer-spread
        fn.apply(undefined, deps as [])
      }
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
