import PageLayout from '@/components/layout/page-layout/PageLayout'
import { useAuthedAppUser } from '@/hooks/useUser'
import { ProvidedServices } from '@/types/User'
import { useMemo, useState } from 'react'
import DashboardContentSelector from './DashboardContentSelector'

const UserDashboard = () => {
  const { authedAppUser } = useAuthedAppUser()
  const userSelectedServices = useMemo(
    () => authedAppUser?.selectedServices ?? [],
    [authedAppUser?.selectedServices]
  )
  const [serviceDashboard, setServiceDashboard] = useState<ProvidedServices>(
    userSelectedServices[0]
  )

  if (!authedAppUser) {
    return <div> Dashboard skeleton </div>
  }

  const renderDashboardContent = (serviceDashboard: ProvidedServices) => {
    switch (serviceDashboard) {
      case 'receiptManagement':
        return <div>Receipt Management content</div>
      case 'subscriptionManagement':
        return <div>Subscription Management content</div>
      case 'invoicing':
        return <div>Invoicing content</div>
      default:
        return (
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome to your dashboard! Select a service from the dropdown to
              view its content.
            </p>
          </div>
        )
    }
  }

  return (
    <PageLayout
      pageNavComponent={
        <DashboardContentSelector
          selectedServices={userSelectedServices}
          selected={serviceDashboard}
          onSelect={setServiceDashboard}
        />
      }
    >
      {renderDashboardContent(serviceDashboard)}
    </PageLayout>
  )
}

export default UserDashboard
