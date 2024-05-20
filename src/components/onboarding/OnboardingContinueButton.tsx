import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

type OnboardingContinueButtonProps = {
  onClick: () => void
  disabled: boolean
}

const OnboardingContinueButton = ({
  onClick,
  disabled
}: OnboardingContinueButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      type='button'
      className='w-full lg:max-w-2xl'
      onClick={onClick}
      disabled={disabled}
    >
      {t('onboarding.continue', 'Continue')}
    </Button>
  )
}

export default OnboardingContinueButton
