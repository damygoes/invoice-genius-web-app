import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Typography } from '../ui/typography'

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
    <div
      className={cn(
        'group flex items-center justify-start gap-2 rounded-sm p-3 transition-colors duration-200 ease-in-out hover:bg-accent/60',
        {
          'w-full': !isSidebarCollapsed
        }
      )}
    >
      {isSidebarCollapsed ? (
        children
      ) : (
        <>
          {component}
          <Typography size='sm'>{label}</Typography>
        </>
      )}
    </div>
  )
}

export default SidebarSecondaryItem
