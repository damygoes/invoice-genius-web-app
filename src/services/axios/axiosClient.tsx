import { ENV_VARIABLES } from '@/lib/env'
import axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig
} from 'axios'
import { useEffect } from 'react'
import refreshAccessToken from './refreshAccessToken'

const axiosClient = axios.create({
  baseURL: ENV_VARIABLES.BASE_URL
})

const useAxiosInterceptor = () => {
  useEffect(() => {
    const requestInterceptor = async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`
        } as AxiosRequestHeaders
      }
      return config
    }

    const responseInterceptor = async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
      }
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true
        const newAccessToken = await refreshAccessToken()
        if (newAccessToken) {
          axios.defaults.headers.common['Authorization'] =
            `Bearer ${newAccessToken}`
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosClient(originalRequest)
        }
      }
      return Promise.reject(error)
    }

    const requestInterceptorId =
      axiosClient.interceptors.request.use(requestInterceptor)
    const responseInterceptorId = axiosClient.interceptors.response.use(
      response => response,
      responseInterceptor
    )

    return () => {
      axiosClient.interceptors.request.eject(requestInterceptorId)
      axiosClient.interceptors.response.eject(responseInterceptorId)
    }
  }, [])

  return axiosClient
}

export default useAxiosInterceptor
