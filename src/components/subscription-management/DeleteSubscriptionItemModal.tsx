import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal'

const DeleteSubscriptionItemModal = () => {
  const {
    subscriptionsToDelete,
    isDeleteSubscriptionModalOpen,
    setDeleteSubscriptionModalOpen,
    setSubscriptionsToDelete
  } = useSubscriptionManagementStore()

  // Extract the names of subscriptions to be deleted
  const subscriptionNames = subscriptionsToDelete
    .map(subscription => subscription.subscriptionName)
    .join(', ')

  return (
    <DeleteConfirmationModal
      isOpen={isDeleteSubscriptionModalOpen}
      onClose={() => {
        setSubscriptionsToDelete([])
        setDeleteSubscriptionModalOpen(false)
      }}
      onDelete={() => {}}
      title='Delete Subscription'
      description={`Are you sure you want to delete the following subscriptions: ${subscriptionNames}?`}
    />
  )
}

export default DeleteSubscriptionItemModal
