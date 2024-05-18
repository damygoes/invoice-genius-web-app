import { useEffect, useState } from 'react'

function useMouseOnSidebar() {
  const [isMouseOnLeftSide, setIsMouseOnLeftSide] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setIsMouseOnLeftSide(event.clientX < window.innerWidth / 2)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return isMouseOnLeftSide
}

export default useMouseOnSidebar
