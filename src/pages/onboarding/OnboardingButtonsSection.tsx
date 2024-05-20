import OnboardingBackButton from '@/components/onboarding/OnboardingBackButton'
import OnboardingContinueButton from '@/components/onboarding/OnboardingContinueButton'
import OnboardingFinishButton from '@/components/onboarding/OnboardingFinishButton'
import { useOnboarding } from '@/hooks/useOnboarding'

const OnboardingButtonsSection = () => {
  const {
    onboardingStep,
    selectedUserType,
    onboardingOngoing,
    selectedServices,
    setOnboardingStep
  } = useOnboarding()
  if (onboardingStep === 0 && selectedUserType === 'private') {
    return (
      <OnboardingFinishButton
        disabled={selectedServices.size === 0 || onboardingOngoing}
      />
    )
  }

  if (onboardingStep === 0 && selectedUserType === 'business') {
    return (
      <OnboardingContinueButton
        onClick={() => setOnboardingStep(1)}
        disabled={selectedServices.size === 0 || onboardingOngoing}
      />
    )
  }

  if (onboardingStep === 1) {
    return (
      <>
        <OnboardingBackButton
          onClick={() => setOnboardingStep(0)}
          disabled={onboardingOngoing}
        />
        <OnboardingFinishButton disabled={onboardingOngoing} />
      </>
    )
  }

  return null
}

export default OnboardingButtonsSection
