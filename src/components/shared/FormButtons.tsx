import { CheckCircle, Edit, Loader, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

type FormButtonsProps = {
  isFormInEditMode: boolean
  setIsFormInEditMode: (value: boolean) => void
  updateMutation: {
    isPending: boolean
  }
}

const FormButtons = ({
  isFormInEditMode,
  setIsFormInEditMode,
  updateMutation
}: FormButtonsProps) => {
  const { t } = useTranslation()

  const handleEditClick = () => setIsFormInEditMode(true)
  const handleCancelClick = () => setIsFormInEditMode(false)

  return (
    <div className='flex w-full items-center justify-between gap-3 overflow-hidden'>
      {isFormInEditMode ? (
        <Button
          type='button'
          variant='outline'
          className='w-1/3'
          onClick={handleCancelClick}
          disabled={updateMutation.isPending}
        >
          <X size={16} className='mr-2' />
          {t('profileForm.buttons.cancel', 'Cancel')}
        </Button>
      ) : (
        <Button
          type='button'
          variant='outline'
          className='w-1/3'
          onClick={handleEditClick}
        >
          <Edit size={16} className='mr-2 shrink-0' />
          {t('profileForm.buttons.edit', 'Edit')}
        </Button>
      )}

      <Button
        type='submit'
        className='flex-1'
        disabled={!isFormInEditMode || updateMutation.isPending}
      >
        {updateMutation.isPending ? (
          <>
            <Loader size={16} className='mr-2 animate-spin' />
            {t('profileForm.updating', 'Updating...')}
          </>
        ) : (
          <>
            <CheckCircle size={16} className='mr-2' />
            {t('profileForm.buttons.update', 'Update')}
          </>
        )}
      </Button>
    </div>
  )
}

export default FormButtons
