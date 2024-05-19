import { ENV_VARIABLES } from '@/lib/env'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useEffect } from 'react'

const axiosClient = axios.create({
  baseURL: ENV_VARIABLES.BASE_URL
})

const useAxiosInterceptor = () => {
  const { getToken } = useKindeAuth()

  useEffect(() => {
    const requestInterceptor = async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      const accessToken = await getToken()

      // If not available, return the config without Authorization Header
      if (!accessToken) return config

      if (config.headers) {
        ;(config.headers as AxiosRequestHeaders)['Authorization'] =
          `Bearer ${accessToken}`
      } else {
        config.headers = {
          Authorization: `Bearer ${accessToken}`
        } as AxiosRequestHeaders
      }

      return config
    }

    const interceptorId =
      axiosClient.interceptors.request.use(requestInterceptor)

    return () => {
      // Eject the interceptor when the component unmounts
      axiosClient.interceptors.request.eject(interceptorId)
    }
  }, [getToken])

  return axiosClient
}

export default useAxiosInterceptor
