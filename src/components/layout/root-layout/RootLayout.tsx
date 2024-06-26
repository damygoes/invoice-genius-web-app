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
      navigationBar={<NavigationComponent links={DesktopNavigationLinks()} />}
    >
      <Outlet />
    </AppShell>
  )
}

export default RootLayout
