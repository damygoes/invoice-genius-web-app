import { cn } from '@/lib/utils'
import { ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type HideIconProps = {
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  tooltipContent?: string
  onClick?: () => void
}

const HideIcon = ({
  side = 'top',
  tooltipContent,
  onClick,
  className
}: HideIconProps) => {
  const { t } = useTranslation()
  return (
    <Tooltip>
      <TooltipTrigger asChild type='button'>
        <ChevronUp
          size={16}
          strokeWidth={1}
          className={cn('cursor-pointer', className)}
          onClick={onClick}
        />
      </TooltipTrigger>
      <TooltipContent side={side}>
        {tooltipContent || `${t('common.showDetails', 'Show details')}`}
      </TooltipContent>
    </Tooltip>
  )
}

export default HideIcon
