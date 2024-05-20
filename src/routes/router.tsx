import RootLayout from '@/components/layout/root-layout/RootLayout'
import {
  DashboardPage,
  InvoiceManagementPage,
  OnboardingPage,
  ReceiptManagementPage,
  SubscriptionsManagementPage,
  UserProfilePage
} from '@/pages'
import HomePage from '@/pages/home/HomePage'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import AuthManager from '../components/auth/AuthManager'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' index element={<HomePage />} />
      <Route path='/callback' element={<AuthManager />} />
      <Route path='onboarding' element={<OnboardingPage />} />
      <Route element={<RootLayout />}>
        <Route
          path='dashboard'
          element={<DashboardPage />}
          loader={() => {
            return <div>Dashboard Loader</div>
          }}
        />
        ,
        <Route
          path='receipt-management'
          element={<ReceiptManagementPage />}
          loader={() => {
            return <div>Receipt Loader</div>
          }}
        />
        ,
        <Route
          path='subscriptions-management'
          element={<SubscriptionsManagementPage />}
          loader={() => {
            return <div>Subscriptions Loader</div>
          }}
        />
        ,
        <Route
          path='invoice-management'
          element={<InvoiceManagementPage />}
          loader={() => {
            return <div>Invoice Loader</div>
          }}
        />
        <Route
          path='profile'
          element={<UserProfilePage />}
          loader={() => {
            return <div>Invoice Loader</div>
          }}
        />
        ,
        {/* <Route path="/settings" element={<SettingsScreen />}>
            <Route path="employees" element={<EmployeesHomeScreen />} />
            <Route path="tags" element={<TagsHomeScreen />} />
            <Route path="process" element={<ProcessManagementScreen />} />
            <Route path="pharmacies" element={<PharmaciesScreen />} />
            <Route
              path="subscription"
              element={<SubscriptionManagementScreen />}
            />
          </Route> */}
      </Route>
      {/* //* Catch All */}
      <Route path='*' element={<div>Not found screen</div>} />,
    </Route>
    // </Route>,
  )
)
