import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type TooltipIconProps = {
  icon: LucideIcon
  tooltipContent: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  isAction?: boolean
  isDraggable?: boolean
  onClick?: () => void
}

const TooltipIcon = ({
  icon,
  tooltipContent,
  side = 'top',
  isAction = false,
  isDraggable = false,
  onClick
}: TooltipIconProps) => {
  const IconComponent = icon
  return (
    <Tooltip>
      <TooltipTrigger asChild type='button'>
        <IconComponent
          size={12}
          strokeWidth={1}
          className={cn('', {
            'cursor-pointer': isAction,
            'cursor-grab': isDraggable
          })}
          onClick={isAction ? onClick : undefined}
        />
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltipContent}</TooltipContent>
    </Tooltip>
  )
}

export default TooltipIcon
