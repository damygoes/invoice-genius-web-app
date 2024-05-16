import { useSidebar } from '@/hooks/useSidebar'
import { ReactNode } from 'react'

type SidebarItemProps = {
  component: ReactNode
  label: string
  children: ReactNode
}

const SidebarSecondaryItem = ({
  component,
  label,
  children
}: SidebarItemProps) => {
  const { isSidebarCollapsed } = useSidebar()
  return (
    <div className='group flex w-full items-center justify-start gap-2 rounded-sm p-3 transition-colors duration-200 ease-in-out hover:bg-accent/60'>
      {isSidebarCollapsed ? (
        children
      ) : (
        <>
          {component}
          <p>{label}</p>
        </>
      )}
    </div>
  )
}

export default SidebarSecondaryItem
