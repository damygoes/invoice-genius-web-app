import { cn } from '@/lib/utils'
import { Grip } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type DraggableIconProps = {
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const DraggableIcon = ({ side = 'top', className }: DraggableIconProps) => {
  const { t } = useTranslation()
  return (
    <Tooltip>
      <TooltipTrigger asChild type='button'>
        <Grip
          size={16}
          strokeWidth={1}
          className={cn('cursor-grab', className)}
        />
      </TooltipTrigger>
      <TooltipContent side={side} align='center'>
        {t('common.drag', 'Drag')}
      </TooltipContent>
    </Tooltip>
  )
}

export default DraggableIcon
