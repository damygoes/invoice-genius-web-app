import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'

import { useTranslation } from 'react-i18next'

type LoadingButtonProps = {
  isLoading: boolean
  defaultText: string
  loadingText: string
}

const LoadingButton = ({
  isLoading,
  defaultText,
  loadingText
}: LoadingButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button className='w-full'>
      {isLoading ? (
        <>
          <Loader size={16} className='mr-2 animate-spin' />
          {t(loadingText, loadingText)}
        </>
      ) : (
        <>{t(defaultText, defaultText)}</>
      )}
    </Button>
  )
}

export default LoadingButton
