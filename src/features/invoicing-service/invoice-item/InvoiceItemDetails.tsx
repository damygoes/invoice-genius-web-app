import { InvoiceItem } from '@/types/Invoice'
import InvoicePreviewItems from '../invoicing/invoice-preview/InvoicePreviewItems'

type InvoiceItemDetailsProps = {
  invoice: InvoiceItem
}

const InvoiceItemDetails = ({ invoice }: InvoiceItemDetailsProps) => {
  return (
    <section className='flex w-full items-start justify-start gap-5 rounded-b-md bg-accent px-12 py-5 shadow-sm'>
      <div>
        <iframe
          src={`data:application/pdf;base64,${invoice.pdfBase64}`}
          title='Invoice PDF'
          width='100%'
          height={450}
        />
      </div>
      <div className='flex-1 space-y-1'>
        <InvoicePreviewItems existingItems={invoice?.invoiceItems} />
      </div>
    </section>
  )
}

export default InvoiceItemDetails
