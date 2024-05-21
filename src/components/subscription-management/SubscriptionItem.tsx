import { extractDatesFromSubscription } from '@/features/subscription-management-service/utils/extractDatesFromSubscription'
import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { SubscriptionDTO } from '@/types/Subscription'
import { BellRing, CalendarPlus, Repeat, Rss, ShieldOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '../shared/DeleteIcon'
import DraggableIcon from '../shared/DraggableIcon'
import EditIcon from '../shared/EditIcon'
import TooltipIcon from '../shared/TooltipIcon'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'
import { Typography } from '../ui/typography'
import SubscriptionItemLabel from './SubscriptionItemLabel'

type SubscriptionItemProps = {
  subscription: SubscriptionDTO
}

const SubscriptionItem = ({ subscription }: SubscriptionItemProps) => {
  const { subscriptionDate, expiryDate, reminderDate, creationDate } =
    extractDatesFromSubscription(subscription)

  const {
    setDeleteSubscriptionModalOpen,
    addSubscriptionToDelete,
    subscriptionsToDelete,
    removeSubscriptionToDelete,
    setSubscriptionToEdit,
    setSubscriptionManagementModalOpen
  } = useSubscriptionManagementStore()

  const { t } = useTranslation()

  const handleDeleteSubscription = () => {
    if (subscriptionsToDelete.includes(subscription)) {
      setDeleteSubscriptionModalOpen(true)
    } else {
      addSubscriptionToDelete(subscription)
      setDeleteSubscriptionModalOpen(true)
    }
  }

  const handleMarkSubscriptionForDeletion = () => {
    if (subscriptionsToDelete.includes(subscription)) {
      removeSubscriptionToDelete(subscription.id)
      return
    } else {
      addSubscriptionToDelete(subscription)
    }
  }

  const handleEditSubscriptionItem = () => {
    setSubscriptionToEdit(subscription)
    setSubscriptionManagementModalOpen(true)
  }

  return (
    <div className='group flex min-h-10 w-full flex-wrap items-center justify-between gap-5 overflow-hidden rounded-xl bg-card px-2 py-1 shadow-sm'>
      <div className='flex w-12 items-center justify-start gap-1'>
        <DraggableIcon className='invisible group-hover:visible' />
        <Checkbox
          className='size-4 rounded-xs'
          onCheckedChange={handleMarkSubscriptionForDeletion}
          checked={subscriptionsToDelete.includes(subscription)}
        />
      </div>
      <div className='min-w-52 shrink-0'>
        <Typography className='font-semibold'>
          {subscription.subscriptionName}
        </Typography>
      </div>
      <SubscriptionItemLabel
        label={
          <TooltipIcon
            icon={Rss}
            tooltipContent={`${t('subscriptionManagementListItems.subscriptionDate', 'Subscription date')}`}
          />
        }
        value={subscriptionDate}
      />
      <SubscriptionItemLabel
        label={
          <TooltipIcon
            icon={ShieldOff}
            tooltipContent={`${t('subscriptionManagementListItems.expirationDate', 'Expiry date')}`}
          />
        }
        value={expiryDate}
      />
      {subscription.recurringInterval && (
        <Badge>
          <TooltipIcon
            icon={Repeat}
            tooltipContent={t(
              'subscriptionManagementListItems.recurring',
              'Recurring interval'
            )}
          />

          {subscription.recurringInterval}
        </Badge>
      )}
      {subscription.reminderPeriod ? (
        <SubscriptionItemLabel
          label={
            <TooltipIcon
              icon={BellRing}
              tooltipContent={t(
                'subscriptionManagementListItems.reminder',
                'Reminder date'
              )}
            />
          }
          value={reminderDate}
        />
      ) : (
        <SubscriptionItemLabel
          label={<TooltipIcon icon={BellRing} tooltipContent='Reminder date' />}
          value={t('subscriptionManagementListItems.noReminder', 'No reminder')}
        />
      )}

      {subscription.subscriptionCategory &&
        subscription.subscriptionCategory !== '' && (
          <Badge>{subscription.subscriptionCategory}</Badge>
        )}
      <SubscriptionItemLabel
        label={
          <TooltipIcon
            icon={CalendarPlus}
            tooltipContent={t(
              'subscriptionManagementListItems.creationDate',
              'Creation date'
            )}
          />
        }
        value={creationDate}
      />
      <section className='invisible flex items-center gap-4 group-hover:visible'>
        <EditIcon
          tooltipContent={`${t('subscriptionManagementItemButtons.edit', 'Edit subscription')}`}
          onClick={handleEditSubscriptionItem}
        />
        <DeleteIcon
          tooltipContent={`${t('subscriptionManagementItemButtons.delete', 'Delete subscription')}`}
          onClick={handleDeleteSubscription}
        />
      </section>
    </div>
  )
}

export default SubscriptionItem
