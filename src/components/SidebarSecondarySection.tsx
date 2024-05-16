import { useSidebar } from '@/hooks/useSidebar'
import ThemeToggle from './ThemeToggle'

const SidebarSecondarySection = () => {
  const { isSidebarCollapsed } = useSidebar()
  return (
    <section className='flex h-auto w-full flex-col items-center gap-2'>
      {isSidebarCollapsed ? (
        <ThemeToggle />
      ) : (
        <div className='group flex w-full items-center justify-start gap-2 rounded-sm p-3 transition-colors duration-200 ease-in-out hover:bg-accent/60'>
          <ThemeToggle />
          <p>Theme</p>
        </div>
      )}
      {isSidebarCollapsed ? (
        <ThemeToggle />
      ) : (
        <div className='group flex w-full items-center justify-start gap-2 rounded-sm p-3 transition-colors duration-200 ease-in-out hover:bg-accent/60'>
          <ThemeToggle />
          <p>Language</p>
        </div>
      )}
    </section>
  )
}

export default SidebarSecondarySection
