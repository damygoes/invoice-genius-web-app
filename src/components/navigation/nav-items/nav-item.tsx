import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { DesktopNavLinkItem } from '@/routes/navigation-links'
import { renderIcon } from '@/utils/render-nav-icons'
import { NavLink } from 'react-router-dom'

export type NavItemProps = {
  link: DesktopNavLinkItem
  active?: boolean
}

function NavItem({ link, active }: NavItemProps) {
  return (
    <NavLink
      to={link.href}
      className={cn(
        'group flex w-full items-center justify-start gap-2 rounded-sm p-2 transition-colors duration-200 ease-in-out hover:bg-accent/60',
        {
          'bg-accent': !active,
          'bg-background': active
        }
      )}
    >
      {renderIcon(link.icon)}
      <Typography size='sm'>{link.title}</Typography>
      {link.label && (
        <Typography size='sm' className={cn('ml-auto')}>
          {link.label}
        </Typography>
      )}
    </NavLink>
  )
}

export default NavItem
