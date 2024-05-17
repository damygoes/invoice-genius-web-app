import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { DesktopNavLinkItem } from '@/routes/navigation-links'
import { renderIcon } from '@/utils/render-nav-icons'
import { NavLink } from 'react-router-dom'

type NavItemWithTooltipProps = {
  link: DesktopNavLinkItem
  active?: boolean
}

function NavItemWithTooltip({ link, active }: NavItemWithTooltipProps) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <NavLink
          to={link.href}
          className={cn(
            'group flex size-10 items-center justify-center gap-3 rounded-sm p-1 transition-colors duration-200 ease-in-out hover:bg-accent/60',
            {
              'bg-accent': !active,
              'bg-background': active
            }
          )}
        >
          {renderIcon(link.icon)}
          <Typography className='sr-only'>{link.title}</Typography>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        <Typography size='sm'> {link.title}</Typography>
        {link.label && (
          <Typography className='ml-auto' size='sm'>
            {link.label}
          </Typography>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

export default NavItemWithTooltip
