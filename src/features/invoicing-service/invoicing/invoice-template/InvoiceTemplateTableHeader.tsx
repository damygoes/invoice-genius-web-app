import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTranslation } from 'react-i18next'

const InvoiceTemplateTableHeader = () => {
  const { t } = useTranslation()
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          {t('invoiceTemplate.tableHeader.service', 'Service')}
        </TableHead>
        <TableHead>
          {t('invoiceTemplate.tableHeader.description', 'Description')}
        </TableHead>
        <TableHead>
          {t('invoiceTemplate.tableHeader.rate', 'Rate/hr')}
        </TableHead>
        <TableHead className='text-right'>
          {t('invoiceTemplate.tableHeader.hours', 'Hours')}
        </TableHead>
        <TableHead className='text-right'>
          {t('invoiceTemplate.tableHeader.amount', 'Amount')}
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default InvoiceTemplateTableHeader
