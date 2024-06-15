import { Divider } from '@/components/ui/divider'
import InvoiceTotalCard from '../InvoiceTotalCard'
import InvoiceFooter from '../invoice-footer/InvoiceFooter'
import InvoicePreviewItemHeader from './InvoicePreviewItemHeader'
import InvoicePreviewItems from './InvoicePreviewItems'
import InvoicePreviewSubHeadline from './InvoicePreviewSubHeadline'

const InvoicePreviewItem = () => {
  return (
    <section className='scrollbar-hide mx-auto flex w-full max-w-full flex-col items-start justify-start gap-7 overflow-y-auto overflow-x-hidden rounded-lg bg-card p-8 lg:max-w-2xl'>
      <InvoicePreviewItemHeader />
      <Divider orientation='horizontal' variant='accent' />
      <InvoicePreviewSubHeadline />
      <Divider orientation='horizontal' variant='accent' className='h-3' />
      <InvoicePreviewItems />
      <InvoiceTotalCard />
      <InvoiceFooter />
    </section>
  )
}

export default InvoicePreviewItem
