import { Divider } from '@/components/ui/divider'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from 'react-i18next'
import InvoiceFooterBankDetails from './InvoiceFooterBankDetails'
import InvoiceFooterPayPalDetails from './InvoiceFooterPayPalDetails'
import InvoiceFooterPaymentInfo from './InvoiceFooterPaymentInfo'

const InvoiceFooter = () => {
  const { t } = useTranslation()

  return (
    <div className='flex w-full flex-col items-start justify-start gap-3'>
      <Typography size='sm' className='font-semibold uppercase'>
        {t('invoiceFooter.thankYou', 'Thank you for your business!')}
      </Typography>
      <Divider orientation='horizontal' variant='accent' />
      <div className='flex flex-col items-start justify-start gap-3 px-4'>
        <InvoiceFooterPaymentInfo
          title={t(
            'invoiceFooter.payment.cash',
            'Payments can be made by cash.'
          )}
        />

        <InvoiceFooterPaymentInfo
          title={t(
            'invoiceFooter.payment.bankTransfer',
            'Payments can be made via bank transfer to:'
          )}
        >
          <InvoiceFooterBankDetails />
        </InvoiceFooterPaymentInfo>
        <InvoiceFooterPaymentInfo
          title={t(
            'invoiceFooter.payment.payPal',
            'Payments can be made via PayPal to:'
          )}
        >
          <InvoiceFooterPayPalDetails />
        </InvoiceFooterPaymentInfo>
        <InvoiceFooterPaymentInfo
          title={t(
            'invoiceFooter.payment.quote',
            'Please quote the invoice number on the remittance advice.'
          )}
        />
      </div>
    </div>
  )
}

export default InvoiceFooter
