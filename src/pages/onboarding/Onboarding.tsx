import { Heading } from '@/components/ui/heading'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { useOnboarding } from '@/hooks/useOnboarding'
import { useAuthedAppUser } from '@/hooks/useUser'
import { onboardingBusinessUserProfileFormSchema } from '@/models/businessUserProfileFormSchema'
import { AuthUser, AvailableUserType } from '@/types/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import OnboardingBusinessUserProfileForm from './OnboardingBusinessProfileForm'
import OnboardingButtonsSection from './OnboardingButtonsSection'
import OnboardingFirstStep from './OnboardingFirstStep'

const Onboarding = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { authedAppUser, setAuthedAppUser } = useAuthedAppUser()
  const {
    selectedServices,
    selectedUserType,
    setOnboardingOngoing,
    onboardingStep,
    onboardUser
  } = useOnboarding()

  const navigate = useNavigate()

  const businessProfileForm = useForm<
    z.infer<typeof onboardingBusinessUserProfileFormSchema>
  >({
    resolver: zodResolver(onboardingBusinessUserProfileFormSchema),
    defaultValues: {
      businessName: '',
      businessAddress: {
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      businessEmail: '',
      industry: ''
    }
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (onboardingStep === 1) {
      // Handle validation of business user profile form here
      const isValid = await businessProfileForm.trigger()
      if (!isValid) {
        toast({
          title: t(
            'onboarding.validationError',
            'Please fill out all required fields.'
          ),
          variant: 'destructive'
        })
        return
      }
    }

    if (selectedServices.size === 0) {
      toast({
        title: t(
          'onboarding.serviceSelectError',
          'Please select at least one service.'
        ),
        variant: 'destructive'
      })
      return
    }

    if (selectedUserType === 'private') {
      try {
        setOnboardingOngoing(true)
        const onboardedUser = await onboardUser({
          userType: selectedUserType as AvailableUserType,
          services: Array.from(selectedServices),
          user: authedAppUser as AuthUser
        })
        setAuthedAppUser(onboardedUser)
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
    } else {
      try {
        const businessFormData = businessProfileForm.getValues()
        setOnboardingOngoing(true)
        const onboardedUser = await onboardUser(
          {
            userType: selectedUserType as AvailableUserType,
            services: Array.from(selectedServices),
            user: authedAppUser as AuthUser
          },
          businessFormData
        )
        setAuthedAppUser(onboardedUser)
        setOnboardingOngoing(false)
        toast({
          title: t(
            'onboarding.onboardingSuccess.title',
            'Welcome to Invoice Genius 🎉'
          ),
          description: t(
            'onboarding.onboardingSuccess.subtitle',
            'You are now onboarded.'
          ),
          variant: 'default'
        })
        businessProfileForm.reset()
        navigate('/dashboard')
      } catch (error) {
        console.error(error)
        setOnboardingOngoing(false)
        toast({
          title: t('onboarding.onboardingError.title', 'Oops! 🙈'),
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
      <div className='shrink-0 text-center'>
        <Heading>{t('onboarding.title', 'Welcome to Invoice Genius')}</Heading>
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
        {onboardingStep === 0 && <OnboardingFirstStep />}
        {onboardingStep === 1 && (
          <OnboardingBusinessUserProfileForm form={businessProfileForm} />
        )}

        <div className='flex w-full shrink-0 items-center justify-between gap-4 lg:max-w-2xl'>
          <OnboardingButtonsSection />
        </div>
      </form>
    </section>
  )
}

export default Onboarding
