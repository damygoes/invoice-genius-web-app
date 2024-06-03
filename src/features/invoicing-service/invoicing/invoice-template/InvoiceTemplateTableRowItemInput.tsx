import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'

interface InvoiceTemplateTableRowItemProps extends InputProps {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const InvoiceTemplateTableRowItemInput = React.forwardRef<
  HTMLInputElement,
  InvoiceTemplateTableRowItemProps
>(({ value, onChange, className, ...props }, ref) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      ref={ref}
      {...props}
      className={cn(
        'w-full rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:border-b-0 focus-visible:ring-0',
        className
      )}
    />
  )
})

export default InvoiceTemplateTableRowItemInput
