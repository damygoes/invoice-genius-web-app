import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../ui/sheet'
import AddSubscriptionForm from './AddSubscriptionForm'

const AddSubscriptionModal = () => {
  const {
    isSubscriptionManagementModalOpen,
    setSubscriptionManagementModalOpen,
    resetModal
  } = useSubscriptionManagementStore()
  return (
    <Sheet
      open={isSubscriptionManagementModalOpen}
      onOpenChange={() => setSubscriptionManagementModalOpen(false)}
    >
      <SheetContent
        onEscapeKeyDown={resetModal}
        onPointerDownOutside={resetModal}
        side='left'
        className='w-full'
      >
        <SheetHeader>
          <SheetTitle>Add Subscription</SheetTitle>
          <SheetDescription>
            Manage your subscriptions and never miss a beat.
          </SheetDescription>
        </SheetHeader>
        <div className='my-1 h-5/6'>
          <AddSubscriptionForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AddSubscriptionModal
