import CreateInvoiceButton from '@/components/invoicing/CreateInvoiceButton'
import DeleteInvoiceItemModal from '@/components/invoicing/DeleteInvoiceItemModal'
import EmptyDataRenderer from '@/components/shared/EmptyDataRenderer'
import UnknownErrorFallback from '@/components/shared/UnknownErrorFallback'
import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { InvoiceItem } from '@/types/Invoice'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Invoice from '../invoice-item/InvoiceItem'
import { useInvoicing, useInvoicingActions } from '../utils/useInvoicing'
import InvoiceListSkeleton from './InvoiceListSkeleton'

const InvoiceList = () => {
  const { t } = useTranslation()
  const { fetchInvoices } = useInvoicingActions()
  const { invoiceDeleteModalOpen } = useInvoicing()
  const { data: fetchedInvoices, isLoading: isFetchingInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
    refetchInterval: 60
  })

  const [invoices, setInvoices] = useState<InvoiceItem[]>([])

  useEffect(() => {
    if (fetchedInvoices) {
      setInvoices(fetchedInvoices)
    }
  }, [fetchedInvoices])

  if (isFetchingInvoices) {
    return <InvoiceListSkeleton />
  }

  if (!fetchedInvoices) {
    return <UnknownErrorFallback />
  }

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full items-center justify-between'>
        <Heading>{t('invoicingPage.title', 'Invoices')}</Heading>
        <CreateInvoiceButton />
      </div>
      {invoices.length === 0 ? (
        <EmptyDataRenderer
          title={`${t('invoicePage.emptyData.title', 'No Invoices')}`}
          description={`${t('invoicePage.emptyData.description', "You don't have any invoices yet. Create a new invoice to get started.")}`}
        />
      ) : (
        <ScrollArea className='scrollbar-hide flex h-full w-full flex-col items-start justify-between gap-5 rounded-lg'>
          <Reorder.Group
            axis='y'
            values={invoices}
            onReorder={setInvoices}
            className='flex w-full flex-col gap-2'
          >
            <AnimatePresence>
              {invoices.map(invoice => (
                <Reorder.Item key={invoice.id} value={invoice}>
                  <Invoice key={invoice.id} invoice={invoice} />
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </ScrollArea>
      )}
      {invoiceDeleteModalOpen && <DeleteInvoiceItemModal />}
    </section>
  )
}

export default InvoiceList
