import { cn } from '@/lib/utils'
import { MobileNavLinkItem } from '@/routes/navigation-links'
import { NavLink } from 'react-router-dom'

export type MobileNavItemProps = {
  link: MobileNavLinkItem
  active?: boolean
}

function MobileNavItem({ link, active }: MobileNavItemProps) {
  return (
    <NavLink
      to={link.href}
      className={cn(
        'text-text-content hover:bg-icon-active-bg group flex w-full items-center gap-3 self-stretch rounded-sm p-4 text-center text-sm font-normal leading-loose transition-colors duration-200 ease-in-out',
        {
          'bg-icon-active-bg': active,
          'bg-transparent': !active
        }
      )}
    >
      {link.title}
    </NavLink>
  )
}

export default MobileNavItem
