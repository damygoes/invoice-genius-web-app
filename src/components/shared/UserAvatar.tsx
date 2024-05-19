import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { CircleUserRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const UserAvatar = () => {
  const { user } = useKindeAuth()
  return (
    <Avatar>
      <AvatarImage src={user?.picture ?? ''} />
      <AvatarFallback>
        <CircleUserRound size={12} />
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
