import { ENV_VARIABLES } from '@/lib/env'
import axios from 'axios'

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    return null
  }

  try {
    const response = await axios.post(
      ENV_VARIABLES.REFRESH_TOKEN_URL,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200) {
      const { accessToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      return accessToken
    } else {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/'
    }
  } catch (error) {
    console.error('Error refreshing access token', error)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = '/'
  }

  return null
}

export default refreshAccessToken
