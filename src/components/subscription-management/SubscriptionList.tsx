import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { useAuthedAppUser } from '@/hooks/useUser'
import { SubscriptionDTO } from '@/types/Subscription'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'
import DeleteIcon from '../shared/DeleteIcon'
import { Checkbox } from '../ui/checkbox'
import { MinusCheckbox } from '../ui/minus-checkbox'
import { ScrollArea } from '../ui/scroll-area'
import SubscriptionItem from './SubscriptionItem'

const SubscriptionList = () => {
  const { authedAppUser } = useAuthedAppUser()
  const {
    getUserSubscriptions,
    addSubscriptionToDelete,
    removeSubscriptionToDelete,
    subscriptionsToDelete,
    setDeleteSubscriptionModalOpen
  } = useSubscriptionManagementStore()

  const {
    data: UserSubscriptions,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['user_subscriptions'],
    queryFn: () => getUserSubscriptions(authedAppUser?.id as string),
    enabled: !!authedAppUser
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
    return <div>Skeleton...</div>
  }

  if (isError) {
    return <div>Error Component...</div>
  }

  if (!UserSubscriptions) {
    return null
  }

  const buttonText =
    subscriptionsToDelete.length > 1 ? 'subscriptions' : 'subscription'

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
    <div className='flex h-full w-full flex-col gap-2'>
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
            checked={allSelected}
          />
        )}
        <div className='flex flex-1 items-center justify-start gap-4'>
          {subscriptionsToDelete.length > 0 && (
            <DeleteIcon
              tooltipContent={`Delete ${subscriptionsToDelete.length} ${buttonText}`}
              onClick={() => setDeleteSubscriptionModalOpen(true)}
              renderAs='button'
              buttonClassName='px-0 py-0 h-5'
            />
          )}
        </div>
      </div>
      <ScrollArea className='flex h-full w-full flex-col items-start justify-between gap-5 rounded-lg'>
        <div className='flex w-full flex-col items-start justify-start gap-4'>
          {orderedSubscriptions.length === 0 && (
            <div className='text-lg font-bold'>No Subscriptions</div>
          )}
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
    </div>
  )
}

export default SubscriptionList
