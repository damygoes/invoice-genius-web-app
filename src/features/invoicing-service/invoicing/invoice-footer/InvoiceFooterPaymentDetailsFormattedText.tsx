import { Typography } from '@/components/ui/typography'

type InvoiceFooterPaymentDetailsFormattedTextProps = {
  title: string
  value: string
}

const InvoiceFooterPaymentDetailsFormattedText = ({
  title,
  value
}: InvoiceFooterPaymentDetailsFormattedTextProps) => {
  return (
    <div className='flex items-center justify-start gap-2'>
      <span className='min-w-10 text-xs font-semibold uppercase'>{title}:</span>
      <Typography size='sm' className='font-light'>
        {value}
      </Typography>
    </div>
  )
}

export default InvoiceFooterPaymentDetailsFormattedText
