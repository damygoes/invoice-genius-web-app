import { InvoiceStatus } from '@/types/Invoice'
import { useTranslation } from 'react-i18next'

type BadgeInfo = {
  variant: 'outline' | 'secondary' | 'default' | 'destructive'
  color: string
  text: string
}
export const GetInvoiceStatusBadge = (status: InvoiceStatus): BadgeInfo => {
  const { t } = useTranslation()

  switch (status) {
    case 'draft':
      return {
        variant: 'outline',
        color: 'none',
        text: t('invoiceItemStatus.draft', 'Draft')
      }
    case 'pending':
      return {
        variant: 'outline',
        color: 'secondary',
        text: t('invoiceItemStatus.pending', 'Pending')
      }
    case 'paid':
      return {
        color: '#52BE80',
        variant: 'default',
        text: t('invoiceItemStatus.paid', 'Paid')
      }
    case 'overdue':
      return {
        color: '#FF5733',
        variant: 'destructive',
        text: t('invoiceItemStatus.overdue', 'Overdue')
      }
    case 'declined':
      return {
        color: '#F56565',
        variant: 'destructive',
        text: t('invoiceItemStatus.declined', 'Declined')
      }
    default:
      return {
        color: 'none',
        variant: 'default',
        text: t('invoiceItemStatus.unknown', 'Unknown')
      }
  }
}
