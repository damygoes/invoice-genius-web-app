import LoaderImage from '@/assets/fast-loading.svg'
import { Loader } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Typography } from '../ui/typography'

const LoadingSkeleton = () => {
  const { t } = useTranslation()
  return (
    <div className='flex h-full w-full flex-col'>
      <img
        src={LoaderImage}
        alt='loading'
        className='aspect-video h-36 w-full'
      />
      <div className='-mt-20 flex w-full items-center justify-center'>
        <Loader className='mr-2 animate-spin' />
        <Typography size='lg' className='font-normal lowercase italic'>
          {t('common.loading', 'Loading...')}
        </Typography>
      </div>
    </div>
  )
}

export default LoadingSkeleton
