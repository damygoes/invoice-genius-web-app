import { useMobileNavbar } from '@/hooks/useMobileNavbar'
import { motion } from 'framer-motion'
import { ANIMATED_HAMBURGER_VARIANTS, UNDERLAY_VARIANTS } from './variants'

const AnimatedHamburgerButton = () => {
  const { isOpen, toggleNavbar } = useMobileNavbar()

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 6, right: 16 }}
        className='fixed z-10 rounded-xl bg-background shadow-lg shadow-foreground/20'
      />

      <motion.button
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        onClick={toggleNavbar}
        className={`group fixed right-4 top-4 z-50 h-20 w-20 bg-background transition-all hover:bg-foreground/20 ${
          isOpen ? 'rounded-bl-xl rounded-tr-xl' : 'rounded-xl'
        }`}
      >
        <motion.span
          variants={ANIMATED_HAMBURGER_VARIANTS.top}
          className='absolute block h-1 w-10 bg-foreground'
          style={{ y: '-50%', left: '50%', x: '-50%' }}
        />
        <motion.span
          variants={ANIMATED_HAMBURGER_VARIANTS.middle}
          className='absolute block h-1 w-10 bg-foreground'
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={ANIMATED_HAMBURGER_VARIANTS.bottom}
          className='absolute block h-1 w-5 bg-foreground'
          style={{ x: '-50%', y: '50%' }}
        />
      </motion.button>
    </>
  )
}

export default AnimatedHamburgerButton
