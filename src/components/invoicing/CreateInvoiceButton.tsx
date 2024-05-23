import { useInvoicing } from '@/features/invoicing-service/utils/useInvoicing'
import { cn } from '@/lib/utils'
import { FilePlus2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, buttonVariants } from '../ui/button'

type CreateInvoiceButtonProps = {
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

const CreateInvoiceButton = ({
  onClick,
  disabled,
  className,
  variant
}: CreateInvoiceButtonProps) => {
  const { t } = useTranslation()
  const { setInvoiceForm } = useInvoicing()

  const handleClick = () => {
    setInvoiceForm(true)
    onClick && onClick()
  }
  return (
    <Button
      className={cn(buttonVariants({ variant, className }))}
      onClick={handleClick}
      disabled={disabled}
      variant={variant}
    >
      <FilePlus2 size={16} className='mr-2' />
      {t('invoicingPage.buttons.add', 'Create Invoice')}
    </Button>
  )
}

export default CreateInvoiceButton
