import { useOnboarding } from '@/hooks/useOnboarding'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

type OnboardingFinishButtonProps = {
  disabled: boolean
}

const OnboardingFinishButton = ({ disabled }: OnboardingFinishButtonProps) => {
  const { t } = useTranslation()
  const { onboardingOngoing } = useOnboarding()
  return (
    <Button type='submit' className='flex-1' disabled={disabled}>
      {onboardingOngoing
        ? 'Processing your data...'
        : t('onboarding.submit', 'Finish onboarding')}
    </Button>
  )
}

export default OnboardingFinishButton
