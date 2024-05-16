import { cn } from '@/lib/utils'
import { NavigationLinks } from '@/routes/navigation-links'
import { NavLink, Outlet } from 'react-router-dom'

const AppShell = () => {
  return (
    <section className='text-black flex h-screen w-screen flex-col items-start justify-start gap-4 overflow-hidden bg-background'>
      <header className='flex w-full'>
        <nav className='flex items-center gap-3'>
          {NavigationLinks().map(link => (
            <NavLink
              key={link.href}
              to={link.href}
              className={cn('rounded-lg bg-accent p-3')}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </section>
  )
}

export default AppShell
