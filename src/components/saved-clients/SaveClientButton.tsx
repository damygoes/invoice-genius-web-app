import { useSavedClient } from '@/features/invoicing-service/saved-clients/useSavedClient'
import { useInvoicing } from '@/features/invoicing-service/utils/useInvoicing'
import { cn } from '@/lib/utils'
import { UserRoundPlus, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, buttonVariants } from '../ui/button'

type SaveClientButtonProps = {
  disabled?: boolean
  className?: string
}

const SaveClientButton = ({ disabled, className }: SaveClientButtonProps) => {
  const { t } = useTranslation()
  const { isClientForm, setClientForm } = useInvoicing()
  const { resetClientStore } = useSavedClient()

  const handleCancelClick = () => {
    resetClientStore()
    setClientForm(false)
  }

  if (isClientForm) {
    return (
      <Button
        onClick={handleCancelClick}
        disabled={disabled}
        variant='secondary'
      >
        <X size={16} className='mr-2' />
        {t('common.cancel', 'Cancel')}
      </Button>
    )
  } else {
    return (
      <Button
        className={cn(buttonVariants({ className }))}
        onClick={() => setClientForm(true)}
        disabled={disabled}
        variant='default'
      >
        <UserRoundPlus size={16} className='mr-2' />
        {t('savedClients.buttons.add', 'Add Client')}
      </Button>
    )
  }
}

export default SaveClientButton
