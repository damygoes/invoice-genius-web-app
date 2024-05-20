import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Input, InputProps } from '../ui/input'

interface ControlledEditingInputProps extends InputProps {
  className?: string
}

const ControlledEditingInput = forwardRef<
  HTMLInputElement,
  ControlledEditingInputProps
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        'disabled:pointer-events-none disabled:h-7 disabled:border-none disabled:px-0 disabled:opacity-100',
        className
      )}
      {...props}
    />
  )
})

export default ControlledEditingInput
