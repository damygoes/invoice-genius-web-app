import { lazy } from 'react'

const OnboardingPage = lazy(() => import('@/pages/onboarding/Onboarding'))
const ReceiptManagementPage = lazy(
  () => import('@/pages/receipt-management/ReceiptManagement')
)
const SubscriptionsManagementPage = lazy(
  () => import('@/pages/subscriptions-management/SubscriptionsManagement')
)
const InvoiceManagementPage = lazy(
  () => import('@/pages/invoice-management/InvoiceManagement')
)
const DashboardPage = lazy(() => import('@/pages/user-dashboard/UserDashboard'))
const UserProfilePage = lazy(() => import('@/pages/user-profile/UserProfile'))
const InvoicePreviewPage = lazy(
  () => import('@/pages/invoice-management/InvoicePreview')
)

export {
  DashboardPage,
  InvoiceManagementPage,
  InvoicePreviewPage,
  OnboardingPage,
  ReceiptManagementPage,
  SubscriptionsManagementPage,
  UserProfilePage
}
