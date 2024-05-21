import { Loader, Pencil, Plus } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

interface SubscriptionFormSubmitButtonProps {
  isPending: boolean
  isEditMode: boolean
}

const SubscriptionFormSubmitButton: React.FC<
  SubscriptionFormSubmitButtonProps
> = ({ isPending, isEditMode }) => {
  const { t } = useTranslation()
  return (
    <Button type='submit' disabled={isPending}>
      {isPending ? (
        <>
          <Loader className='mr-2 animate-spin' />
          {isEditMode
            ? `${t('subscriptionManagementFormButtons.updatePending', 'Updating Subscription...')}`
            : `${t('subscriptionManagementFormButtons.addPending', 'Adding Subscription...')}`}
        </>
      ) : (
        <>
          {isEditMode ? (
            <Pencil className='mr-2' size={14} />
          ) : (
            <Plus className='mr-2' size={14} />
          )}
          {isEditMode
            ? `${t('subscriptionManagementFormButtons.update', 'Update Subscription')}`
            : `${t('subscriptionManagementFormButtons.add', 'Add Subscription')}`}
        </>
      )}
    </Button>
  )
}

export default SubscriptionFormSubmitButton
