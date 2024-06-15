import UnknownErrorFallback from '@/components/shared/UnknownErrorFallback'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import InvoiceFooterPaymentDetailsFormattedText from './InvoiceFooterPaymentDetailsFormattedText'

const InvoiceFooterPayPalDetails = () => {
  const { t } = useTranslation()
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
    <div className='w-full pl-5'>
      <InvoiceFooterPaymentDetailsFormattedText
        title='PayPal'
        value={
          UserBusinessProfile.payPalEmail ||
          t('invoiceFooter.payment.noPayPal', 'PayPal email not set')
        }
      />
    </div>
  )
}

export default InvoiceFooterPayPalDetails
