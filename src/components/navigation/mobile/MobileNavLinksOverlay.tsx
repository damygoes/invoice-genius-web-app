import AnimatedCompanyLogo from '@/components/shared/AnimatedCompanyLogo'
import { MobileNavLinkItem } from '@/routes/navigation-links'
import FooterCTAs from '../footer/FooterCTAs'
import MobileNavbarLinksContainer from './MobileNavbarLinksContainer'

type MobileNavLinksOverlayProps = {
  links: MobileNavLinkItem[]
}

const MobileNavLinksOverlay = ({ links }: MobileNavLinksOverlayProps) => {
  return (
    <nav className='fixed right-4 top-4 z-40 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden'>
      <AnimatedCompanyLogo />
      <MobileNavbarLinksContainer links={links} />
      <FooterCTAs />
    </nav>
  )
}

export default MobileNavLinksOverlay
