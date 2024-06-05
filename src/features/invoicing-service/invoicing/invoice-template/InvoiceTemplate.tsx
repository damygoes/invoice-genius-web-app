import ClientSelectDropdown from '@/components/shared/ClientSelectDropdown'
import { DatePicker } from '@/components/shared/DatePicker'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  InvoicePayload,
  useInvoiceStore,
  useInvoiceStoreActions
} from '../../utils/useInvoiceTemplate'
import { useInvoicing } from '../../utils/useInvoicing'
import InvoiceTemplateTemplatingStep from './InvoiceTemplateTemplatingStep'

const InvoiceTemplate = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { toast } = useToast()
  const {
    setSelectedClient,
    invoiceTemplateStep,
    invoiceItems,
    selectedClient,
    setIsPreviewModalOpen,
    invoiceDueDate,
    setInvoiceDueDate,
    getSubtotal,
    getVat,
    getTotal,
    resetInvoiceTemplateState
  } = useInvoiceStore()
  const { sendInvoice } = useInvoiceStoreActions()
  const { setInvoiceForm } = useInvoicing()

  const sendInvoiceMutation = useMutation({
    mutationKey: ['sendInvoiceToClient'],
    mutationFn: sendInvoice,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['invoices']
      })
    }
  })

  const handleSelectClient = (client: string | null) => {
    setSelectedClient(client)
  }

  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true)
  }

  const handleSendInvoice = async () => {
    const invoiceItem: InvoicePayload = {
      client: selectedClient || '',
      items: invoiceItems,
      invoiceSubTotal: getSubtotal(),
      invoiceVAT: getVat(),
      invoiceTotal: getTotal(),
      dueDate: invoiceDueDate || new Date()
    }
    await sendInvoiceMutation.mutateAsync(invoiceItem)
    resetInvoiceTemplateState()
    setInvoiceForm(false)
    toast({
      title: 'Invoice sent',
      description: `The invoice has been sent to ${selectedClient}`,
      variant: 'default'
    })
  }

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-5'>
      {invoiceTemplateStep === 'template' && (
        <>
          <Typography size='xl'>
            {t('invoiceTemplate.title', 'Invoice Template')}
          </Typography>

          <ClientSelectDropdown onSelectClient={handleSelectClient} />
          <div className='flex w-full items-center gap-4 px-3'>
            <Typography size='sm'>
              {t('invoiceTemplate.dueDate', 'Due Date')}
            </Typography>
            <DatePicker
              date={invoiceDueDate || new Date()}
              onSelect={setInvoiceDueDate}
            />
          </div>
        </>
      )}
      <section className='flex w-full flex-1 flex-col justify-between gap-5'>
        <InvoiceTemplateTemplatingStep />

        <div className='flex shrink-0 items-center justify-between gap-4'>
          <Button
            variant='outline'
            onClick={handlePreviewClick}
            disabled={
              !selectedClient ||
              !invoiceItems.length ||
              sendInvoiceMutation.isPending
            }
          >
            Preview Invoice
          </Button>
          {/* <Button variant="outline" onClick={handleDownloadInvoice}>
            Download Invoice
          </Button> */}
          <Button
            className='flex-1'
            onClick={handleSendInvoice}
            disabled={sendInvoiceMutation.isPending}
          >
            {sendInvoiceMutation.isPending ? (
              <>
                <Loader size={16} className='mr-3 animate-spin' /> Sending
                invoice...
              </>
            ) : (
              'Send Invoice'
            )}
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
