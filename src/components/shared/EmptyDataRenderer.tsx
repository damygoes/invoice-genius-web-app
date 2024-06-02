import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Heading } from '../ui/heading'
import { Typography } from '../ui/typography'
import { Icons } from './Icons'

type EmptyDataRendererProps = {
  title: string
  description: string
  withActionButton?: boolean
  buttonText?: string
  onClick?: () => void
  actionComponent?: ReactNode
  className?: string
}

const EmptyIcon = Icons.empty

const EmptyDataRenderer = ({
  title,
  description,
  withActionButton,
  buttonText,
  actionComponent,
  onClick,
  className
}: EmptyDataRendererProps) => {
  if (withActionButton && !actionComponent) {
    if (!buttonText) {
      throw new Error('buttonText is required when withActionButton is true')
    }
    if (!onClick) {
      throw new Error('onClick is required when withActionButton is true')
    }
  }

  return (
    <section
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background shadow-none',
        className
      )}
    >
      <EmptyIcon className='size-24' />
      <div className='flex flex-col items-center gap-1 text-center'>
        <Heading>{title}</Heading>
        <Typography className='text-muted-foreground' size='sm'>
          {description}
        </Typography>
        {withActionButton && !actionComponent && (
          <Button className='mt-4' onClick={onClick}>
            {buttonText}
          </Button>
        )}
        {withActionButton && actionComponent && actionComponent}
      </div>
    </section>
  )
}

export default EmptyDataRenderer
