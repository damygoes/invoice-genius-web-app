import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-3 overflow-hidden px-6 pt-2'>
      <header className='sm:bg-transparent sticky top-0 z-30 flex h-14 w-full items-center justify-between gap-8 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:px-0'>
        <Breadcrumb className='hidden md:flex'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to='#'>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to='#'>Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='relative ml-auto max-w-md flex-1 2xl:max-w-7xl'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-md bg-background pl-8'
          />
        </div>
      </header>
      <main className='scrollbar-hide h-full w-full flex-1 overflow-y-auto overflow-x-hidden rounded-t-lg bg-secondary'>
        {children}
      </main>
    </section>
  )
}

export default PageLayout
