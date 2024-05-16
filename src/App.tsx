import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={<div className='border border-solid p-4'>App Loading...</div>}
      >
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
