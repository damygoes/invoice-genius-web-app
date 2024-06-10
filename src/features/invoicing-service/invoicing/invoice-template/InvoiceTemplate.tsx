import ClientSelectDropdown from '@/components/shared/ClientSelectDropdown'
import { DatePicker } from '@/components/shared/DatePicker'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'
import InvoiceTemplateTemplatingStep from './InvoiceTemplateTemplatingStep'

const InvoiceTemplate = () => {
  const { t } = useTranslation()
  const {
    setSelectedClient,
    invoiceTemplateStep,
    invoiceItems,
    selectedClient,
    invoiceDueDate,
    setInvoiceDueDate
  } = useInvoiceStore()

  const navigate = useNavigate()

  const handleSelectClient = (client: string | null) => {
    setSelectedClient(client)
  }

  const handlePreviewClick = () => {
    navigate('/invoicing/invoice-preview')
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
        <Button
          variant='outline'
          onClick={handlePreviewClick}
          disabled={!selectedClient || !invoiceItems.length}
        >
          {t('invoiceTemplate.buttons.preview', 'Preview')}
        </Button>
      </section>
    </section>
  )
}

export default InvoiceTemplate
