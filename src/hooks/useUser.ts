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
  const { authedAppUser, setAuthedAppUser, resetAuthedAppUser } = useUserStore()

  return { authedAppUser, setAuthedAppUser, resetAuthedAppUser }
}
