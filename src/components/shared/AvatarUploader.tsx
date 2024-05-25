import { useAvatar } from '@/hooks/useAvatar'
import { cn } from '@/lib/utils'
import { convertBase64StringToUrl } from '@/utils/convertBase64StringToUrl'
import { Edit, Loader, UserCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

type AvatarUploaderProps = {
  defaultAvatarUrl?: string
  containerClassName?: string
  avatarClassName?: string
  isLoading?: boolean
}

const AvatarUploader = ({
  defaultAvatarUrl,
  containerClassName,
  avatarClassName,
  isLoading
}: AvatarUploaderProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { uploadAvatar, uploadedImageUrl, setUploadedImageUrl } = useAvatar()

  const fileUploadRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    fileUploadRef?.current?.click()
  }

  const uploadImageDisplay = async () => {
    const uploadedFile = fileUploadRef?.current?.files?.[0]
    if (!uploadedFile) return

    const formData = new FormData()
    formData.append('file', uploadedFile)
    setIsUploading(true)
    try {
      const response = await uploadAvatar(formData)
      const decodedJPEGUrl = convertBase64StringToUrl(
        response.avatarBase64,
        'jpeg'
      )
      setUploadedImageUrl(decodedJPEGUrl)
    } catch (error) {
      console.error('Error uploading file', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={cn('relative m-8 size-24', containerClassName)}>
      {isLoading || isUploading ? (
        <div className='flex h-full w-full items-center justify-center rounded-full border-none'>
          <Loader className='animate-spin' />
        </div>
      ) : (
        <Avatar className={cn('h-full w-full rounded-full', avatarClassName)}>
          <AvatarImage
            src={defaultAvatarUrl ?? uploadedImageUrl}
            alt='user profile picture'
            className='h-full w-full rounded-full object-cover'
          />
          <AvatarFallback>
            <UserCircle size={64} strokeWidth={1} />
          </AvatarFallback>
        </Avatar>
      )}
      <form id='form' encType='multipart/form-data'>
        <Button
          type='submit'
          size='icon'
          variant='ghost'
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleImageUpload(e)
          }
          className='flex-center absolute -bottom-4 -right-4'
        >
          <Edit size={16} />
        </Button>
        <Input
          type='file'
          id='file'
          ref={fileUploadRef}
          className='hidden'
          onChange={uploadImageDisplay}
        />
      </form>
    </div>
  )
}

export default AvatarUploader
