import InvoiceTotalCard from '../InvoiceTotalCard'
import InvoiceTemplateTable from './InvoiceTemplateTable'

const InvoiceTemplateTemplatingStep = () => {
  return (
    <>
      <div className='scrollbar-hide max-h-64 overflow-hidden overflow-y-auto overflow-x-hidden'>
        <InvoiceTemplateTable />
      </div>
      <InvoiceTotalCard />
    </>
  )
}

export default InvoiceTemplateTemplatingStep
