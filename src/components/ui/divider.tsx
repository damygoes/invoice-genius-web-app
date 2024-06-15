import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const dividerVariants = cva('shrink-0 self-stretch ', {
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent'
    },
    orientation: {
      vertical: 'h-full h-[0.5px]',
      horizontal: 'h-[0.5px] w-full'
    }
  },
  defaultVariants: {
    variant: 'primary',
    orientation: 'vertical'
  }
})

interface DividerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof dividerVariants> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function TourRoot(
    { variant = 'primary', orientation = 'vertical', className, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(dividerVariants({ variant, orientation, className }))}
      />
    )
  }
)

export { Divider }
