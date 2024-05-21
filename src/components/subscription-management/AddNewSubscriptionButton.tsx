import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

type AddNewSubscriptionButtonProps = {
  className?: string
}

const AddNewSubscriptionButton = ({
  className
}: AddNewSubscriptionButtonProps) => {
  const {
    isSubscriptionManagementModalOpen,
    setSubscriptionManagementModalOpen
  } = useSubscriptionManagementStore()
  const { t } = useTranslation()

  return (
    <Button
      className={cn('self-end', className)}
      onClick={() => setSubscriptionManagementModalOpen(true)}
      disabled={isSubscriptionManagementModalOpen}
    >
      <Plus size={16} className='mr-2' />
      {t('subscriptionManagementPage.addButton', 'Add new subscription')}
    </Button>
  )
}

export default AddNewSubscriptionButton
