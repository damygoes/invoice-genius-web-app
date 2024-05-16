import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type AppShellSidebarToggleProps = React.HTMLAttributes<HTMLButtonElement> & {
  isSidebarCollapsed: boolean
  onClick: () => void
  className?: string
}

function AppShellSidebarToggle({
  isSidebarCollapsed,
  onClick
}: AppShellSidebarToggleProps) {
  return (
    <Button
      onClick={onClick}
      size='icon'
      variant='secondary'
      className={cn(
        'absolute -right-3 top-10 z-50 hidden size-8 cursor-pointer items-center justify-center rounded-full lg:flex'
      )}
    >
      {isSidebarCollapsed ? (
        <ChevronRight size={16} strokeWidth={1.2} />
      ) : (
        <ChevronLeft size={16} strokeWidth={1.2} />
      )}
    </Button>
  )
}

export default AppShellSidebarToggle
