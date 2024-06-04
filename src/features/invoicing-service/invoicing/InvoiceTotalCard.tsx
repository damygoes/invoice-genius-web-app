import { Typography } from '@/components/ui/typography'
import { useInvoiceStore } from '../utils/useInvoiceTemplate'

const InvoiceTotalCard = () => {
  const { getSubtotal, getVat, getTotal } = useInvoiceStore()

  const subtotal = getSubtotal()
  const vat = getVat()
  const total = getTotal()

  return (
    <section className='flex w-full flex-col items-end justify-start gap-2 rounded-md bg-input p-4'>
      <div className='flex items-center justify-end gap-5 font-light'>
        <Typography size='sm'>Subtotal</Typography>
        <Typography>{subtotal.toFixed(2)}</Typography>
      </div>
      <div className='flex items-center justify-end gap-5 font-light'>
        <Typography size='sm'>
          VAT <span className='italic'>(19% mwst)</span>
        </Typography>
        <Typography>{vat.toFixed(2)}</Typography>
      </div>
      <div className='flex items-center justify-end gap-5'>
        <Typography size='lg'>Total Amount</Typography>
        <Typography className='font-semibold' size='lg'>
          {total.toFixed(2)}
        </Typography>
      </div>
    </section>
  )
}

export default InvoiceTotalCard
