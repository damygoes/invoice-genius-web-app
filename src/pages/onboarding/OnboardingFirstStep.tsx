import OnboardingSection from '@/components/onboarding/OnboardingSection'
import ServiceSelect from '@/components/service-select/ServiceSelect'
import { Label } from '@/components/ui/label'
import UserTypeSelect from '@/components/user-type-select/UserTypeSelect'
import { useOnboarding } from '@/hooks/useOnboarding'
import { AvailableUserType, ProvidedServices } from '@/types/User'
import { useTranslation } from 'react-i18next'

const OnboardingFirstStep = () => {
  const { t } = useTranslation()
  const {
    selectedUserType,
    selectedServices,
    setSelectedUserType,
    setSelectedServices
  } = useOnboarding()

  const handleUserTypeSelect = (userType: AvailableUserType) => {
    setSelectedUserType(userType)
  }

  const handleServiceSelect = (services: Set<ProvidedServices>) => {
    setSelectedServices(Array.from(services))
  }

  return (
    <>
      <OnboardingSection
        sectionTitle={`${t('onboarding.userSelectTitle', 'What type of user are you?')}`}
        component={
          <UserTypeSelect
            selectedUserType={selectedUserType}
            onSelect={handleUserTypeSelect}
          />
        }
      />
      <OnboardingSection
        sectionTitle={`${t('onboarding.serviceSelectTitle', 'What services do you need?')}`}
        component={
          <div className='flex w-full flex-col gap-5 text-center'>
            <ServiceSelect
              userType={selectedUserType}
              selectedServices={selectedServices}
              onSelect={handleServiceSelect}
            />
            {selectedServices.size === 0 && (
              <Label className='italic'>
                {t(
                  'onboarding.serviceSelectError',
                  'Please select at least one service.'
                )}
              </Label>
            )}
          </div>
        }
      />
    </>
  )
}

export default OnboardingFirstStep
