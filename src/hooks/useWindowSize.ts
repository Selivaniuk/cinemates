'use client'

import { useEffect, useState } from 'react'

type Size = Record<'width' | 'height', number | undefined>

export const DESKTOP_WIDTH = 1920
export const LAPTOP_WIDTH = 1440
export const TABLE_WIDTH = 1024
export const MOBILE_WIDTH = 720

const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
export default useWindowSize
