import { CameraContext } from '@/components/camera/CameraProvider'
import { useContext } from 'react'

export const useCamera = () => {
  const context = useContext(CameraContext)
  if (context === undefined) {
    throw new Error('useCamera must be used within a CameraProvider')
  }
  return context
}
