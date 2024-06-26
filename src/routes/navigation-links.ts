import { useUser } from '@/hooks/useUser'
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

export type MobileNavLinkItem = Omit<DesktopNavLinkItem, 'label'>

const DesktopNavigationLinks = () => {
  const { t } = useTranslation()
  const { user } = useUser()

  const navigationLinks: DesktopNavLinkItem[] = [
    {
      title: `${t('sidebarNav.dashboard', 'Dashboard')}`,
      href: '/dashboard',
      icon: LayoutDashboard
    }
  ]

  if (user?.selectedServices?.includes('receiptManagement')) {
    navigationLinks.push({
      title: `${t('sidebarNav.receipt', 'Receipts')}`,
      href: '/receipt-management',
      icon: ReceiptText
    })
  }

  if (user?.selectedServices?.includes('subscriptionManagement')) {
    navigationLinks.push({
      title: `${t('sidebarNav.subscription', 'Subscriptions')}`,
      href: '/subscriptions-management',
      icon: Rss
    })
  }

  if (user?.selectedServices?.includes('invoicing')) {
    navigationLinks.push({
      title: `${t('sidebarNav.invoicing', 'Invoicing')}`,
      href: '/invoicing',
      icon: BookUser
    })
  }

  return navigationLinks
}

const MobileNavigationLinks = () => {
  const { t } = useTranslation()

  const mobileNavigationLinks: MobileNavLinkItem[] = [
    {
      title: `${t('sidebarNav.dashboard', 'Dashboard')}`,
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: `${t('sidebarNav.receipt', 'Receipt Management')}`,
      href: '/receipt-management',
      icon: ReceiptText
    },
    {
      title: `${t('sidebarNav.subscription', 'Subscription Management')}`,
      href: '/subscriptions-management',
      icon: Rss
    },
    {
      title: `${t('sidebarNav.invoicing', 'Invoice Management')}`,
      href: '/invoice-management',
      icon: BookUser
    }
  ]

  return mobileNavigationLinks
}

export { DesktopNavigationLinks, MobileNavigationLinks }
