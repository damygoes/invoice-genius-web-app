import { Typography } from '@/components/ui/typography'
import { createIcon } from '@/utils/createIcon'
import { Dot } from 'lucide-react'

type InvoiceFooterPaymentInfoProps = {
  title: string
  children?: React.ReactNode
}

const InvoiceFooterPaymentInfo = ({
  title,
  children
}: InvoiceFooterPaymentInfoProps) => {
  const IconComponent = Dot
  return (
    <div className='flex w-full items-center justify-start'>
      {createIcon(IconComponent)}
      <Typography size='sm' className='font-light'>
        {title}
        {children}
      </Typography>
    </div>
  )
}

export default InvoiceFooterPaymentInfo
