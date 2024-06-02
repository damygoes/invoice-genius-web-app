import { ENV_VARIABLES } from '@/lib/env'
import axios from 'axios'

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      // console.error("No refresh token available");
      throw new Error('No refresh token available')
    }

    const response = await axios.post(
      `${ENV_VARIABLES.REFRESH_TOKEN_URL}`,
      {
        refreshToken
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const newAccessToken = response.data.accessToken
    if (!newAccessToken) {
      console.error('Failed to obtain new access token')
      throw new Error('Failed to obtain new access token')
    }

    // console.log("Successfully refreshed access token:", newAccessToken);

    localStorage.setItem('accessToken', newAccessToken)
    return newAccessToken
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw error
  }
}

export default refreshAccessToken
