import {
  DashboardPage,
  InvoiceManagementPage,
  OnboardingPage,
  ReceiptManagementPage,
  SubscriptionsManagementPage
} from '@/pages'
import { createBrowserRouter } from 'react-router-dom'
import AuthManager from '../components/auth/AuthManager'

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingPage />
  },
  {
    path: '/',
    element: <AuthManager />,
    loader: () => {
      return <div>Auth Manager Loading</div>
    },
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
        loader: () => {
          return <div>Loader</div>
        }
      },
      {
        path: 'receipt-management',
        element: <ReceiptManagementPage />,
        loader: () => {
          return <div>Loader</div>
        }
      },
      {
        path: 'subscriptions-management',
        element: <SubscriptionsManagementPage />,
        loader: () => {
          return <div>Loader</div>
        }
      },
      {
        path: 'invoice-management',
        element: <InvoiceManagementPage />,
        loader: () => {
          return <div>Loader</div>
        }
      }
    ]
  }
])
