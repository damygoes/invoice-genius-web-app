import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Trash } from 'lucide-react'
import { InvoiceTemplateTableRowItemType } from '../../utils/InvoiceTemplateTableRowItem'
import InvoiceTemplateTableRowItemInput from './InvoiceTemplateTableRowItemInput'

interface InvoiceTemplateTableRowItemProps {
  index: number
  item: InvoiceTemplateTableRowItemType
  updateRow: (index: number, newItem: InvoiceTemplateTableRowItemType) => void
  removeRow: (index: number) => void
}

const InvoiceTemplateTableRowItem = ({
  index,
  item,
  updateRow,
  removeRow
}: InvoiceTemplateTableRowItemProps) => {
  const handleChange = (
    field: keyof InvoiceTemplateTableRowItemType,
    value: string | number
  ) => {
    const newItem = { ...item, [field]: value }
    newItem.amount = newItem.rate * newItem.hours // Calculate amount
    updateRow(index, newItem)
  }

  return (
    <TableRow className='hover:bg-background'>
      <TableCell className='font-medium'>
        <InvoiceTemplateTableRowItemInput
          value={item.serviceName}
          onChange={e => handleChange('serviceName', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <InvoiceTemplateTableRowItemInput
          value={item.serviceDescription}
          onChange={e => handleChange('serviceDescription', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <InvoiceTemplateTableRowItemInput
          value={item.rate}
          onChange={e => handleChange('rate', Number(e.target.value))}
          className='text-right'
        />
      </TableCell>
      <TableCell className='text-right'>
        <InvoiceTemplateTableRowItemInput
          value={item.hours}
          onChange={e => handleChange('hours', Number(e.target.value))}
          className='text-right'
        />
      </TableCell>
      <TableCell className='text-right'>
        {(item.rate * item.hours).toFixed(2)}
      </TableCell>
      <TableCell>
        <Button variant='ghost' size='icon' onClick={() => removeRow(index)}>
          <Trash size={14} />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default InvoiceTemplateTableRowItem
