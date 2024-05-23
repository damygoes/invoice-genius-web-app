import { useInvoicing } from '@/features/invoicing-service/utils/useInvoicing'
import { cn } from '@/lib/utils'
import { UserRoundPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, buttonVariants } from '../ui/button'

type SaveClientButtonProps = {
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

const SaveClientButton = ({
  onClick,
  disabled,
  className,
  variant
}: SaveClientButtonProps) => {
  const { t } = useTranslation()
  const { setClientForm } = useInvoicing()

  const handleClick = () => {
    setClientForm(true)
    onClick && onClick()
  }
  return (
    <Button
      className={cn(buttonVariants({ variant, className }))}
      onClick={handleClick}
      disabled={disabled}
      variant={variant}
    >
      <UserRoundPlus size={16} className='mr-2' />
      {t('savedClients.buttons.add', 'Add Client')}
    </Button>
  )
}

export default SaveClientButton
