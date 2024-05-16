import { SidebarProvider } from '@/context/sidebar-context'
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
  return (
    <section className='flex h-screen w-screen flex-col justify-start gap-2 overflow-hidden bg-background lg:flex-row lg:justify-between'>
      <div
        data-collapsed={isSidebarCollapsed}
        className={cn(
          'group relative inline-flex h-full w-full flex-shrink-0 flex-col items-center justify-between',
          {
            'lg:px-md lg:py-xl lg:w-[78px]': isSidebarCollapsed,
            'lg:w-[180px] lg:max-w-[180px]': !isSidebarCollapsed
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
      </div>
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
