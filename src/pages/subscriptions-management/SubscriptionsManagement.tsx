import PageLayout from '@/components/layout/page-layout/PageLayout'
import AddSubscriptionModal from '@/components/subscription-management/AddSubscriptionModal'
import SubscriptionManagementService from '@/features/subscription-management-service/SubscriptionManagementService'
import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'

const SubscriptionsManagement = () => {
  const { isSubscriptionManagementModalOpen } = useSubscriptionManagementStore()
  return (
    <PageLayout>
      <SubscriptionManagementService />
      {isSubscriptionManagementModalOpen && <AddSubscriptionModal />}
    </PageLayout>
  )
}

export default SubscriptionsManagement
