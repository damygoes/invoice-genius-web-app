import TailwindIndicator from '@/components/providers/tailwind-indicator'
import { Button } from '@/components/ui/button'
function App() {
  return (
    <TailwindIndicator>
      <div>
        <h1 className='text-5xl text-blue-500'>
          Vite + Shadcn Starter Template
        </h1>
        <div className='flex items-center gap-3'>
          <Button>Get started</Button>
          <a href='https://www.damilolabada.com' target='_blank'>
            Visit my website
          </a>
        </div>
      </div>
    </TailwindIndicator>
  )
}

export default App
