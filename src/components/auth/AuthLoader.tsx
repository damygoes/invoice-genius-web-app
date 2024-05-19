import { Loader } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Typography } from '../ui/typography'

const AuthLoader = () => {
  const { t } = useTranslation()
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-background'>
      <Loader className='mr-2 animate-spin' />
      <Typography size='2xl'>{t('common.authLoader', 'Loading...')}</Typography>
    </div>
  )
}

export default AuthLoader
