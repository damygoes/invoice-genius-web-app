import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Textarea, TextareaProps } from '../ui/textarea'

interface ControlledEditingTextareaProps extends TextareaProps {
  className?: string
}

const ControlledEditingTextarea = forwardRef<
  HTMLTextAreaElement,
  ControlledEditingTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        'disabled:pointer-events-none disabled:border-none disabled:px-0 disabled:opacity-100',
        className
      )}
      {...props}
    />
  )
})

export default ControlledEditingTextarea
