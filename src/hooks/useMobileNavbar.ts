import { create } from 'zustand'

type MobileNavbarStore = {
  isOpen: boolean
  toggleNavbar: () => void
  setNavbar: (isOpen: boolean) => void
}

const useMobileNavbarStore = create<MobileNavbarStore>(set => ({
  isOpen: false,
  toggleNavbar: () => set(state => ({ isOpen: !state.isOpen })),
  setNavbar: isOpen => set({ isOpen })
}))

export const useMobileNavbar = () => {
  const { isOpen, toggleNavbar, setNavbar } = useMobileNavbarStore()

  return { isOpen, toggleNavbar, setNavbar }
}
