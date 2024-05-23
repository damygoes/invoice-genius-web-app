import CreateInvoiceButton from '@/components/invoicing/CreateInvoiceButton'
import SaveClientButton from '@/components/saved-clients/SaveClientButton'
import { useInvoicing } from '../utils/useInvoicing'

const InvoicePageDisplaySelector = () => {
  const { isClientForm, isInvoiceForm, setClientForm, setInvoiceForm } =
    useInvoicing()

  const handleClientSelection = () => {
    setInvoiceForm(false)
  }
  const handleInvoiceSelection = () => {
    setClientForm(false)
  }

  return (
    <div className='flex w-full items-center justify-end gap-3'>
      <SaveClientButton
        onClick={handleClientSelection}
        variant={isClientForm ? 'default' : 'outline'}
      />
      <CreateInvoiceButton
        onClick={handleInvoiceSelection}
        variant={isInvoiceForm ? 'default' : 'outline'}
      />
    </div>
  )
}

export default InvoicePageDisplaySelector
