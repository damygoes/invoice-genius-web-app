import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const headingVariants = cva('font-sans text-foreground antialiased', {
  variants: {
    size: {
      default: 'text-3xl',
      lg: 'text-4xl',
      xl: 'text-5xl',
      '2xl': 'text-6xl',
      '3xl': 'text-7xl'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

function Heading({ className, size, ...props }: HeadingProps) {
  return <p className={cn(headingVariants({ size }), className)} {...props} />
}

export { Heading, headingVariants }
