import { useEffect, useState } from 'react'

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const ScreenSizeMap: { [key: string]: number } = {
  xs: 576,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}

const getScreenSize = (width: number): ScreenSize => {
  if (width >= ScreenSizeMap.xl) return 'xl'
  if (width >= ScreenSizeMap.lg) return 'lg'
  if (width >= ScreenSizeMap.md) return 'md'
  if (width >= ScreenSizeMap.sm) return 'sm'
  return 'xs'
}

const useMediaQuery = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window !== 'undefined') {
      return getScreenSize(window.innerWidth)
    }
    return 'lg' // Default to 'xl' when running in a non-browser environment
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}

export default useMediaQuery
