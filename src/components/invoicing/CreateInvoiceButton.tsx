import { useInvoiceStore } from '@/features/invoicing-service/utils/useInvoiceTemplate'
import { useInvoicing } from '@/features/invoicing-service/utils/useInvoicing'
import { cn } from '@/lib/utils'
import { FilePlus2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, buttonVariants } from '../ui/button'

type CreateInvoiceButtonProps = {
  disabled?: boolean
  className?: string
}

const CreateInvoiceButton = ({
  disabled,
  className
}: CreateInvoiceButtonProps) => {
  const { t } = useTranslation()
  const { isInvoiceForm, setInvoiceForm } = useInvoicing()
  const { resetInvoiceTemplateState } = useInvoiceStore()

  const handleCancel = () => {
    resetInvoiceTemplateState()
    setInvoiceForm(false)
  }

  if (isInvoiceForm) {
    return (
      <Button onClick={handleCancel} disabled={disabled} variant='secondary'>
        <X size={16} className='mr-2' />
        {t('common.cancel', 'Cancel')}
      </Button>
    )
  } else {
    return (
      <Button
        className={cn(buttonVariants({ className }))}
        onClick={() => setInvoiceForm(true)}
        disabled={disabled}
        variant='default'
      >
        <FilePlus2 size={16} className='mr-2' />
        {t('invoicingPage.buttons.add', 'Create Invoice')}
      </Button>
    )
  }
}

export default CreateInvoiceButton
