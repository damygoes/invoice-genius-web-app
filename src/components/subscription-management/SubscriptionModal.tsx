import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { useTranslation } from 'react-i18next'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../ui/sheet'
import SubscriptionForm from './SubscriptionForm'

const SubscriptionModal = () => {
  const { isSubscriptionManagementModalOpen, resetModal, subscriptionToEdit } =
    useSubscriptionManagementStore()
  const { t } = useTranslation()

  const ModalTitle =
    subscriptionToEdit && subscriptionToEdit !== null
      ? `${t('subscriptionManagementModal.title.edit', 'Edit Subscription')}`
      : `${t('subscriptionManagementModal.title.add', 'Add Subscription')}`

  const ModalDescription =
    subscriptionToEdit && subscriptionToEdit !== null
      ? `${t('subscriptionManagementModal.description.edit', 'Update the subscription details')}`
      : `${t('subscriptionManagementModal.description.add', 'Please provide the subscription details.')}`
  return (
    <Sheet open={isSubscriptionManagementModalOpen} onOpenChange={resetModal}>
      <SheetContent
        onEscapeKeyDown={resetModal}
        onPointerDownOutside={resetModal}
        side='left'
        className='w-full'
      >
        <SheetHeader>
          <SheetTitle>{ModalTitle}</SheetTitle>
          <SheetDescription>{ModalDescription}</SheetDescription>
        </SheetHeader>
        <div className='my-1 h-5/6'>
          <SubscriptionForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SubscriptionModal
