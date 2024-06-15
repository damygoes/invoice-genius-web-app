import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { useUser } from '@/hooks/useUser'
import { SubscriptionDTO } from '@/types/Subscription'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '../shared/DeleteIcon'
import EmptyDataRenderer from '../shared/EmptyDataRenderer'
import LoadingSkeleton from '../shared/LoadingSkeleton'
import UnknownErrorFallback from '../shared/UnknownErrorFallback'
import { Checkbox } from '../ui/checkbox'
import { MinusCheckbox } from '../ui/minus-checkbox'
import { ScrollArea } from '../ui/scroll-area'
import AddNewSubscriptionButton from './AddNewSubscriptionButton'
import SubscriptionItem from './SubscriptionItem'

const SubscriptionList = () => {
  const { user } = useUser()
  const {
    getUserSubscriptions,
    addSubscriptionToDelete,
    removeSubscriptionToDelete,
    subscriptionsToDelete,
    setDeleteSubscriptionModalOpen
  } = useSubscriptionManagementStore()
  const { t } = useTranslation()

  const {
    data: UserSubscriptions,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['user_subscriptions'],
    queryFn: () => getUserSubscriptions(user?.id as string),
    enabled: !!user,
    refetchInterval: 5000 // 5 seconds
  })

  const [orderedSubscriptions, setOrderedSubscriptions] = useState<
    SubscriptionDTO[]
  >([])

  useEffect(() => {
    if (UserSubscriptions) {
      setOrderedSubscriptions(UserSubscriptions)
    }
  }, [UserSubscriptions])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError) {
    return <UnknownErrorFallback />
  }

  if (!UserSubscriptions) {
    return null
  }

  const buttonText =
    subscriptionsToDelete.length > 1
      ? `${t('subscriptionManagementPage.buttonText.plural', 'subscriptions')}`
      : `${t('subscriptionManagementPage.buttonText.singular', 'subscription')}`

  const allSelected = orderedSubscriptions.every(subscription =>
    subscriptionsToDelete.some(toDelete => toDelete.id === subscription.id)
  )

  const someSelected = orderedSubscriptions.some(subscription =>
    subscriptionsToDelete.some(toDelete => toDelete.id === subscription.id)
  )

  const handleMarkAllSubscriptionsForDeletion = () => {
    if (allSelected) {
      orderedSubscriptions.forEach(subscription => {
        removeSubscriptionToDelete(subscription.id)
      })
    } else {
      orderedSubscriptions.forEach(subscription => {
        if (
          !subscriptionsToDelete.some(
            toDelete => toDelete.id === subscription.id
          )
        ) {
          addSubscriptionToDelete(subscription)
        }
      })
    }
  }

  const handleUnmarkAllSubscriptionsForDeletion = () => {
    orderedSubscriptions.forEach(subscription => {
      removeSubscriptionToDelete(subscription.id)
    })
  }

  const handleTopCheckboxChange = () => {
    if (allSelected || someSelected) {
      handleUnmarkAllSubscriptionsForDeletion()
    } else {
      handleMarkAllSubscriptionsForDeletion()
    }
  }

  return (
    <section className='flex h-full w-full flex-col gap-2'>
      {orderedSubscriptions.length === 0 ? (
        <EmptyDataRenderer
          title={`${t('subscriptionManagementPage.emptyState.title', 'No subscriptions')}`}
          description={`${t('subscriptionManagementPage.emptyState.description', 'You have not added any subscriptions yet')}`}
          withActionButton
          actionComponent={
            <AddNewSubscriptionButton className='mt-4 self-auto' />
          }
        />
      ) : (
        <>
          <div className='flex w-full items-center justify-start gap-3 overflow-hidden py-1 pl-[1.6rem]'>
            {someSelected && !allSelected ? (
              <MinusCheckbox
                className='size-5 rounded-xs'
                checked
                onCheckedChange={handleTopCheckboxChange}
              />
            ) : (
              <Checkbox
                className='size-5 rounded-xs'
                onCheckedChange={handleTopCheckboxChange}
                checked={allSelected && orderedSubscriptions.length > 0}
              />
            )}
            <div className='flex flex-1 items-center justify-start gap-4'>
              {subscriptionsToDelete.length > 0 && (
                <DeleteIcon
                  tooltipContent={`${t('common.delete', 'Delete')} ${subscriptionsToDelete.length} ${buttonText}`}
                  onClick={() => setDeleteSubscriptionModalOpen(true)}
                  renderAs='button'
                  buttonClassName='px-0 py-0 h-5'
                />
              )}
            </div>
          </div>
          <ScrollArea className='flex h-full w-full flex-col items-start justify-between gap-5 rounded-lg'>
            <div className='flex w-full flex-col items-start justify-start gap-4'>
              <Reorder.Group
                axis='y'
                values={orderedSubscriptions}
                onReorder={setOrderedSubscriptions}
                className='flex w-full flex-col gap-2'
              >
                <AnimatePresence>
                  {orderedSubscriptions.map(subscription => {
                    return (
                      <Reorder.Item key={subscription.id} value={subscription}>
                        <SubscriptionItem
                          key={subscription.id}
                          subscription={subscription}
                        />
                      </Reorder.Item>
                    )
                  })}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          </ScrollArea>
        </>
      )}
    </section>
  )
}

export default SubscriptionList
