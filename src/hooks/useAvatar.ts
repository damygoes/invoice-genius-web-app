import useAxiosInterceptor from '@/services/axios/axiosClient'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AvatarUploadStore = {
  uploadedImageUrl: string
  setUploadedImageUrl: (url: string) => void
}

const useAvatarUploadStore = create<AvatarUploadStore>()(
  persist(
    set => ({
      uploadedImageUrl: '',
      setUploadedImageUrl: url => set({ uploadedImageUrl: url })
    }),
    {
      name: 'avatar-upload-storage'
    }
  )
)

export const useAvatar = () => {
  const axiosClient = useAxiosInterceptor()

  const { uploadedImageUrl, setUploadedImageUrl } = useAvatarUploadStore()

  const uploadAvatar = async (formData: FormData) => {
    const result = await axiosClient.post('/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return result.data
  }

  const fetchAvatar = async (userId: string) => {
    const result = await axiosClient.get(`/avatar/${userId}`)
    return result.data
  }

  return {
    uploadAvatar,
    uploadedImageUrl,
    setUploadedImageUrl,
    fetchAvatar
  }
}
