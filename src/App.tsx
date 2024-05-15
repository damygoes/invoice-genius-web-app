import TailwindIndicator from '@/components/providers/tailwind-indicator'
import axios from 'axios'
import { Button } from './components/ui/button'
function App() {
  const handleLogin = async () => {
    console.log('Login clicked')
    const res = await axios.get('http://localhost:3000/api/v1/auth/login')
    console.log('res', res)
    console.log('res data', res.data)
  }
  return (
    <>
      <div>
        <h1 className='text-5xl text-blue-500'>
          Vite + Shadcn Starter Template
        </h1>
        <div className='flex items-center gap-3'>
          <Button onClick={handleLogin}>Get started</Button>
          <a href='https://www.damilolabada.com' target='_blank'>
            Visit my website
          </a>
        </div>
      </div>
      <TailwindIndicator />
    </>
  )
}

export default App
