import { cn } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type EditIconProps = {
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  tooltipContent?: string
  onClick?: () => void
}

const EditIcon = ({
  side = 'top',
  tooltipContent,
  onClick,
  className
}: EditIconProps) => {
  const { t } = useTranslation()
  return (
    <Tooltip>
      <TooltipTrigger asChild type='button'>
        <Pencil
          size={16}
          strokeWidth={1}
          className={cn('cursor-pointer', className)}
          onClick={onClick}
        />
      </TooltipTrigger>
      <TooltipContent side={side}>
        {tooltipContent || `${t('common.edit', 'Edit')}`}
      </TooltipContent>
    </Tooltip>
  )
}

export default EditIcon
