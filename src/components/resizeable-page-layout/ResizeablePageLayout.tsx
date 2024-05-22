import { ReactNode } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '../ui/resizable'

type ResizeablePageLayoutProps = {
  leftSection: ReactNode
  rightSection: ReactNode
}

const ResizeablePageLayout = ({
  leftSection,
  rightSection
}: ResizeablePageLayoutProps) => {
  return (
    <ResizablePanelGroup direction='horizontal' className='space-x-4 p-8'>
      <ResizablePanel className='h-full w-full overflow-auto rounded-xl bg-card p-4 shadow-sm'>
        {leftSection}
      </ResizablePanel>
      <ResizableHandle className='my-auto h-4/5 bg-muted-foreground' />
      <ResizablePanel className='h-full w-full rounded-xl bg-card p-4 shadow-sm'>
        {rightSection}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ResizeablePageLayout
