import PageLayout from '@/components/layout/page-layout/PageLayout'
import { useAuthedAppUser } from '@/hooks/useUser'

const UserDashboard = () => {
  const { authedAppUser } = useAuthedAppUser()

  if (!authedAppUser) {
    return <div> Dashboard skeleton </div>
  }

  return (
    <PageLayout>
      User Dashboard
      <br />
      {authedAppUser.email}
      <br />
      {authedAppUser.userType}
      <br />
      {authedAppUser.onboarded ? 'Onboarded' : 'Not onboarded'}
      <br />
      {authedAppUser.selectedServices &&
        authedAppUser.selectedServices.join(', ')}
    </PageLayout>
  )
}

export default UserDashboard
