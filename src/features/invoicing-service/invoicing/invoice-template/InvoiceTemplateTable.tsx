import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { InvoiceTemplateTableRowItemType } from '../../utils/InvoiceTemplateTableRowItem'
import InvoiceTemplateTableHeader from './InvoiceTemplateTableHeader'
import InvoiceTemplateTableRowItem from './InvoiceTemplateTableRowItem'

type InvoiceTemplateTableProps = {
  addRow: () => void
  removeRow: (index: number) => void
  updateRow: (index: number, newItem: InvoiceTemplateTableRowItemType) => void
  invoiceItems: InvoiceTemplateTableRowItemType[]
}

const InvoiceTemplateTable = ({
  addRow,
  removeRow,
  updateRow,
  invoiceItems
}: InvoiceTemplateTableProps) => {
  // Load initial state from localStorage
  //   const initialState = () => {
  //     const savedItems = localStorage.getItem("invoiceItems");
  //     return savedItems
  //       ? JSON.parse(savedItems)
  //       : [
  //           {
  //             serviceName: "",
  //             serviceDescription: "",
  //             rate: 0,
  //             hours: 0,
  //             amount: 0,
  //           },
  //         ];
  //   };

  //   const [invoiceItems, setInvoiceItems] =
  //     useState<InvoiceTemplateTableRowItemType[]>(initialState);

  //   // Save state to localStorage whenever it changes
  //   useEffect(() => {
  //     localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
  //   }, [invoiceItems]);

  //   const addRow = () => {
  //     setInvoiceItems([
  //       ...invoiceItems,
  //       { serviceName: "", serviceDescription: "", rate: 0, hours: 0, amount: 0 },
  //     ]);
  //   };

  //   const removeRow = (index: number) => {
  //     setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  //   };

  //   const updateRow = (
  //     index: number,
  //     newItem: InvoiceTemplateTableRowItemType,
  //   ) => {
  //     newItem.amount = newItem.rate * newItem.hours;
  //     const newItems = invoiceItems.map((item, i) =>
  //       i === index ? newItem : item,
  //     );
  //     setInvoiceItems(newItems);
  //   };

  //   const subtotal = invoiceItems.reduce((acc, item) => acc + item.amount, 0);
  //   const vat = subtotal * 0.19;
  //   const total = subtotal + vat;

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
              Add Item
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default InvoiceTemplateTable
