import { ReactNode, createContext, useState } from 'react'

type SidebarProviderProps = {
  children: ReactNode
}

export type SidebarContextProps = {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextProps | null>(null)

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
