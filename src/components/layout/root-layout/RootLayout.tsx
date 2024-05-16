import DesktopSidebar from '@/components/navigation/desktop/DesktopSidebar'
import MobileNavbar from '@/components/navigation/mobile/MobileNavbar'
import useMediaQuery from '@/hooks/useMediaQuery'
import { DesktopNavigationLinks } from '@/routes/navigation-links'
import { Outlet } from 'react-router-dom'
import AppShell from '../app-layout/AppShell'

const RootLayout = () => {
  const screenSize = useMediaQuery()

  // Define navigation component based on the screen size
  const NavigationComponent =
    screenSize === 'lg' || screenSize === 'xl' ? DesktopSidebar : MobileNavbar

  return (
    <AppShell
      navigationBar={
        <NavigationComponent
          links={DesktopNavigationLinks()}
          logo={
            'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D'
          }
        />
      }
    >
      <Outlet />
    </AppShell>
  )
}

export default RootLayout
