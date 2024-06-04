import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useTranslation } from 'react-i18next'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'
import InvoiceTemplateTableHeader from './InvoiceTemplateTableHeader'
import InvoiceTemplateTableRowItem from './InvoiceTemplateTableRowItem'

const InvoiceTemplateTable = () => {
  const { t } = useTranslation()
  const { updateRow, addRow, removeRow, invoiceItems } = useInvoiceStore()

  return (
    <Table>
      <InvoiceTemplateTableHeader />
      <TableBody>
        {invoiceItems.map((item, index) => (
          <InvoiceTemplateTableRowItem
            key={index}
            index={index}
            item={item}
            updateRow={updateRow}
            removeRow={removeRow}
          />
        ))}
        <TableRow className='hover:bg-background'>
          <TableCell colSpan={5} className='text-right hover:bg-none'>
            <Button
              type='button'
              onClick={addRow}
              variant='ghost'
              size='sm'
              className='justify-self-end'
            >
              {t('invoiceTemplateRowItem.add', 'Add Row')}
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default InvoiceTemplateTable
