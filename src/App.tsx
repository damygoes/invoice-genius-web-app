import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import TailwindIndicator from './components/TailwindIndicator'
import { Toaster } from './components/ui/toaster'
import { TooltipProvider } from './components/ui/tooltip'
import { ThemeProvider } from './context/theme-provider'
import { router } from './routes/router'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <TooltipProvider>
          <Suspense
            fallback={
              <div className='border border-solid p-4'>App Loading...</div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
      <Toaster />
      <TailwindIndicator />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
