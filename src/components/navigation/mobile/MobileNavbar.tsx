import AnimatedHamburgerButton from '@/components/animated-hamburger-button/AnimatedHamburgerButton'
import { useMobileNavbar } from '@/hooks/useMobileNavbar'
import { MobileNavLinkItem } from '@/routes/navigation-links'
import { AnimatePresence } from 'framer-motion'
import MobileNavLinksOverlay from './MobileNavLinksOverlay'

type MobileNavProps = {
  links: MobileNavLinkItem[]
}

const MobileNavbar = ({ links }: MobileNavProps) => {
  const { isOpen } = useMobileNavbar()

  return (
    <>
      <AnimatedHamburgerButton />
      <AnimatePresence>
        {isOpen && <MobileNavLinksOverlay links={links} />}
      </AnimatePresence>
    </>
  )
}

export default MobileNavbar
