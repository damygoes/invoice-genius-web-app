export const getLanguageFlagAndName = (lang: string) => {
  switch (lang) {
    case 'en':
      return { flag: '🇺🇸', name: 'English' }
    case 'de':
      return { flag: '🇩🇪', name: 'Deutsch' }
    case 'es':
      return { flag: '🇪🇸', name: 'Spanish' }
    case 'fr':
      return { flag: '🇫🇷', name: 'French' }
    case 'it':
      return { flag: '🇮🇹', name: 'Italian' }
    case 'ja':
      return { flag: '🇯🇵', name: 'Japanese' }
    case 'ko':
      return { flag: '🇰🇷', name: 'Korean' }
    case 'pt':
      return { flag: '🇵🇹', name: 'Portuguese' }
    case 'ru':
      return { flag: '🇷🇺', name: 'Russian' }
    case 'zh':
      return { flag: '🇨🇳', name: 'Chinese' }
    default:
      return { flag: '🌐', name: 'World' }
  }
}
