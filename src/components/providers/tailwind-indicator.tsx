import { cn } from '@/lib/utils'

type TailwindIndicatorProps = {
  children: React.ReactNode
}

function TailwindIndicator({ children }: TailwindIndicatorProps) {
  return (
    <div
      className={cn('h-screen w-screen antialiased', {
        'debug-screens': process.env.NODE_ENV === 'development'
      })}
    >
      {children}
    </div>
  )
}

export default TailwindIndicator
