import { SidebarProvider } from '@/context/sidebar-context'
import useMediaQuery from '@/hooks/useMediaQuery'
import useMouseOnSidebar from '@/hooks/useMouseOnSidebar'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import AppShellSidebarToggle from './AppShellSidebarToggle'

type AppShellProps = {
  navigationBar: ReactNode
  children: ReactNode
}

const AppShellLayout = ({ navigationBar, children }: AppShellProps) => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar()
  const isMouseOnLeftSide = useMouseOnSidebar()
  const screenSize = useMediaQuery()

  const isDesktop = screenSize === 'lg' || screenSize === 'xl'

  return (
    <section className='flex h-screen w-screen flex-col justify-start gap-2 overflow-hidden bg-background lg:flex-row lg:justify-between'>
      {isDesktop ? (
        <aside
          data-collapsed={isSidebarCollapsed}
          className={cn(
            'group relative inline-flex h-full w-full flex-shrink-0 flex-col items-center justify-between',
            {
              'lg:w-[60px]': isSidebarCollapsed,
              'lg:w-[200px] lg:max-w-[200px]': !isSidebarCollapsed
            }
          )}
        >
          {isMouseOnLeftSide && (
            <AppShellSidebarToggle
              isSidebarCollapsed={isSidebarCollapsed}
              onClick={toggleSidebar}
            />
          )}
          {navigationBar}
        </aside>
      ) : (
        <header className='w-full'>{navigationBar}</header>
      )}
      <main className='h-full w-full overflow-hidden'>{children}</main>
    </section>
  )
}

export default function AppShell(props: AppShellProps) {
  return (
    <SidebarProvider>
      <AppShellLayout {...props} />
    </SidebarProvider>
  )
}
