import UnknownErrorFallback from '@/components/shared/UnknownErrorFallback'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import InvoiceFooterPaymentDetailsFormattedText from './InvoiceFooterPaymentDetailsFormattedText'

const InvoiceFooterBankDetails = () => {
  const { user, getUserProfile } = useUser()
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

  if (!UserBusinessProfile) {
    return null
  }

  if (isUserBusinessProfileLoading) {
    return <Skeleton className='h-8 w-full' />
  }

  if (isUserBusinessProfileError) {
    return <UnknownErrorFallback />
  }

  return (
    <div className='pl-5'>
      <InvoiceFooterPaymentDetailsFormattedText
        title='Bank'
        value={UserBusinessProfile.bankName}
      />
      <InvoiceFooterPaymentDetailsFormattedText
        title='IBAN'
        value={UserBusinessProfile.iban}
      />
      <InvoiceFooterPaymentDetailsFormattedText
        title='BIC'
        value={UserBusinessProfile.bic}
      />
    </div>
  )
}

export default InvoiceFooterBankDetails
