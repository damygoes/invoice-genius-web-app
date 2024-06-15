import AddNewSubscriptionButton from '@/components/subscription-management/AddNewSubscriptionButton'
import DeleteSubscriptionItemModal from '@/components/subscription-management/DeleteSubscriptionItemModal'
import SubscriptionList from '@/components/subscription-management/SubscriptionList'
import { useSubscriptionManagementStore } from './utils/useSubscription'

const SubscriptionManagementService = () => {
  const { isDeleteSubscriptionModalOpen } = useSubscriptionManagementStore()

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-7 p-4'>
      <AddNewSubscriptionButton />
      <SubscriptionList />
      {isDeleteSubscriptionModalOpen && <DeleteSubscriptionItemModal />}
    </section>
  )
}

export default SubscriptionManagementService
