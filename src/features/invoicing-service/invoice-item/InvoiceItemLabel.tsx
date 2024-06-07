import { Typography } from '@/components/ui/typography'
import React from 'react'

type InvoiceItemLabelProps = {
  label: string
  value?: React.ReactNode
  labelSize?: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
  valueSize?: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
  valueClassName?: string
}

const InvoiceItemLabel = ({
  label,
  value,
  labelSize = 'xs',
  valueSize = 'sm',
  valueClassName = ''
}: InvoiceItemLabelProps) => (
  <div className='flex items-center gap-3'>
    <Typography size={labelSize} className='min-w-16'>
      {label}
    </Typography>
    <Typography size={valueSize} className={valueClassName}>
      {value}
    </Typography>
  </div>
)

export default InvoiceItemLabel
