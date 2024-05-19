import { Icons } from '@/components/shared/Icons'
import SidebarSecondarySection from '@/components/sidebar/SidebarSecondarySection'
import { useSidebar } from '@/hooks/useSidebar'
import { DesktopNavLinkItem } from '@/routes/navigation-links'
import { useLocation } from 'react-router-dom'
import { default as NavItem } from '../nav-items/nav-item'
import NavItemWithTooltip from '../nav-items/nav-item-with-tooltip'

type DesktopSidebarProps = {
  links: DesktopNavLinkItem[]
  logo?: string
}

function DesktopSidebar({ links, logo }: DesktopSidebarProps) {
  const { isSidebarCollapsed } = useSidebar()
  const location = useLocation()
  const CompanyLogo = Icons.companyLogo

  const isActiveLink = (linkHref: string) => {
    return location.pathname === linkHref
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-6 bg-muted px-2 py-4 shadow-xl'>
      {logo ? (
        <img src={logo || 'Logo'} alt='apomap Logo' className='h-6' />
      ) : (
        <CompanyLogo />
      )}

      <nav className='flex w-full flex-1 flex-col items-center gap-6 py-12'>
        <div className='flex h-full w-full flex-col items-center justify-start gap-5 px-3'>
          {links.map((link, index) =>
            isSidebarCollapsed ? (
              <NavItemWithTooltip
                key={index}
                link={link}
                active={isActiveLink(link.href)}
              />
            ) : (
              <NavItem
                key={index + 1}
                link={link}
                active={isActiveLink(link.href)}
              />
            )
          )}
        </div>
      </nav>
      <SidebarSecondarySection />
    </div>
  )
}

export default DesktopSidebar
