import { cn } from '@/lib/utils'

type IconProps = React.HTMLAttributes<SVGElement> & {
  strokeColor?: string
  className?: string
}

export const Icons = {
  companyLogo: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('ucide lucide-briefcase-business', className)}
    >
      <path d='M12 12h.01' />
      <path d='M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2' />
      <path d='M22 13a18.15 18.15 0 0 1-20 0' />
      <rect width='20' height='14' x='2' y='6' rx='2' />
    </svg>
  ),
  instagram: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-instagram', className)}
    >
      <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
      <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
      <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
    </svg>
  ),
  twitter: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-twitter', className)}
    >
      <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
    </svg>
  ),
  facebook: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-facebook', className)}
    >
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
  ),
  linkedIn: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-linkedin', className)}
    >
      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
      <rect width='4' height='12' x='2' y='9' />
      <circle cx='4' cy='4' r='2' />
    </svg>
  )
}
