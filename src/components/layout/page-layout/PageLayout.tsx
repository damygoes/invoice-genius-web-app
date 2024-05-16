import React from 'react'

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-3 overflow-hidden px-6 pt-2'>
      <header className='h-[8%] w-full rounded-lg bg-secondary p-3'>TOP</header>
      <main className='scrollbar-hide h-full w-full flex-1 overflow-y-auto overflow-x-hidden bg-secondary'>
        {children}
      </main>
    </section>
  )
}

export default PageLayout
