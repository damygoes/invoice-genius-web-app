import UnknownErrorFallback from '@/components/shared/UnknownErrorFallback'
import UserAvatar from '@/components/shared/UserAvatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useUser } from '@/hooks/useUser'
import { useQuery } from '@tanstack/react-query'

const InvoicePreviewItemHeader = () => {
  const { user, getUserProfile } = useUser()
  const {
    data: UserBusinessProfile,
    isLoading: isUserBusinessProfileLoading,
    isError: isUserBusinessProfileError
  } = useQuery({
    queryKey: ['userBusinessProfile'],
    queryFn: () => getUserProfile(user?.id || ''),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!user?.id
  })

  if (!UserBusinessProfile) {
    return null
  }

  if (isUserBusinessProfileLoading) {
    return <Skeleton className='h-8 w-full' />
  }

  if (isUserBusinessProfileError) {
    return <UnknownErrorFallback />
  }

  const UserBusinessStreetAndNumber = `${UserBusinessProfile.businessAddress.street} ${UserBusinessProfile.businessAddress.number}`
  const UserBusinessZipAndCity = `${UserBusinessProfile.businessAddress.zip} ${UserBusinessProfile.businessAddress.city}`

  return (
    <section className='flex w-full items-center justify-between gap-4'>
      <div className='flex flex-1 flex-col items-start justify-start gap-2'>
        <Typography size='xl' className='font-semibold'>
          {UserBusinessProfile.businessName}
        </Typography>
        <div className='flex max-w-52 flex-col font-light'>
          <Typography size='xs'>{UserBusinessStreetAndNumber}</Typography>
          <Typography size='xs'>{UserBusinessZipAndCity}</Typography>
          <Typography size='xs'>
            {UserBusinessProfile.businessAddress.state}
          </Typography>
          <Typography size='xs'>
            {UserBusinessProfile.businessAddress.country}
          </Typography>
        </div>
        <Typography size='xs' className='font-light'>
          {UserBusinessProfile.businessEmail}
        </Typography>
        <Typography size='xs' className='font-light'>
          {UserBusinessProfile.businessWebsite}
        </Typography>
        <Typography size='xs' className='font-light'>
          {UserBusinessProfile.businessMobile}
        </Typography>
      </div>
      <UserAvatar className='size-32' />
    </section>
  )
}

export default InvoicePreviewItemHeader
