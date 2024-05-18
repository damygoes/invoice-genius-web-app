import { useMobileNavbar } from '@/hooks/useMobileNavbar'
import { cn } from '@/lib/utils'
import { MobileNavLinkItem } from '@/routes/navigation-links'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

type MobileNavItemProps = {
  link: MobileNavLinkItem
  index: number
}

function MobileNavItem({ link, index }: MobileNavItemProps) {
  const navigate = useNavigate()
  const { setNavbar } = useMobileNavbar()
  const active = window.location.pathname === link.href

  const handleNavItemClick = (link: MobileNavLinkItem) => {
    setNavbar(false)
    setTimeout(() => {
      navigate(link.href)
    }, 300) // Adjust the delay if necessary to match the close animation duration
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + index * 0.125,
          duration: 0.5,
          ease: 'easeInOut'
        }
      }}
      exit={{ opacity: 0, y: -8 }}
      className={cn(
        'block cursor-pointer text-5xl font-semibold lowercase transition-colors hover:text-foreground/50 md:text-7xl',
        {
          'text-primary hover:text-primary': active,
          'text-foreground': !active
        }
      )}
      onClick={() => handleNavItemClick(link)}
    >
      <span>
        {link.icon && (
          <link.icon className='mr-2 inline-block size-4 align-baseline' />
        )}
      </span>
      {link.title}
    </motion.span>
  )
}

export default MobileNavItem
