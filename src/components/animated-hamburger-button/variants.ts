const ANIMATED_HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%']
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%']
    }
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg']
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg']
    }
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%'
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 10px)'
    }
  }
}

const UNDERLAY_VARIANTS = {
  open: {
    width: 'calc(100% - 32px)',
    height: 'calc(100vh - 32px)',
    transition: { type: 'spring', mass: 3, stiffness: 400, damping: 50 }
  },
  closed: {
    width: '80px',
    height: '80px',
    transition: {
      delay: 0.75,
      type: 'spring',
      mass: 3,
      stiffness: 400,
      damping: 50
    }
  }
}

export { ANIMATED_HAMBURGER_VARIANTS, UNDERLAY_VARIANTS }
