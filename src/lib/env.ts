export const ENV_VARIABLES = {
  KINDE_DOMAIN: `${import.meta.env.VITE_KINDE_DOMAIN}`,
  KINDE_CLIENT_ID: `${import.meta.env.VITE_KINDE_CLIENT_ID}`,
  KINDE_REDIRECT_URI: `${import.meta.env.VITE_KINDE_REDIRECT_URI}`,
  KINDE_LOGOUT_REDIRECT_URI: `${import.meta.env.VITE_KINDE_LOGOUT_REDIRECT_URI}`,
  BASE_URL: `${import.meta.env.VITE_BASE_URL}`,
  REQUEST_OTP_URL: `${import.meta.env.VITE_REQUEST_OTP_URL}`,
  VERIFY_OTP_URL: `${import.meta.env.VITE_VERIFY_OTP_URL}`,
  REFRESH_TOKEN_URL: `${import.meta.env.VITE_REFRESH_TOKEN_URL}`,
  LOGOUT_URL: `${import.meta.env.VITE_LOG_OUT_URL}`,
  SUPABASE_URL: `${import.meta.env.VITE_SUPABASE_URL}`,
  SUPABASE_ANON_KEY: `${import.meta.env.VITE_SUPABASE_ANON_KEY}`
}
