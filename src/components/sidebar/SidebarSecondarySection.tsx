import UserAvatarMenu from '@/user/UserAvatarMenu'
import ThemeToggle from '../ThemeToggle'
import {
  default as SidebarItem,
  default as SidebarSecondaryItem
} from './SidebarItem'

const SidebarSecondarySection = () => {
  return (
    <section className='flex h-auto w-full flex-col items-center gap-2'>
      <SidebarSecondaryItem component={<ThemeToggle />} label='Theme'>
        <ThemeToggle />
      </SidebarSecondaryItem>
      <SidebarItem component={<ThemeToggle />} label='Language'>
        <ThemeToggle />
      </SidebarItem>
      <SidebarItem component={<UserAvatarMenu />} label='Profile'>
        <UserAvatarMenu />
      </SidebarItem>
    </section>
  )
}

export default SidebarSecondarySection
