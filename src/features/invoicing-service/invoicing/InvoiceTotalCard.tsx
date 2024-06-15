import { useTranslation } from 'react-i18next'
import InvoiceItemLabel from '../invoice-item/InvoiceItemLabel'
import { useInvoiceStore } from '../utils/useInvoiceTemplate'

const InvoiceTotalCard = () => {
  const { getSubtotal, getVat, getTotal } = useInvoiceStore()
  const { t } = useTranslation()

  const subtotal = getSubtotal()
  const vat = getVat()
  const total = getTotal()

  return (
    <section className='flex w-full flex-col items-end justify-start gap-2 rounded-md bg-input/50 p-4'>
      <div className='flex items-center justify-end gap-5 font-light'>
        <InvoiceItemLabel
          label={t('invoiceTemplate.subTotal', 'Subtotal')}
          labelSize='sm'
          value={subtotal.toFixed(2)}
        />
      </div>
      <div className='flex items-center justify-end gap-5 font-light'>
        <InvoiceItemLabel
          label={t('invoiceTemplate.vat', 'VAT')}
          labelSize='xs'
          value={vat.toFixed(2)}
        />
      </div>
      <div className='flex items-center justify-end gap-5'>
        <InvoiceItemLabel
          label={t('invoiceTemplate.total', 'Total')}
          labelSize='lg'
          value={total.toFixed(2)}
          valueSize='lg'
          valueClassName='font-semibold'
        />
      </div>
    </section>
  )
}

export default InvoiceTotalCard
