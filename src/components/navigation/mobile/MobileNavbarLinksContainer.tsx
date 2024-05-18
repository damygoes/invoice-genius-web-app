import { MobileNavLinkItem } from '@/routes/navigation-links'
import { motion } from 'framer-motion'
import MobileNavItem from '../nav-items/mobile-nav-item'

type MobileNavbarLinksContainerProps = {
  links: MobileNavLinkItem[]
}

const MobileNavbarLinksContainer = ({
  links
}: MobileNavbarLinksContainerProps) => {
  return (
    <motion.div className='flex flex-col justify-center gap-8 p-12 pl-4 md:pl-20'>
      {links.map((link, index) => {
        return <MobileNavItem key={index} link={link} index={index} />
      })}
    </motion.div>
  )
}

export default MobileNavbarLinksContainer
