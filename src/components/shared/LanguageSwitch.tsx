import { getLanguageFlagAndName } from '@/utils/get-language-flag-and-name'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

interface ILanguageSwitchProps {
  setName?: (name: string) => void
}

function LanguageSwitch({ setName }: ILanguageSwitchProps) {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [selectedLanguageFlag, setSelectedLanguageFlag] = useState<string>(
    getLanguageFlagAndName('en').flag
  )

  useEffect(() => {
    const savedLang = localStorage.getItem('invoice_genius_app_language')
    if (savedLang) {
      i18n.changeLanguage(savedLang)
      setSelectedLanguage(savedLang)
      setSelectedLanguageFlag(getLanguageFlagAndName(savedLang).flag)
      setName?.(getLanguageFlagAndName(savedLang).name)
    } else {
      i18n.changeLanguage('en')
      setSelectedLanguage('en')
      setSelectedLanguageFlag(getLanguageFlagAndName('en').flag)
      setName?.(getLanguageFlagAndName('en').name)
    }
  }, [i18n, setName])

  useEffect(() => {
    setSelectedLanguageFlag(getLanguageFlagAndName(selectedLanguage).flag)
    setName?.(getLanguageFlagAndName(selectedLanguage).name)
  }, [selectedLanguage, setName])

  const switchLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang)
      setSelectedLanguage(lang)
      setSelectedLanguageFlag(getLanguageFlagAndName(lang).flag)
      localStorage.setItem('invoice_genius_app_language', lang)
      setName?.(getLanguageFlagAndName(lang).name)
    } catch (error) {
      console.error('Error changing language', error)
    }
  }

  const languageOptions = Object.keys(i18n.options.resources || {}).map(
    lang => (
      <DropdownMenuItem key={lang} onClick={() => switchLanguage(lang)}>
        {getLanguageFlagAndName(lang).flag} {getLanguageFlagAndName(lang).name}
      </DropdownMenuItem>
    )
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='outline' className='size-8'>
          {selectedLanguageFlag}
          <span className='sr-only'>Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' side='right'>
        {languageOptions}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitch
