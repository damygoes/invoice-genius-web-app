import GenericSelect from '@/components/generic-select/GenericSelect'
import PageLayout from '@/components/layout/page-layout/PageLayout'
import { useAuthedAppUser } from '@/hooks/useUser'
import { ProvidedServices } from '@/types/User'
import TransformToGenericSelectOptions from '@/utils/transformToGenericSelectOptions'
import { useMemo, useState } from 'react'

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

  const DashboardContentSelector = () => {
    const dashboardSelectionOptions =
      TransformToGenericSelectOptions(userSelectedServices)
    return (
      <div>
        <GenericSelect
          options={dashboardSelectionOptions}
          selectedOption={serviceDashboard}
          onSelect={setServiceDashboard}
        />
      </div>
    )
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
    <PageLayout pageNavComponent={<DashboardContentSelector />}>
      {renderDashboardContent(serviceDashboard)}
    </PageLayout>
  )
}

export default UserDashboard
