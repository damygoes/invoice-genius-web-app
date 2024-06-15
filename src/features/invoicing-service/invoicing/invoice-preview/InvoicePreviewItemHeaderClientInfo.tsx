import UnknownErrorFallback from '@/components/shared/UnknownErrorFallback'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { GetSavedClientDetails } from '../../utils/getSavedClientDetails'
import {
  useInvoiceStore,
  useInvoiceStoreActions
} from '../../utils/useInvoiceTemplate'

const InvoicePreviewItemHeaderClientInfo = () => {
  const { selectedClient } = useInvoiceStore()
  const { getSelectedClientDetails } = useInvoiceStoreActions()
  const { t } = useTranslation()

  const {
    data: ClientDetails,
    isLoading: isClientDetailsLoading,
    isError: isClientDetailsError
  } = useQuery({
    queryKey: ['invoicePreview'],
    queryFn: () => getSelectedClientDetails(selectedClient || ''),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!selectedClient
  })

  if (!ClientDetails) {
    return null
  }

  if (isClientDetailsLoading) {
    return <Skeleton className='h-8 w-full' />
  }

  if (isClientDetailsError) {
    return <UnknownErrorFallback />
  }

  const clientInformation = GetSavedClientDetails(ClientDetails)
  if (!clientInformation) {
    return null
  }

  return (
    <div className='flex w-full max-w-36 flex-col flex-wrap'>
      <Typography size='xs' className='font-light'>
        {t('invoicePreviewPage.invoiceRecipient', 'Recipient')}
      </Typography>
      <div>
        <Typography className='font-normal' size='lg'>
          {clientInformation.name}
        </Typography>
        <Typography className='font-light' size='xs'>
          {clientInformation.address}
        </Typography>
      </div>
    </div>
  )
}

export default InvoicePreviewItemHeaderClientInfo
