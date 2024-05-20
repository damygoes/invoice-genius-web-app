import { businessUserProfileFormSchemaType } from '@/models/businessUserProfileFormSchema'
import useAxiosInterceptor from '@/services/axios/axiosClient'
import { AuthUser } from '@/types/User'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type IUserStore = {
  authedAppUser: AuthUser | null
  setAuthedAppUser: (user: AuthUser) => void
  resetAuthedAppUser: () => void
}

const useUserStore = create<IUserStore>()(
  persist(
    set => ({
      authedAppUser: null,
      setAuthedAppUser: user => set({ authedAppUser: user }),
      resetAuthedAppUser: () => set({ authedAppUser: null })
    }),
    {
      name: 'authed-user-storage'
    }
  )
)

export const useAuthedAppUser = () => {
  const axiosClient = useAxiosInterceptor()

  const { authedAppUser, setAuthedAppUser, resetAuthedAppUser } = useUserStore()

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

  return {
    authedAppUser,
    setAuthedAppUser,
    resetAuthedAppUser,
    getUserProfile,
    updateBusinessUserProfile
  }
}
