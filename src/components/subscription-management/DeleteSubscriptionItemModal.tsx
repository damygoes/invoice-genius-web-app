import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { useUser } from '@/hooks/useUser'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal'
import { useToast } from '../ui/use-toast'

const DeleteSubscriptionItemModal = () => {
  const queryClient = new QueryClient()
  const {
    subscriptionsToDelete,
    isDeleteSubscriptionModalOpen,
    setDeleteSubscriptionModalOpen,
    setSubscriptionsToDelete,
    deleteSubscription
  } = useSubscriptionManagementStore()
  const { user } = useUser()
  const { toast } = useToast()
  const { t } = useTranslation()

  // Extract the names of subscriptions to be deleted
  const subscriptionNames = subscriptionsToDelete
    .map(subscription => subscription.subscriptionName)
    .join(', ')

  const subscriptionsToDeleteIds = useMemo(() => {
    return subscriptionsToDelete.map(subscription => subscription.id)
  }, [subscriptionsToDelete])

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteSubscription(subscriptionsToDeleteIds, user?.id as string),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['user_subscriptions']
      })
    }
  })

  const handleDeleteSubscription = () => {
    try {
      deleteMutation.mutate()
      setSubscriptionsToDelete([])
      setDeleteSubscriptionModalOpen(false)
      toast({
        title: `${t('subscriptionManagementDeleteModal.toasts.success.title', 'Subscription(s) deleted')}`,
        description: `${t('subscriptionManagementDeleteModal.toasts.success.description', 'The subscription(s) have been deleted successfully')} ${subscriptionNames}`
      })
    } catch (error) {
      console.error(error)
      toast({
        title: `${t('subscriptionManagementDeleteModal.toasts.error.title', 'Error')}`,
        description: `${t('subscriptionManagementDeleteModal.toasts.error.description', 'An error occurred while deleting the subscription(s)')}`,
        variant: 'destructive'
      })
    }
  }

  return (
    <DeleteConfirmationModal
      isOpen={isDeleteSubscriptionModalOpen}
      onClose={() => {
        setSubscriptionsToDelete([])
        setDeleteSubscriptionModalOpen(false)
      }}
      onDelete={handleDeleteSubscription}
      title={t(
        'subscriptionManagementDeleteModal.title',
        'Delete Subscription'
      )}
      description={`${t('subscriptionManagementDeleteModal.description', 'Are you sure you want to delete the following subscription(s)?')} ${subscriptionNames}`}
      isLoading={deleteMutation.isPending}
      loadingText={t(
        'subscriptionManagementDeleteModal.loadingText',
        'Deleting...'
      )}
      disabled={deleteMutation.isPending}
    />
  )
}

export default DeleteSubscriptionItemModal
