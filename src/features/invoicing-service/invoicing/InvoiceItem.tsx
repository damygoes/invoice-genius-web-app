import DeleteIcon from '@/components/shared/DeleteIcon'
import EditIcon from '@/components/shared/EditIcon'
import HideIcon from '@/components/shared/HideIcon'
import RevealIcon from '@/components/shared/RevealIcon'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { InvoiceItem } from '@/types/Invoice'
import { formatToReadableDate } from '@/utils/formatToReadableDate'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GetSavedClientDetails } from '../utils/getSavedClientDetails'
import { useSavedClient } from '../utils/useSavedClient'
import InvoiceItemStatusBadge from './InvoiceItemStatusBadge'

type InvoiceProps = {
  invoice: InvoiceItem
  index: number
}

const Invoice = ({ invoice, index }: InvoiceProps) => {
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
    return <div>Loading...</div>
  }

  if (!fetchedClientDetails) {
    return <div>Error...</div>
  }

  const clientDetails = GetSavedClientDetails(fetchedClientDetails)

  if (!clientDetails) {
    return null
  }

  const { name, address } = clientDetails

  const handleEditInvoice = () => {
    // Handle edit invoice
  }

  const handleDeleteInvoice = () => {
    // Handle delete invoice
  }

  return (
    <div>
      <div
        key={invoice.id}
        className={cn(
          'flex w-full cursor-grab items-center justify-start gap-5 bg-accent p-3 shadow-sm',
          {
            'rounded-md': !showInvoiceDetails,
            'rounded-t-md': showInvoiceDetails
          }
        )}
      >
        <Typography>{index + 1}</Typography>
        <div className='min-w-96 flex-1 space-y-1'>
          <Typography size='xs'>Invoice recipient:</Typography>
          <div>
            <Typography size='2xl'>{name}</Typography>
            <Typography size='xs' className='max-w-36'>
              {address}
            </Typography>
          </div>
        </div>
        <div className='flex-1 space-y-1'>
          <div className='flex items-center gap-3'>
            <Typography size='xs' className='min-w-12'>
              Subtotal:
            </Typography>
            <Typography size='sm'>{invoice.subTotal}</Typography>
          </div>
          <div className='flex items-center gap-3'>
            <Typography size='xs' className='min-w-12'>
              VAT:
            </Typography>
            <Typography size='sm'>{invoice.vat}</Typography>
          </div>
          <div className='flex items-center gap-3'>
            <Typography size='xs' className='min-w-12'>
              Total:
            </Typography>
            <Typography size='sm' className='font-semibold'>
              {invoice.amount}
            </Typography>
          </div>
        </div>
        <div className='flex-1 space-y-1'>
          <Typography size='xs'>Invoice status:</Typography>
          <InvoiceItemStatusBadge status={invoice.status} />
        </div>
        <div className='flex-1 space-y-1'>
          <Typography size='xs'>Issued on:</Typography>
          <Typography size='sm'>
            {formatToReadableDate(invoice.createdAt)}
          </Typography>
        </div>
        <div className='flex-1 space-y-1'>
          <Typography size='xs'>Due date:</Typography>
          <Typography size='sm'>
            {formatToReadableDate(invoice.dueDate)}
          </Typography>
        </div>
        <section className='z-10 flex items-center gap-4'>
          <EditIcon
            tooltipContent={`${t('invoiceItem.buttons.edit', 'Edit invoice')}`}
            onClick={handleEditInvoice}
          />
          <DeleteIcon
            tooltipContent={`${t('invoiceItem.buttons.delete', 'Delete client')}`}
            onClick={handleDeleteInvoice}
          />
          {showInvoiceDetails ? (
            <HideIcon onClick={() => setShowInvoiceDetails(false)} />
          ) : (
            <RevealIcon onClick={() => setShowInvoiceDetails(true)} />
          )}
        </section>
      </div>
      {showInvoiceDetails && (
        <section className='flex w-full items-center justify-start gap-5 rounded-b-md bg-accent p-3 shadow-sm'>
          Invoice Details
        </section>
      )}
    </div>
  )
}

export default Invoice

// {
//     id: 'clx2d65fs00029hbnea3cfj1k',
//     clientId: 'invoice-genius-saved-client-b72a7d56-d117-4421-9521-9f58974434ec',
//     invoiceDate: '2024-06-05T21:51:57.444Z',
//     dueDate: '2024-06-26T22:00:00.000Z',
//     amount: 4284,
//     vat: 684,
//     subTotal: 3600,
//     status: 'pending',
//     invoiceItems: [
//       {
//         rate: 450,
//         hours: 8,
//         amount: 3600,
//         serviceName: 'Logo',
//         serviceDescription: ''
//       }
//     ],
//     createdAt: '2024-06-05T21:51:56.447Z',
//     updatedAt: '2024-06-05T21:51:56.447Z'
//   },
