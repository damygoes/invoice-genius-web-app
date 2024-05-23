import AuthForm from '@/components/auth/AuthForm'
import OTPForm from '@/components/auth/OTPForm'
import { useAuth } from '@/hooks/useAuth'

const HomePage = () => {
  const { authStep } = useAuth()
  return (
    <div className='h-screen w-screen overflow-hidden lg:grid lg:grid-cols-2'>
      <div className='hidden bg-muted lg:block'>
        <img
          src='https://images.unsplash.com/photo-1698067942087-53f552fe2f59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGludm9pY2V8ZW58MHx8MHx8fDI%3D'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <div className='flex items-center justify-center'>
        {authStep === 0 && <AuthForm />}
        {authStep === 1 && <OTPForm />}
      </div>
    </div>
  )
}

export default HomePage
