import { useInvoicing } from '@/features/invoicing-service/utils/useInvoicing'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import InvoicePageDisplaySelector from './InvoicePageDisplaySelector'

const InvoicePageDisplayManager = () => {
  const { isClientForm, isInvoiceForm } = useInvoicing()

  const RenderContent = () => {
    if (isClientForm) {
      return <div>Add Client Form</div>
    } else if (isInvoiceForm) {
      return <div>Create Invoice Form</div>
    } else {
      return <div>Null Content</div>
    }
  }

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <InvoicePageDisplaySelector />
      <ScrollArea className='h-full w-full rounded-lg bg-input'>
        {RenderContent()}
      </ScrollArea>
    </section>
  )
}

export default InvoicePageDisplayManager
