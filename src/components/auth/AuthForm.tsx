import { useAuth } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Heading } from '../ui/heading'
import { Input } from '../ui/input'
import { Typography } from '../ui/typography'
import { useToast } from '../ui/use-toast'

const AuthForm = () => {
  const queryClient = new QueryClient()
  const { t } = useTranslation()
  const { requestOTP, setAuthStep, setIntendingUserEmail } = useAuth()
  const { toast } = useToast()
  const authFormSchema = z.object({
    email: z.string().email()
  })

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: ''
    }
  })

  const otpRequestMutation = useMutation({
    mutationFn: () => requestOTP(form.getValues('email')),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['otp_request']
      })
    }
  })

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    setIntendingUserEmail(values.email)
    setAuthStep(1)
    try {
      await otpRequestMutation.mutateAsync()
      toast({
        title: `${t('authPage.toasts.success.title', 'Email sent')}`,
        description: `${t('authPage.toasts.success.description', 'Please check your email for the verification code.')} ${form.getValues('email')}`
      })
    } catch (error) {
      toast({
        title: `${t('authPage.toasts.error.title', 'Error')}`,
        description: `${t('authPage.toasts.error.description', 'An error occurred while sending the verification email to:')} ${form.getValues('email')}`
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
            {t('authPage.title', 'Get started')}
          </Heading>
          <Typography size='sm'>
            {t('authPage.subtitle', 'Enter your email to get started')}
          </Typography>
        </div>
        <div className='grid gap-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('authPage.form.email', 'Email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('authPage.form.email', 'Email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className='w-full'>
          {otpRequestMutation.isPending
            ? `${t('authPage.button.emailSubmissionPending', 'Loading...')}`
            : `${t('authPage.button.continue', 'Continue')}`}
        </Button>
        {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
        <div className='mt-4 text-center text-sm'>
          <Typography size='sm'>
            {t(
              'authPage.form.footer',
              'No registration needed. Just enter your email and we cover the rest'
            )}
          </Typography>
        </div>
      </form>
    </Form>
  )
}

export default AuthForm
