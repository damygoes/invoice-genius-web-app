import { useAuthContext } from '@/context/auth-context'
import { ENV_VARIABLES } from '@/lib/env'
import useAxiosInterceptor from '@/services/axios/axiosClient'
import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'
import { useAvatar } from './useAvatar'
import { useUser } from './useUser'

type IAuthStore = {
  intendingUserEmail: string | null
  intendingUserOTP: string | null
  setIntendingUserEmail: (email: string | null) => void
  setIntendingUserOTP: (otp: string) => void
  authStep: number
  setAuthStep: (step: number) => void
  resetStore: () => void
  firstStepCompleted: boolean
  setFirstStepCompleted: (completed: boolean) => void
}

const authStore = create<IAuthStore>(set => ({
  intendingUserEmail: null,
  intendingUserOTP: null,
  setIntendingUserEmail: email => set({ intendingUserEmail: email }),
  setIntendingUserOTP: otp => set({ intendingUserOTP: otp }),
  authStep: 0,
  setAuthStep: step => set({ authStep: step }),
  resetStore: () =>
    set({ intendingUserEmail: null, intendingUserOTP: null, authStep: 0 }),
  firstStepCompleted: false,
  setFirstStepCompleted: completed => set({ firstStepCompleted: completed })
}))

export const useAuth = () => {
  const axiosClient = useAxiosInterceptor()
  const { setAccessToken, setRefreshToken } = useAuthContext()
  const { setUser } = useUser()
  const { setUploadedImageUrl } = useAvatar()
  const navigate = useNavigate()

  const requestOTP = async (email: string) => {
    const response = await axiosClient.post(
      `${ENV_VARIABLES.REQUEST_OTP_URL}`,
      { email }
    )
    return response.data
  }

  const verifyOTP = async (email: string, otp: string) => {
    const response = await axiosClient.post(`${ENV_VARIABLES.VERIFY_OTP_URL}`, {
      email,
      otp
    })
    const { accessToken, refreshToken, user } = response.data
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setUser(user)
    return response.data
  }

  const refreshAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await axiosClient.post(
      `${ENV_VARIABLES.REFRESH_TOKEN_URL}`,
      { refreshToken: storedRefreshToken }
    )
    const { accessToken, refreshToken } = response.data
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    return accessToken
  }

  const logout = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await axiosClient.post(`${ENV_VARIABLES.LOGOUT_URL}`, {
      refreshToken: storedRefreshToken
    })

    if (response.status === 204) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('avatar-upload-storage')
      setUploadedImageUrl('')
      setAccessToken(null)
      setRefreshToken(null)
      navigate('/')
    } else {
      throw new Error('Failed to logout')
    }
  }

  const {
    intendingUserEmail,
    intendingUserOTP,
    setIntendingUserEmail,
    setIntendingUserOTP,
    authStep,
    setAuthStep,
    resetStore,
    firstStepCompleted,
    setFirstStepCompleted
  } = authStore()

  return {
    intendingUserEmail,
    intendingUserOTP,
    setIntendingUserEmail,
    setIntendingUserOTP,
    authStep,
    setAuthStep,
    resetStore,
    requestOTP,
    verifyOTP,
    refreshAccessToken,
    logout,
    firstStepCompleted,
    setFirstStepCompleted
  }
}
