import { Typography } from '@/components/ui/typography'
import { useUser } from '@/hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import { GetSavedClientDetails } from '../../utils/getSavedClientDetails'
import {
  useInvoiceStore,
  useInvoiceStoreActions
} from '../../utils/useInvoiceTemplate'
import InvoiceFooter from '../InvoiceFooter'
import InvoiceTotalCard from '../InvoiceTotalCard'
import InvoicePreviewItems from './InvoicePreviewItems'

const InvoicePreview = () => {
  const { selectedClient } = useInvoiceStore()
  const { getSelectedClientDetails } = useInvoiceStoreActions()
  const { user, getUserProfile } = useUser()

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
  const {
    data: UserBusinessProfile,
    isLoading: isUserBusinessProfileLoading,
    isError: isUserBusinessProfileError
  } = useQuery({
    queryKey: ['userBusinessProfile'],
    queryFn: () => getUserProfile(user?.id || ''),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!user?.id
  })

  if (!ClientDetails || !UserBusinessProfile) {
    return null
  }

  if (isClientDetailsLoading || isUserBusinessProfileLoading) {
    return <div>Loading...</div>
  }

  if (isClientDetailsError || isUserBusinessProfileError) {
    return <div>Error...</div>
  }

  const clientInformation = GetSavedClientDetails(ClientDetails)
  if (!clientInformation) {
    return null
  }

  const UserBusinessAddress = `${UserBusinessProfile.businessAddress.street} ${UserBusinessProfile.businessAddress.number} ${UserBusinessProfile.businessAddress.zip} ${UserBusinessProfile.businessAddress.city} ${UserBusinessProfile.businessAddress.state} ${UserBusinessProfile.businessAddress.country}`

  return (
    <section className='scrollbar-hide flex w-full flex-col items-start justify-start gap-5 overflow-y-auto overflow-x-hidden px-4'>
      <div className='w-full text-center'>
        <Typography size='2xl' className='font-semibold'>
          {UserBusinessProfile.businessName}
        </Typography>
        <Typography className='font-light'>{UserBusinessAddress}</Typography>
        <div className='flex w-full items-center justify-center gap-2'>
          <Typography size='xs' className='font-light'>
            {UserBusinessProfile.businessEmail}
          </Typography>
          |
          <Typography size='xs' className='font-light'>
            {UserBusinessProfile.businessMobile}
          </Typography>
          |
          <Typography size='xs' className='font-light'>
            {UserBusinessProfile.businessWebsite}
          </Typography>
        </div>
      </div>
      <div className='flex w-full items-center justify-end'>
        <Typography size='sm' className='font-light '>
          Date:
          <span className='ml-2 text-sm'>
            {new Date().toLocaleDateString()}
          </span>
        </Typography>
      </div>
      <div className='flex w-full max-w-40 flex-col flex-wrap'>
        <Typography size='lg' className='font-semibold'>
          Invoice To
        </Typography>
        <Typography className='font-light' size='sm'>
          {clientInformation.name} <br /> {clientInformation.address}
        </Typography>
      </div>
      <div className='mt-5 w-full'>
        <InvoicePreviewItems />
      </div>
      <InvoiceTotalCard />
      <InvoiceFooter />
    </section>
  )
}

export default InvoicePreview
