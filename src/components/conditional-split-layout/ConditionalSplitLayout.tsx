import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface IConditionalSplitLayoutProps {
  mainComponentToRender: ReactNode
  splitCondition?: boolean
  componentToRenderWhenSplit?: ReactNode
}

const ConditionalSplitLayout = ({
  mainComponentToRender,
  splitCondition,
  componentToRenderWhenSplit
}: IConditionalSplitLayoutProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full space-x-4 p-8 data-[panel-group-direction=vertical]:flex-col'
      )}
    >
      <div className='h-full w-full overflow-auto rounded-xl bg-card p-4 shadow-sm'>
        {mainComponentToRender}
      </div>
      {splitCondition && (
        <div className='h-full w-full rounded-xl bg-card p-4 shadow-sm'>
          {componentToRenderWhenSplit}
        </div>
      )}
    </div>
  )
}

export default ConditionalSplitLayout
