import {
  BookUser,
  LayoutDashboard,
  Receipt,
  ReceiptText,
  Rss
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type DesktopNavLinkItem = {
  title: string
  href: string
  icon: typeof Receipt
  label?: string
  disabled?: boolean
}

export type MobileNavLinkItem = Omit<DesktopNavLinkItem, 'icon' | 'label'>

const DesktopNavigationLinks = () => {
  const { t } = useTranslation()

  const navigationLinks: DesktopNavLinkItem[] = [
    {
      title: `${t('dashboard.title', 'Dashboard')}`,
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: `${t('receiptManagement.title', 'Receipts')}`,
      href: '/receipt-management',
      icon: ReceiptText
    },
    {
      title: `${t('subscriptionManagement.title', 'Subscriptions')}`,
      href: '/subscriptions-management',
      icon: Rss
    },
    {
      title: `${t('invoiceManagement.title', 'Invoicing')}`,
      href: '/invoice-management',
      icon: BookUser
    }
  ]

  return navigationLinks
}
const MobileNavigationLinks = () => {
  const { t } = useTranslation()

  const mobileNavigationLinks: MobileNavLinkItem[] = [
    {
      title: `${t('dashboard.title', 'Dashboard')}`,
      href: '/dashboard'
    },
    {
      title: `${t('receiptManagement.title', 'Receipt Management')}`,
      href: '/receipt-management'
    },
    {
      title: `${t('subscriptionManagement.title', 'Subscription Management')}`,
      href: '/subscriptions-management'
    },
    {
      title: `${t('invoiceManagement.title', 'Invoice Management')}`,
      href: '/invoice-management'
    }
  ]

  return mobileNavigationLinks
}

export { DesktopNavigationLinks, MobileNavigationLinks }
