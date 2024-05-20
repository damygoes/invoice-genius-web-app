import PageLayout from '@/components/layout/page-layout/PageLayout'
import ProcessSettingsForm from '@/components/process-settings-form/ProcessSettingsForm'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
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
      <ResizablePanelGroup direction='horizontal' className='space-x-4 p-8'>
        <ResizablePanel className='h-full w-full overflow-auto rounded-xl bg-card p-4 shadow-sm'>
          {FormComponent}
        </ResizablePanel>
        <ResizableHandle className='my-auto h-4/5 bg-muted-foreground' />
        <ResizablePanel className='h-full w-full rounded-xl bg-card p-4 shadow-sm'>
          <ProcessSettingsForm />
        </ResizablePanel>
      </ResizablePanelGroup>
    </PageLayout>
  )
}

export default UserProfile
