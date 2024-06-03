import ClientSelectDropdown from '@/components/shared/ClientSelectDropdown'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InvoiceTemplateTableRowItemType } from '../../utils/InvoiceTemplateTableRowItem'
import InvoiceTemplateTable from './InvoiceTemplateTable'

const InvoiceTemplate = () => {
  const { t } = useTranslation()
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const handleSelectClient = (client: string | null) => {
    setSelectedClient(client)
  }

  console.log('selectedClient', selectedClient)

  // Load initial state from localStorage
  const initialState = () => {
    const savedItems = localStorage.getItem('invoiceItems')
    return savedItems
      ? JSON.parse(savedItems)
      : [
          {
            serviceName: '',
            serviceDescription: '',
            rate: 0,
            hours: 0,
            amount: 0
          }
        ]
  }

  const [invoiceItems, setInvoiceItems] =
    useState<InvoiceTemplateTableRowItemType[]>(initialState)

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('invoiceItems', JSON.stringify(invoiceItems))
  }, [invoiceItems])

  const addRow = () => {
    setInvoiceItems([
      ...invoiceItems,
      { serviceName: '', serviceDescription: '', rate: 0, hours: 0, amount: 0 }
    ])
  }

  const removeRow = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index))
  }

  const updateRow = (
    index: number,
    newItem: InvoiceTemplateTableRowItemType
  ) => {
    newItem.amount = newItem.rate * newItem.hours
    const newItems = invoiceItems.map((item, i) =>
      i === index ? newItem : item
    )
    setInvoiceItems(newItems)
  }

  const subtotal = invoiceItems.reduce((acc, item) => acc + item.amount, 0)
  const vat = subtotal * 0.19
  const total = subtotal + vat

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-5'>
      <Typography size='xl'>
        {t('invoiceTemplate.title', 'Invoice Template')}
      </Typography>
      <ClientSelectDropdown onSelectClient={handleSelectClient} />
      <section className='flex w-full flex-1 flex-col justify-between gap-5'>
        <div className='scrollbar-hide max-h-64 overflow-hidden overflow-y-auto overflow-x-hidden'>
          <InvoiceTemplateTable
            addRow={addRow}
            removeRow={removeRow}
            updateRow={updateRow}
            invoiceItems={invoiceItems}
          />
        </div>
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
        <div className='flex items-center justify-between gap-4'>
          <Button variant='secondary'>Preview Invoice</Button>
          <Button className='flex-1'> Send Invoice </Button>
        </div>
      </section>
    </section>
  )
}

export default InvoiceTemplate

// there will be a button to add more items or rows to the invoice. There will also be a minus button to remove an item or row.
// i should probably add each row or item into an array in the global store and then use the array reduce method to calculate the total amount of the invoice and total hours worked.
// i would then add the 19% VAT to the total amount and display the total amount including VAT.
// there would be a button to create a preview of the invoice.
// i would also add a button to download the invoice as a PDF file.
// the send invoice button would be disabled until the invoice is previewed. It would then be enabled to send the invoice to the email address of the selected client.
