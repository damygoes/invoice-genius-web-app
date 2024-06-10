import DeleteIcon from '@/components/shared/DeleteIcon'
import HideIcon from '@/components/shared/HideIcon'
import RevealIcon from '@/components/shared/RevealIcon'
import UnknownErrorFallback from '@/components/shared/UnknownErrorFallback'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { InvoiceItem } from '@/types/Invoice'
import { formatToReadableDate } from '@/utils/formatToReadableDate'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GetSavedClientDetails } from '../utils/getSavedClientDetails'
import { useSavedClient } from '../utils/useSavedClient'
import InvoiceItemDetails from './InvoiceItemDetails'
import InvoiceItemLabel from './InvoiceItemLabel'
import InvoiceItemSkeleton from './InvoiceItemSkeleton'
import InvoiceItemStatusBadge from './InvoiceItemStatusBadge'

type InvoiceProps = {
  invoice: InvoiceItem
}

const Invoice = ({ invoice }: InvoiceProps) => {
  const { getSavedClient } = useSavedClient()
  const { t } = useTranslation()
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false)

  const { data: fetchedClientDetails, isLoading: isFetchingClientDetails } =
    useQuery({
      queryKey: ['savedClientDetails'],
      queryFn: () => getSavedClient(invoice.clientId),
      refetchInterval: 60 // Refetch every 60 seconds
    })

  if (isFetchingClientDetails) {
    return <InvoiceItemSkeleton />
  }

  if (!fetchedClientDetails) {
    return <UnknownErrorFallback />
  }

  const clientDetails = GetSavedClientDetails(fetchedClientDetails)

  if (!clientDetails) {
    return null
  }

  const { name, address } = clientDetails

  const handleDeleteInvoice = () => {
    // Handle delete invoice
  }

  return (
    <div>
      <div
        key={invoice.id}
        className={cn(
          'flex w-full cursor-grab flex-wrap items-center justify-start gap-5 bg-accent p-3 shadow-sm',
          {
            'rounded-md': !showInvoiceDetails,
            'rounded-t-md': showInvoiceDetails
          }
        )}
      >
        <Typography className='hidden lg:flex' size='xs'>
          {invoice.invoiceNumber}
        </Typography>
        <div className='min-w-full flex-1 space-y-1 lg:min-w-96'>
          <InvoiceItemLabel
            label={t('invoiceItem.recipient', 'Recipient')}
            labelSize='xs'
          />
          <div>
            <Typography size='xl' className='font-semibold'>
              {name}
            </Typography>
            <Typography size='xs' className='lg:max-w-36'>
              {address}
            </Typography>
          </div>
        </div>
        <div className='flex-1 space-y-1'>
          <div className='flex-1 space-y-1'>
            <InvoiceItemLabel
              label={t('invoiceItem.subTotal', 'Subtotal')}
              value={invoice.subTotal}
            />
            <InvoiceItemLabel
              label={t('invoiceItem.vat', 'VAT')}
              value={invoice.vat}
            />
            <InvoiceItemLabel
              label={t('invoiceItem.total', 'Total')}
              value={invoice.amount}
              valueClassName='font-semibold'
            />
          </div>
        </div>
        <div className='flex-1 space-y-3'>
          <InvoiceItemLabel
            label={t('invoiceItem.invoiceStatus', 'Status')}
            labelSize='xs'
          />
          <InvoiceItemStatusBadge status={invoice.status} />
        </div>
        <div className='flex-1 space-y-1'>
          <InvoiceItemLabel
            label={t('invoiceItem.invoiceDate', 'Invoice date')}
            labelSize='xs'
          />
          <Typography size='sm'>
            {formatToReadableDate(invoice.createdAt)}
          </Typography>
        </div>
        <div className='flex-1 space-y-1'>
          <InvoiceItemLabel
            label={t('invoiceItem.dueDate', 'Due date')}
            labelSize='xs'
          />
          <Typography size='sm'>
            {formatToReadableDate(invoice.dueDate)}
          </Typography>
        </div>
        <section className='z-10 flex items-center gap-4'>
          <DeleteIcon
            tooltipContent={`${t('invoiceItem.deleteInvoice', 'Delete invoice')}`}
            onClick={handleDeleteInvoice}
          />
          {showInvoiceDetails ? (
            <HideIcon onClick={() => setShowInvoiceDetails(false)} />
          ) : (
            <RevealIcon onClick={() => setShowInvoiceDetails(true)} />
          )}
        </section>
      </div>
      {showInvoiceDetails && <InvoiceItemDetails invoice={invoice} />}
    </div>
  )
}

export default Invoice
