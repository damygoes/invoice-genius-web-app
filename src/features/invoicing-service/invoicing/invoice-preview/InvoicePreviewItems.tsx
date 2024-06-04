import { Typography } from '@/components/ui/typography'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'

const InvoicePreviewItems = () => {
  const { invoiceItems } = useInvoiceStore()
  return (
    <div className='flex w-full flex-col items-start justify-start gap-3'>
      {invoiceItems.map((item, index) => (
        <div
          key={index}
          className='flex w-full items-center justify-between gap-4 rounded-none border border-l-0 border-r-0 border-t-0 border-solid border-border px-2 py-1 '
        >
          <Typography size='xs'>{index + 1}</Typography>
          <div className='flex min-w-48 flex-1 flex-col text-balance'>
            <Typography>{item.serviceName}</Typography>
            <Typography size='sm' className='font-light'>
              {item.serviceDescription}
            </Typography>
          </div>
          <div className='flex flex-1 flex-col'>
            <Typography size='xs' className='text-muted-foreground'>
              Rate:
            </Typography>
            <Typography size='sm' className='font-semibold'>
              {item.rate}
              <span className='ml-1 text-xs font-light'>/hr</span>
            </Typography>
          </div>
          <div className='flex flex-1 flex-col'>
            <Typography size='xs' className='text-muted-foreground'>
              Hours:
            </Typography>
            <Typography size='sm' className='font-semibold'>
              {item.hours}
            </Typography>
          </div>
          <div className='flex flex-1 flex-col'>
            <Typography size='xs' className='text-muted-foreground'>
              Amount:
            </Typography>
            <Typography size='sm' className='font-semibold'>
              {item.amount.toFixed(2)}
              <span className='ml-1 text-xs font-light'>USD</span>
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InvoicePreviewItems
