import { useAvatar } from '@/hooks/useAvatar'
import { useUser } from '@/hooks/useUser'
import { cn } from '@/lib/utils'
import { convertBase64StringToUrl } from '@/utils/convertBase64StringToUrl'
import { useQuery } from '@tanstack/react-query'
import { CircleUserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type UserAvatarProps = {
  className?: string
}

const UserAvatar = ({ className }: UserAvatarProps) => {
  const { fetchAvatar } = useAvatar()
  const { user } = useUser()
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  const { data } = useQuery({
    queryKey: ['userAvatar'],
    queryFn: () => fetchAvatar(user?.id ?? ''),
    enabled: !!user?.id,
    refetchInterval: 1000 * 60 * 5 // 5 minutes
  })

  useEffect(() => {
    if (data) {
      const decodedJPEGUrl = convertBase64StringToUrl(data.avatarBase64, 'jpeg')
      setAvatarUrl(decodedJPEGUrl)
    } else {
      setAvatarUrl('')
    }
  }, [data])

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>
        <CircleUserRound size={12} />
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
