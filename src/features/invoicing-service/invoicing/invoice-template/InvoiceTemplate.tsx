import ClientSelectDropdown from '@/components/shared/ClientSelectDropdown'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from 'react-i18next'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'
import InvoiceTemplateTemplatingStep from './InvoiceTemplateTemplatingStep'

const InvoiceTemplate = () => {
  const { t } = useTranslation()
  const {
    setSelectedClient,
    invoiceTemplateStep,
    // setInvoiceTemplateStep,
    setIsPreviewModalOpen
  } = useInvoiceStore()

  const handleSelectClient = (client: string | null) => {
    setSelectedClient(client)
  }

  // const handleBackClick = () => {
  //   setInvoiceTemplateStep("template");
  // };

  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true)
  }

  // const handleDownloadInvoice = () => {
  //   // download invoice
  // };

  const handleSendInvoice = () => {
    // send invoice
  }

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-5'>
      {invoiceTemplateStep === 'template' && (
        <>
          <Typography size='xl'>
            {t('invoiceTemplate.title', 'Invoice Template')}
          </Typography>

          <ClientSelectDropdown onSelectClient={handleSelectClient} />
        </>
      )}
      <section className='flex w-full flex-1 flex-col justify-between gap-5'>
        <InvoiceTemplateTemplatingStep />

        <div className='flex shrink-0 items-center justify-between gap-4'>
          <Button variant='outline' onClick={handlePreviewClick}>
            Preview Invoice
          </Button>
          {/* <Button variant="outline" onClick={handleDownloadInvoice}>
            Download Invoice
          </Button> */}
          <Button className='flex-1' onClick={handleSendInvoice}>
            Send Invoice
          </Button>
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
