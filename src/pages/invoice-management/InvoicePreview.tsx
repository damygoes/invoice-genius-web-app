import PageLayout from '@/components/layout/page-layout/PageLayout'
import PageNavigator from '@/components/shared/PageNavigator'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import InvoicePreviewItem from '@/features/invoicing-service/invoicing/invoice-preview/InvoicePreviewItem'
import generatePDF from '@/features/invoicing-service/utils/gnerateInvoicePDF'
import {
  InvoicePayload,
  useInvoiceStore,
  useInvoiceStoreActions
} from '@/features/invoicing-service/utils/useInvoiceTemplate'
import {
  useInvoicing,
  useInvoicingActions
} from '@/features/invoicing-service/utils/useInvoicing'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BookDashed, Loader, Printer, SendHorizonal, X } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const InvoicePreview = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { toast } = useToast()
  const { handlePrintInvoice } = useInvoicingActions()
  const {
    invoiceItems,
    selectedClient,
    invoiceNumber,
    invoiceDueDate,
    getSubtotal,
    getVat,
    getTotal,
    resetInvoiceTemplateState
  } = useInvoiceStore()
  const { setInvoiceForm } = useInvoicing()
  const { sendInvoice } = useInvoiceStoreActions()
  const invoiceRef = useRef(null)

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

  const resetAll = () => {
    resetInvoiceTemplateState()
    setInvoiceForm(false)
    navigate('/invoicing')
  }

  const handleSendInvoice = async () => {
    const invoiceElement = invoiceRef.current
    if (!invoiceElement) return
    try {
      const pdfBlob = await generatePDF(invoiceElement)
      const formData = new FormData()
      formData.append('pdf', pdfBlob, 'invoice.pdf')

      const invoiceItem: InvoicePayload = {
        client: selectedClient || '',
        items: invoiceItems,
        invoiceSubTotal: getSubtotal(),
        invoiceVAT: getVat(),
        invoiceTotal: getTotal(),
        dueDate: invoiceDueDate || new Date(),
        invoiceNumber: invoiceNumber
      }

      formData.append('invoiceData', JSON.stringify(invoiceItem))

      await sendInvoiceMutation.mutateAsync(formData)
      resetAll()
      toast({
        title: 'Invoice sent',
        description: `The invoice has been sent to ${selectedClient}`,
        variant: 'default'
      })
    } catch (error) {
      console.error('Error generating or sending PDF:', error)
      toast({
        title: 'Error',
        description: 'Failed to send the invoice.',
        variant: 'destructive'
      })
    }
  }

  const handleSaveInvoiceAsDraft = async () => {
    console.log('Save invoice as draft')
    // const invoiceItem: InvoicePayload = {
    //   client: selectedClient || "",
    //   items: invoiceItems,
    //   invoiceSubTotal: getSubtotal(),
    //   invoiceVAT: getVat(),
    //   invoiceTotal: getTotal(),
    //   dueDate: invoiceDueDate || new Date(),
    // };
    // await sendInvoiceMutation.mutateAsync(invoiceItem);
    // resetInvoiceTemplateState();
    // setInvoiceForm(false);
    // toast({
    //   title: "Invoice saved as draft",
    //   description: `The invoice has been saved as draft for ${selectedClient}`,
    //   variant: "default",
    // });
  }

  return (
    <PageLayout
      pageNavComponent={
        <PageNavigator
          type='previous'
          url='/invoicing'
          text={t(
            'invoicePreviewPage.buttons.backToInvoices',
            'Back to Invoicing'
          )}
        />
      }
      className='scrollbar-hide flex items-start justify-between gap-4 overflow-y-auto overflow-x-hidden p-4'
    >
      <section
        className='flex w-full flex-1 items-center justify-start'
        ref={invoiceRef}
      >
        <InvoicePreviewItem />
      </section>
      <section className='flex flex-col items-center justify-start gap-4 rounded-md bg-card p-4'>
        <Button
          className='w-full'
          type='button'
          onClick={() => handlePrintInvoice(invoiceRef)}
        >
          <Printer size={16} className='mr-2' />
          {t('invoiceTemplate.buttons.printInvoice', 'Print Invoice')}
        </Button>
        <Button
          className='w-full'
          onClick={handleSendInvoice}
          disabled={sendInvoiceMutation.isPending}
        >
          {sendInvoiceMutation.isPending ? (
            <>
              <Loader size={16} className='mr-3 animate-spin' />
              {t('invoiceTemplate.buttons.sendPending', 'Sending...')}
            </>
          ) : (
            <>
              <SendHorizonal size={16} className='mr-3' />
              {t('invoiceTemplate.buttons.send', 'Send Invoice')}
            </>
          )}
        </Button>
        <Button
          className='w-full'
          onClick={handleSaveInvoiceAsDraft}
          // disabled={sendInvoiceMutation.isPending}
        >
          {/* {sendInvoiceMutation.isPending ? (
            <>
              <Loader size={16} className="mr-3 animate-spin" />
              {t("invoiceTemplate.buttons.sending", "Sending...")}
            </>
          ) : (
            <>
              <SendHorizonal size={16} className="mr-3" />
              {t("invoiceTemplate.buttons.send", "Send Invoice")}
            </>
          )} */}
          <>
            <BookDashed size={16} className='mr-3' />
            {t('invoiceTemplate.buttons.saveAsDraft', 'Save as Draft')}
          </>
        </Button>
        <Button
          className='w-full'
          onClick={resetAll}
          // disabled={sendInvoiceMutation.isPending}
        >
          <>
            <X size={16} className='mr-3' />
            {t('common.cancel', 'Cancel')}
          </>
        </Button>
      </section>
    </PageLayout>
  )
}

export default InvoicePreview
