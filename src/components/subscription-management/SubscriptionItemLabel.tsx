import { ReactNode } from 'react'
import { Label } from '../ui/label'
import { Typography } from '../ui/typography'

type SubscriptionItemLabelProps = {
  label: string | ReactNode
  value: string | number
}

const SubscriptionItemLabel = ({
  label,
  value
}: SubscriptionItemLabelProps) => {
  return (
    <div className='flex min-w-32 shrink-0 items-center gap-2'>
      <Label>{label}</Label>
      <Typography size='sm' className='font-medium'>
        {value}
      </Typography>
    </div>
  )
}

export default SubscriptionItemLabel
