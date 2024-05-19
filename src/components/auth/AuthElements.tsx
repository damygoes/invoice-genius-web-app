import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { Button } from '../ui/button'

const AuthElements = () => {
  const { login, register } = useKindeAuth()

  return (
    <div className='flex h-full w-full items-center justify-evenly gap-4'>
      {/* @ts-expect-error : I need to figure out why this is throwing error. Doesn't work with this either - event: React.MouseEvent<HTMLButtonElement> */}
      <Button onClick={login}>Login</Button>
      {/* @ts-expect-error : I need to figure out why this is throwing error */}
      <Button onClick={register}>Sign Up</Button>
    </div>
  )
}

export default AuthElements
