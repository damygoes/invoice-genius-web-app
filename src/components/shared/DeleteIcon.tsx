import { cn } from '@/lib/utils'
import { Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type DeleteIconProps = {
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  tooltipContent?: string
  onClick?: () => void
  renderAs?: 'button' | 'icon'
  buttonClassName?: string
}

const DeleteIcon = ({
  side = 'top',
  tooltipContent,
  onClick,
  renderAs = 'icon',
  className,
  buttonClassName
}: DeleteIconProps) => {
  const { t } = useTranslation()
  if (renderAs === 'button') {
    return (
      <Button variant='link' onClick={onClick} className={cn(buttonClassName)}>
        <Trash size={12} strokeWidth={2} className='mr-1' />
        {tooltipContent || `${t('common.delete', 'Delete')}`}
      </Button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild type='button'>
        <Trash
          size={16}
          strokeWidth={1}
          className={cn('cursor-pointer', className)}
          onClick={onClick}
        />
      </TooltipTrigger>
      <TooltipContent side={side}>
        {tooltipContent || `${t('common.delete', 'Delete')}`}
      </TooltipContent>
    </Tooltip>
  )
}

export default DeleteIcon
