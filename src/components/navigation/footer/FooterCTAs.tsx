import { useMobileNavbar } from '@/hooks/useMobileNavbar'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SOCIAL_CTA_LINKS } from './socialCtaLinks'

const FooterCTAs = () => {
  const navigate = useNavigate()
  const { setNavbar } = useMobileNavbar()
  const { t } = useTranslation()

  const handleContactUsClick = () => {
    navigate('/contact-us')
    setNavbar(false)
  }

  return (
    <>
      <div className='absolute bottom-6 left-6 flex gap-4 md:flex-col'>
        {SOCIAL_CTA_LINKS.map((link, idx) => {
          return (
            <motion.a
              key={idx}
              href={link.href}
              target='_blank'
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1 + idx * 0.125,
                  duration: 0.5,
                  ease: 'easeInOut'
                }
              }}
              exit={{ opacity: 0, y: -8 }}
            >
              <link.Component className='text-xl text-foreground transition-colors hover:text-primary' />
            </motion.a>
          )
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: 'easeInOut'
          }
        }}
        exit={{ opacity: 0, y: 8 }}
        className='absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-primary px-3 py-3 text-4xl uppercase text-primary-foreground transition-colors hover:bg-primary/80 md:bottom-4 md:right-4 md:px-6 md:text-2xl'
      >
        <span className='hidden md:block' onClick={handleContactUsClick}>
          {t('footer.contactUs', 'Contact Us')}
        </span>
        <ArrowRight />
      </motion.button>
    </>
  )
}

export default FooterCTAs
