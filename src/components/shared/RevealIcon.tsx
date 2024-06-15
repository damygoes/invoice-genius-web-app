import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type RevealIconProps = {
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  tooltipContent?: string
  onClick?: () => void
}

const RevealIcon = ({
  side = 'top',
  tooltipContent,
  onClick,
  className
}: RevealIconProps) => {
  const { t } = useTranslation()
  return (
    <Tooltip>
      <TooltipTrigger asChild type='button'>
        <ChevronDown
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

export default RevealIcon
