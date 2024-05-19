import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const typographyVariants = cva('font-sans text-foreground antialiased', {
  variants: {
    variant: {
      default: 'text-foreground',
      link: 'underline-offset-4 hover:underline'
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}

function Typography({ className, variant, size, ...props }: TypographyProps) {
  return (
    <p
      className={cn(typographyVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
