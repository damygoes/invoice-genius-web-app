import { Typography } from '@/components/ui/typography'
import { format } from 'date-fns'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import generateInvoiceNumber from '../../utils/generateInvoiceNumber'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'

const InvoicePreviewSubHeadlineDateInfo = () => {
  const { t } = useTranslation()
  const { invoiceDueDate, invoiceNumber, setInvoiceNumber } = useInvoiceStore()

  const GeneratedInvoiceNumber = useMemo(() => generateInvoiceNumber(), [])

  useEffect(() => {
    setInvoiceNumber(GeneratedInvoiceNumber)
  }, [GeneratedInvoiceNumber, setInvoiceNumber])

  if (!invoiceDueDate) {
    return null
  }

  const InvoiceDueDate = format(invoiceDueDate, 'dd-MM-yyyy')
  const InvoiceDate = format(new Date(), 'dd-MM-yyyy')

  return (
    <div className='flex flex-col items-end justify-start'>
      <Typography size='sm' className='font-light '>
        {t('invoicePreviewPage.dueDate', 'Due date')}:
        <span className='ml-2 text-sm'>{InvoiceDueDate}</span>
      </Typography>
      <Typography size='sm' className='font-light '>
        {t('invoicePreviewPage.invoiceDate', 'Invoice date')}:
        <span className='ml-2 text-sm'>{InvoiceDate}</span>
      </Typography>
      <Typography size='sm' className='font-light '>
        {t('invoicePreviewPage.invoiceNumber', 'Invoice number')}:
        <span className='ml-2 text-sm'>{invoiceNumber}</span>
      </Typography>
    </div>
  )
}

export default InvoicePreviewSubHeadlineDateInfo
