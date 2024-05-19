import OnboardingSection from '@/components/onboarding/OnboardingSection'
import ServiceSelect from '@/components/service-select/ServiceSelect'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Label } from '@/components/ui/label'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import UserTypeSelect from '@/components/user-type-select/UserTypeSelect'
import { useOnboarding } from '@/hooks/useOnboarding'
import { useAuthedAppUser } from '@/hooks/useUser'
import { AuthUser, AvailableUserType, ProvidedServices } from '@/types/User'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export type OnboardingFormPayload = {
  userType: AvailableUserType
  services: ProvidedServices[]
  user: AuthUser
}

const Onboarding = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { authedAppUser } = useAuthedAppUser()
  const { onboardUser } = useOnboarding()
  const [selectedUserType, setSelectedUserType] =
    useState<AvailableUserType | null>('private')
  const [selectedServices, setSelectedServices] = useState<
    Set<ProvidedServices>
  >(new Set())
  const [onboardingOngoing, setOnboardingOngoing] = useState(false)
  const navigate = useNavigate()

  const handleUserTypeSelect = (userType: AvailableUserType) => {
    setSelectedUserType(userType)
  }

  const handleServiceSelect = (services: Set<ProvidedServices>) => {
    setSelectedServices(services)
  }

  console.log('authedAppUser', authedAppUser)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (selectedServices.size === 0) {
      toast({
        title: t(
          'onboarding.serviceSelectError',
          'Please select at least one service.'
        ),
        variant: 'destructive'
      })
      return
    } else {
      try {
        setOnboardingOngoing(true)
        const onboardedUser = await onboardUser({
          userType: selectedUserType as AvailableUserType,
          services: Array.from(selectedServices),
          user: authedAppUser as AuthUser
        })
        console.log('onboardedUser:', onboardedUser)
        setOnboardingOngoing(false)
        toast({
          title: t(
            'onboarding.onboardingSuccess.title',
            'Welcome to Invoice Genius!'
          ),
          description: t(
            'onboarding.onboardingSuccess.subtitle',
            'You are now onboarded.'
          ),
          variant: 'default'
        })
        navigate('/dashboard')
      } catch (error) {
        console.error(error)
        setOnboardingOngoing(false)
        toast({
          title: t('onboarding.onboardingError.title', 'Oops!'),
          description: t(
            'onboarding.onboardingError.subtitle',
            'Something went wrong. Please try again.'
          ),
          variant: 'destructive'
        })
        navigate('/onboarding')
      }
    }
  }

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-hidden bg-background p-6 lg:p-12'>
      <div className='text-center'>
        <Heading>
          {t('onboarding.title', 'Welcome to Invoice Genius')} 🎉
        </Heading>
        <Typography>
          {t(
            'onboarding.subtitle',
            "Let's get you set up with the services you need."
          )}
        </Typography>
      </div>
      <form
        onSubmit={e => handleSubmit(e)}
        className='flex w-full flex-col items-center justify-between gap-8 p-4 lg:p-8'
      >
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
        <Button
          type='submit'
          className='w-full lg:max-w-2xl'
          disabled={onboardingOngoing}
        >
          {onboardingOngoing
            ? 'Processing your data...'
            : t('onboarding.submit', 'Finish onboarding')}
        </Button>
      </form>
    </section>
  )
}

export default Onboarding
