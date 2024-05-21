import { cn } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type EditIconProps = {
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  tooltipContent?: string
}

const EditIcon = ({
  side = 'top',
  tooltipContent,
  className
}: EditIconProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild type='button'>
        <Pencil
          size={16}
          strokeWidth={1}
          className={cn('cursor-pointer', className)}
        />
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltipContent || 'Edit'}</TooltipContent>
    </Tooltip>
  )
}

export default EditIcon
