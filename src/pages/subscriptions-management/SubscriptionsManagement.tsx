import PageLayout from '@/components/layout/page-layout/PageLayout'
import SubscriptionModal from '@/components/subscription-management/SubscriptionModal'
import SubscriptionManagementService from '@/features/subscription-management-service/SubscriptionManagementService'
import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'

const SubscriptionsManagement = () => {
  const { isSubscriptionManagementModalOpen } = useSubscriptionManagementStore()
  return (
    <PageLayout>
      <SubscriptionManagementService />
      {isSubscriptionManagementModalOpen && <SubscriptionModal />}
    </PageLayout>
  )
}

export default SubscriptionsManagement
