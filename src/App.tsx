import NetworkStatusNotifier from '@/components/shared/NetworkStatusNotifier'
import TailwindIndicator from '@/components/shared/TailwindIndicator'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/context/theme-provider'
import { router } from '@/routes/router'
import '@/services/i18n/i18n'
import i18n from '@/services/i18n/i18n'
import KindeAuthProvider from '@/services/kinde-auth/KindeAuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

const queryClient = new QueryClient()

function App() {
  i18n.changeLanguage(
    localStorage.getItem('invoice_genius_app_language') ?? undefined
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <TooltipProvider>
          <Suspense
            fallback={
              <div className='border border-solid p-4'>App Loading...</div>
            }
          >
            <KindeAuthProvider>
              <RouterProvider router={router} />
            </KindeAuthProvider>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
      <NetworkStatusNotifier />
      <Toaster />
      <TailwindIndicator />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
