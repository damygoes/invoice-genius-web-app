import Error404Image from '@/assets/page-not-found.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Heading } from '../ui/heading'
import { Typography } from '../ui/typography'

const Error404Page = () => {
  const { t } = useTranslation()
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='w-1/2'>
        <img
          src={Error404Image}
          alt='Error 404'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col items-center justify-start gap-1'>
        <Heading className='text-4xl font-bold'>
          {t('error404Page.title', 'Page not found')}
        </Heading>
        <Typography className='font-light'>
          {t(
            'error404Page.description',
            'The page you are looking for does not exist or has been moved.'
          )}
        </Typography>
        <Link to='/dashboard'>
          <Button className='mt-5'>
            {t('error404Page.action', 'Go to dashboard')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Error404Page
