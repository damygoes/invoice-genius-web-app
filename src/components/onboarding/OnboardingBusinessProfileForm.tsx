import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { onboardingBusinessUserProfileFormSchema } from '@/models/businessUserProfileFormSchema'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

type OnboardingBusinessUserProfileFormProps = {
  form: UseFormReturn<z.infer<typeof onboardingBusinessUserProfileFormSchema>>
  className?: string
}

const OnboardingBusinessUserProfileForm = ({
  form,
  className
}: OnboardingBusinessUserProfileFormProps) => {
  const {
    register,
    clearErrors,
    formState: { errors }
  } = form
  const { t } = useTranslation()
  return (
    <div>
      <Form {...form}>
        <div className='mb-5 w-full lg:max-w-2xl'>
          <Typography className='text-left italic' size='sm'>
            {t(
              'onboarding.formDescription',
              'Please provide your business information. You can always update this later in your profile.'
            )}
          </Typography>
        </div>
        <div
          className={cn(
            'scrollbar-hide flex h-full w-full flex-col justify-start overflow-y-auto overflow-x-hidden lg:max-w-2xl',
            className
          )}
        >
          <ScrollArea className='h-full'>
            <FormField
              control={form.control}
              name='businessName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('profileForm.labels.businessName', 'Business Name')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${t('profileForm.labels.businessName', 'Company Name')}`}
                      {...field}
                      {...register('businessName', {
                        onChange: () => clearErrors('businessName')
                      })}
                    />
                  </FormControl>
                  <FormMessage>{errors.businessName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className='my-2 grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
              <FormField
                control={form.control}
                name='industry'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('profileForm.labels.industry', 'Industry')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${t('profileForm.labels.industryPlaceholder', 'Industry')}`}
                        {...field}
                        {...register('industry', {
                          onChange: () => clearErrors('industry')
                        })}
                      />
                    </FormControl>
                    <FormMessage>{errors.industry?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='businessEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('profileForm.labels.email', 'Business Email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${t('profileForm.labels.email', 'Business Email')}`}
                        {...field}
                        {...register('businessEmail', {
                          onChange: () => clearErrors('businessEmail')
                        })}
                      />
                    </FormControl>
                    <FormMessage>{errors.businessEmail?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className='grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-2'>
              <Typography className='col-span-2 mt-2 font-semibold'>
                Business Address
              </Typography>
              <FormField
                control={form.control}
                name='businessAddress.street'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>
                      {t('profileForm.labels.address.street', 'Street')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${t('profileForm.labels.address.street', 'Street')}`}
                        {...field}
                        {...register('businessAddress.street', {
                          onChange: () => clearErrors('businessAddress.street')
                        })}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.businessAddress?.street?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className='grid w-full grid-cols-1 gap-x-5 lg:col-span-2 lg:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='businessAddress.state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('profileForm.labels.address.state', 'State')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${t('profileForm.labels.address.state', 'State')}`}
                          {...field}
                          {...register('businessAddress.state', {
                            onChange: () => clearErrors('businessAddress.state')
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.businessAddress?.state?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='businessAddress.country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('profileForm.labels.address.country', 'Country')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${t('profileForm.labels.address.country', 'Country')}`}
                          {...field}
                          {...register('businessAddress.country', {
                            onChange: () =>
                              clearErrors('businessAddress.country')
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.businessAddress?.country?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 gap-3 gap-x-5 lg:col-span-2 lg:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='businessAddress.number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('profileForm.labels.address.number', 'Number')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${t('profileForm.labels.address.number', 'Number')}`}
                          {...field}
                          {...register('businessAddress.number', {
                            onChange: () =>
                              clearErrors('businessAddress.number')
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.businessAddress?.number?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='businessAddress.zip'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('profileForm.labels.address.zip', 'Zip')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${t('profileForm.labels.address.zip', 'Zip')}`}
                          {...field}
                          {...register('businessAddress.zip', {
                            onChange: () => clearErrors('businessAddress.zip')
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.businessAddress?.zip?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='businessAddress.city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('profileForm.labels.address.city', 'City')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${t('profileForm.labels.address.city', 'City')}`}
                          {...field}
                          {...register('businessAddress.city', {
                            onChange: () => clearErrors('businessAddress.city')
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.businessAddress?.city?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </Form>
    </div>
  )
}

export default OnboardingBusinessUserProfileForm
