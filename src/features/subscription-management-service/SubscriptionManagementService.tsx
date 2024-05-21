import DeleteSubscriptionItemModal from '@/components/subscription-management/DeleteSubscriptionItemModal'
import SubscriptionList from '@/components/subscription-management/SubscriptionList'
import { Button } from '@/components/ui/button'
import { useSubscriptionManagementStore } from './utils/useSubscription'

const SubscriptionManagementService = () => {
  const {
    isSubscriptionManagementModalOpen,
    setSubscriptionManagementModalOpen,
    isDeleteSubscriptionModalOpen
  } = useSubscriptionManagementStore()

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-7 p-4'>
      <Button
        className='self-end'
        onClick={() => setSubscriptionManagementModalOpen(true)}
        disabled={isSubscriptionManagementModalOpen}
      >
        Add Subscription
      </Button>
      <SubscriptionList />
      {isDeleteSubscriptionModalOpen && <DeleteSubscriptionItemModal />}
    </section>
  )
}

export default SubscriptionManagementService
