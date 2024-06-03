import ClientSelectDropdown from '@/components/shared/ClientSelectDropdown'
import { Typography } from '@/components/ui/typography'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const InvoiceTemplate = () => {
  const { t } = useTranslation()
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const handleSelectClient = (client: string | null) => {
    setSelectedClient(client)
  }

  console.log('selectedClient', selectedClient)

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-5'>
      <Typography size='xl'>
        {t('invoiceTemplate.title', 'Invoice Template')}
      </Typography>
      <section className='w-full'>
        {/* This dropdown will add selected client details to the global useInvoice store */}
        <ClientSelectDropdown onSelectClient={handleSelectClient} />
        {/* This will be the service, description, rate/hr, hours */}
        <div>Invoice Template Item</div>
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
