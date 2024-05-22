import PageLayout from '@/components/layout/page-layout/PageLayout'
import ProcessSettingsForm from '@/components/process-settings-form/ProcessSettingsForm'
import ResizeablePageLayout from '@/components/resizeable-page-layout/ResizeablePageLayout'
import { useAuthedAppUser } from '@/hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import { lazy } from 'react'

const PrivateUserForm = lazy(
  () => import('@/components/user-profile-form/PrivateUserProfileForm')
)
const BusinessUserForm = lazy(
  () => import('@/components/user-profile-form/BusinessUserProfileForm')
)

const UserProfile = () => {
  const { authedAppUser, getUserProfile } = useAuthedAppUser()

  const {
    data: Profile,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(authedAppUser?.id as string),
    enabled: !!authedAppUser
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  const FormComponent =
    authedAppUser?.userType === 'business' ? (
      <BusinessUserForm profile={Profile} userId={authedAppUser.id} />
    ) : (
      <PrivateUserForm />
    )

  return (
    <PageLayout showHeader={false}>
      <ResizeablePageLayout
        leftSection={FormComponent}
        rightSection={<ProcessSettingsForm />}
      />
    </PageLayout>
  )
}

export default UserProfile
