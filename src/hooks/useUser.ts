import { businessUserProfileFormSchemaType } from '@/models/businessUserProfileFormSchema'
import { privateUserProfileFormSchemaType } from '@/models/privateUserProfileFormSchema'
import useAxiosInterceptor from '@/services/axios/axiosClient'
import { AuthUser } from '@/types/User'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type IUserStore = {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
  resetUser: () => void
}

const useUserStore = create<IUserStore>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user: user }),
      resetUser: () => set({ user: null })
    }),
    {
      name: 'authed-user-storage'
    }
  )
)

export const useUser = () => {
  const axiosClient = useAxiosInterceptor()

  const { user, setUser, resetUser } = useUserStore()

  const getUserProfile = async (id: string) => {
    const userDetail = await axiosClient.get(`users/${id}`)
    return userDetail.data
  }

  const updateBusinessUserProfile = async (
    id: string,
    data: businessUserProfileFormSchemaType
  ) => {
    const userDetail = await axiosClient.patch(`users/profile/${id}`, data)
    return userDetail.data
  }

  const updateUserProfile = async (
    id: string,
    data: privateUserProfileFormSchemaType
  ) => {
    const userDetail = await axiosClient.patch(`users/profile/${id}`, data)
    return userDetail.data
  }

  return {
    user,
    setUser,
    resetUser,
    getUserProfile,
    updateBusinessUserProfile,
    updateUserProfile
  }
}
