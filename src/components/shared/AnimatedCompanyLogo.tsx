import { motion } from 'framer-motion'
import { Icons } from './Icons'

const CompanyLogo = Icons.companyLogo
const AnimatedCompanyLogo = () => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: 'easeInOut' }
      }}
      exit={{ opacity: 0, y: -12 }}
      href='#'
      className='bg-white grid h-20 w-20 place-content-center rounded-br-xl rounded-tl-xl transition-colors hover:bg-accent'
    >
      <CompanyLogo />
    </motion.a>
  )
}

export default AnimatedCompanyLogo
