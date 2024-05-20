import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

type OnboardingBackButtonProps = {
  onClick: () => void
  disabled: boolean
}

const OnboardingBackButton = ({
  onClick,
  disabled
}: OnboardingBackButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      variant='outline'
      type='button'
      className='w-1/3'
      disabled={disabled}
      onClick={onClick}
    >
      <>
        <ArrowLeft size={16} className='mr-2' />
        {t('onboarding.back', 'Back')}
      </>
    </Button>
  )
}

export default OnboardingBackButton
