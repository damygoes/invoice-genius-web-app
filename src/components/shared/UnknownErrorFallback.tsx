import { useTranslation } from 'react-i18next'

const UnknownErrorFallback = () => {
  const { t } = useTranslation()
  return (
    <div className='flex h-full w-full items-center justify-center'>
      {t('errors.unknownError', 'An unknown error occurred.')}
    </div>
  )
}

export default UnknownErrorFallback
