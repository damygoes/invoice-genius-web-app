import UserAvatarMenu from '@/components/user/UserAvatarMenu'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from '../shared/LanguageSwitch'
import ThemeToggle from '../shared/ThemeToggle'
import {
  default as SidebarItem,
  default as SidebarSecondaryItem
} from './SidebarItem'

const SidebarSecondarySection = () => {
  const { t } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

  return (
    <section className='flex h-auto w-full flex-col items-center justify-start gap-2'>
      <SidebarSecondaryItem
        component={<ThemeToggle />}
        label={t('themeSwitchTitle', 'Theme')}
      >
        <ThemeToggle />
      </SidebarSecondaryItem>
      <SidebarItem
        component={<LanguageSwitch setName={setSelectedLanguage} />}
        label={selectedLanguage}
      >
        <LanguageSwitch setName={setSelectedLanguage} />
      </SidebarItem>
      <SidebarItem
        component={<UserAvatarMenu />}
        label={t('userProfile', 'Profile')}
      >
        <UserAvatarMenu />
      </SidebarItem>
    </section>
  )
}

export default SidebarSecondarySection
