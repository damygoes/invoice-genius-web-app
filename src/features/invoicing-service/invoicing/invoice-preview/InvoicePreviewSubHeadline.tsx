import InvoicePreviewItemHeaderClientInfo from './InvoicePreviewItemHeaderClientInfo'
import InvoicePreviewSubHeadlineDateInfo from './InvoicePreviewSubHeadlineDateInfo'

const InvoicePreviewSubHeadline = () => {
  return (
    <section className='flex w-full items-center justify-between gap-3'>
      <InvoicePreviewItemHeaderClientInfo />
      <InvoicePreviewSubHeadlineDateInfo />
    </section>
  )
}

export default InvoicePreviewSubHeadline
