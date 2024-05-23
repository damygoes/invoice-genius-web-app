import { useAuth } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Heading } from '../ui/heading'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '../ui/input-otp'
import { Typography } from '../ui/typography'
import { useToast } from '../ui/use-toast'

const OTPForm = () => {
  const queryClient = new QueryClient()
  const { t } = useTranslation()
  const { toast } = useToast()
  const { intendingUserEmail, verifyOTP, resetStore } = useAuth()
  const navigate = useNavigate()

  const otpFormSchema = z.object({
    otp: z
      .string()
      .min(6, {
        message: `${t('authPage.otp.otpFormError', 'OTP must be 6 characters')}`
      })
      .max(6)
  })

  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: ''
    }
  })

  const verificationRequestMutation = useMutation({
    mutationFn: () =>
      verifyOTP(intendingUserEmail as string, form.getValues('otp')),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['otp_request', 'verify_otp']
      })
    }
  })

  async function onSubmit() {
    try {
      await verificationRequestMutation.mutateAsync()
      resetStore()
      toast({
        title: `${t('authPage.toasts.verificationSuccess.title', 'Email verified successfully.')}`,
        description: `${t('authPage.toasts.verificationSuccess.description', 'Please update your profile to have the best experience.')}`
      })
      navigate('/callback')
    } catch (error) {
      toast({
        title: `${t('authPage.toasts.verificationError.title', 'Error')}`,
        description: `${t('authPage.toasts.verificationError.description', 'An error occurred while verifying the OTP.')}`
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto grid w-[350px] gap-6'
      >
        <div className='grid gap-2 text-center'>
          <Heading className='font-bold'>
            {t('authPage.otp.title', 'Enter verification code')}
          </Heading>
          <Typography size='sm'>
            {t('authPage.otp.subtitle', 'Enter the OTP sent to your email')}:
            {intendingUserEmail}
          </Typography>
        </div>
        <div className='grid gap-4'>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem className='mx-auto'>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className='w-full'>
          {t('authPage.button.verify', 'Verify Code')}
        </Button>
      </form>
    </Form>
  )
}

export default OTPForm
