import { useTranslation } from 'react-i18next'

type NavLinkItem = {
  title: string
  href: string
  icon: string | JSX.Element
}

const NavigationLinks = () => {
  const { t } = useTranslation()

  const navigationLinks: NavLinkItem[] = [
    {
      title: `${t('dashboard.title', 'Dashboard')}`,
      href: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: `${t('receiptManagement.title', 'Receipt Management')}`,
      href: '/receipt-management',
      icon: 'receipt'
    },
    {
      title: `${t('subscriptionManagement.title', 'Subscription Management')}`,
      href: '/subscriptions-management',
      icon: 'subscription'
    },
    {
      title: `${t('invoiceManagement.title', 'Invoice Management')}`,
      href: '/invoice-management',
      icon: 'invoice'
    }
  ]

  return navigationLinks
}

export { NavigationLinks }
