import { useUser } from '@/hooks/useUser'
import { cn } from '@/lib/utils'
import { businessUserProfileFormSchema } from '@/models/businessUserProfileFormSchema'
import { BusinessUserProfile } from '@/types/BusinessUserProfile'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { CheckCircle, Edit, Loader, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import ControlledEditingInput from '../controlled-editing-input/ControlledEditingInput'
import ControlledEditingTextarea from '../controlled-editing-text-area/ControlledEditingTextarea'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { ScrollArea } from '../ui/scroll-area'
import { Typography } from '../ui/typography'
import { useToast } from '../ui/use-toast'

type BusinessUserProfileFormProps = {
  profile: BusinessUserProfile | null
  userId: string
  className?: string
}

const BusinessUserProfileForm = ({
  profile,
  userId,
  className
}: BusinessUserProfileFormProps) => {
  const queryClient = new QueryClient()
  const { toast } = useToast()
  const { t } = useTranslation()
  const { updateBusinessUserProfile } = useUser()
  const [isFormInEditMode, setIsFormInEditMode] = useState(false)
  const form = useForm<z.infer<typeof businessUserProfileFormSchema>>({
    resolver: zodResolver(businessUserProfileFormSchema),
    defaultValues: {
      businessName: '',
      businessLogo: '',
      businessAddress: {
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      businessWebsite: '',
      businessInfo: '',
      businessEmail: '',
      businessPhone: '',
      businessMobile: '',
      industry: ''
    }
  })

  useEffect(() => {
    if (profile) {
      form.setValue('businessName', profile.businessName ?? '')
      form.setValue('businessLogo', profile.businessLogo ?? '')
      form.setValue(
        'businessAddress.number',
        profile.businessAddress?.number ?? ''
      )
      form.setValue(
        'businessAddress.street',
        profile.businessAddress?.street ?? ''
      )
      form.setValue('businessAddress.city', profile.businessAddress?.city ?? '')
      form.setValue(
        'businessAddress.state',
        profile.businessAddress?.state ?? ''
      )
      form.setValue('businessAddress.zip', profile.businessAddress?.zip ?? '')
      form.setValue(
        'businessAddress.country',
        profile.businessAddress?.country ?? ''
      )
      form.setValue('businessWebsite', profile.businessWebsite ?? '')
      form.setValue('businessInfo', profile.businessInfo ?? '')
      form.setValue('businessEmail', profile.businessEmail ?? '')
      form.setValue('businessPhone', profile.businessPhone ?? '')
      form.setValue('businessMobile', profile.businessMobile ?? '')
      form.setValue('industry', profile.industry ?? '')
    }
  }, [form, profile])

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof businessUserProfileFormSchema>) =>
      updateBusinessUserProfile(userId, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['userProfile', `userProfile_${userId}`]
      })
      window.location.reload()
    }
  })

  async function onSubmit(
    values: z.infer<typeof businessUserProfileFormSchema>
  ) {
    try {
      await updateMutation.mutateAsync(values)
      toast({
        title: `${t('profileForm.toasts.success', 'Profile updated successfully')}`,
        variant: 'default'
      })
    } catch (error) {
      console.error('Error updating profile', error)
      toast({
        title: `${t('profileForm.toasts.error', 'Error updating profile')}`,
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <Typography size='2xl'>
        {t('profileForm.title.business', 'Business Profile')}
      </Typography>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'scrollbar-hide flex h-full flex-col justify-start gap-10 overflow-y-auto overflow-x-hidden p-2',
          className
        )}
      >
        <ScrollArea className='h-[85%] pt-4'>
          <div className='my-2 grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='businessLogo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Logo</FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder='Business Logo'
                      disabled={!isFormInEditMode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='businessName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('profileForm.labels.businessName', 'Company Name')}
                  </FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.businessName', 'Company Name')}`}
                      disabled={!isFormInEditMode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='businessInfo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('profileForm.labels.businessInfo', 'Company Description')}
                </FormLabel>
                <FormControl>
                  <ControlledEditingTextarea
                    placeholder={`${t('profileForm.labels.businessInfo', 'Company Description')}`}
                    disabled={!isFormInEditMode}
                    className='text-balance'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='industry'
            render={({ field }) => (
              <FormItem className='mb-5 mt-2'>
                <FormLabel>
                  {t('profileForm.labels.industry', 'Industry')}
                </FormLabel>
                <FormControl>
                  <ControlledEditingInput
                    placeholder={`${t('profileForm.labels.industry', 'Industry')}`}
                    disabled={!isFormInEditMode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-2'>
            <Typography className='col-span-2 mb-2 font-semibold'>
              {t('profileForm.title.businessAddress', 'Business Address')}
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
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.address.street', 'Street')}`}
                      disabled={!isFormInEditMode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='col-span-2 grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
              <FormField
                control={form.control}
                name='businessAddress.state'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('profileForm.labels.address.state', 'State')}
                    </FormLabel>
                    <FormControl>
                      <ControlledEditingInput
                        placeholder={`${t('profileForm.labels.address.state', 'State')}`}
                        disabled={!isFormInEditMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <ControlledEditingInput
                        placeholder={`${t('profileForm.labels.address.country', 'Country')}`}
                        disabled={!isFormInEditMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 gap-3 gap-x-5 lg:col-span-2 lg:grid-cols-3 lg:gap-y-2'>
              <FormField
                control={form.control}
                name='businessAddress.number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('profileForm.labels.address.number', 'Number')}
                    </FormLabel>
                    <FormControl>
                      <ControlledEditingInput
                        placeholder={`${t('profileForm.labels.address.number', 'Number')}`}
                        disabled={!isFormInEditMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <ControlledEditingInput
                        placeholder={`${t('profileForm.labels.address.zip', 'Zip')}`}
                        disabled={!isFormInEditMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <ControlledEditingInput
                        placeholder={`${t('profileForm.labels.address.city', 'City')}`}
                        disabled={!isFormInEditMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name='businessWebsite'
            render={({ field }) => (
              <FormItem className='my-2'>
                <FormLabel>
                  {t('profileForm.labels.website', 'Website')}
                </FormLabel>
                <FormControl>
                  <ControlledEditingInput
                    placeholder={`${t('profileForm.labels.website', 'Website')}`}
                    disabled={!isFormInEditMode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='businessEmail'
            render={({ field }) => (
              <FormItem className='my-2'>
                <FormLabel>{t('profileForm.labels.email', 'Email')}</FormLabel>
                <FormControl>
                  <ControlledEditingInput
                    placeholder={`${t('profileForm.labels.email', 'Email')}`}
                    disabled={!isFormInEditMode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='businessPhone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('profileForm.labels.phone', 'Phone')}
                  </FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.phone', 'Phone')}`}
                      disabled={!isFormInEditMode}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='businessMobile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('profileForm.labels.mobile', 'Mobile')}
                  </FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.mobile', 'Mobile')}`}
                      disabled={!isFormInEditMode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <div className='flex items-center justify-between gap-3 overflow-hidden'>
          {isFormInEditMode && (
            <Button
              type='button'
              variant='outline'
              className='w-1/3'
              onClick={() => setIsFormInEditMode(false)}
              disabled={updateMutation.isPending}
            >
              <X size={16} className='mr-2' />
              {t('profileForm.buttons.cancel', 'Cancel')}
            </Button>
          )}
          {!isFormInEditMode && (
            <Button
              type='button'
              variant='outline'
              className='w-1/3'
              onClick={() => setIsFormInEditMode(true)}
            >
              <Edit size={16} className='mr-2' />
              {t('profileForm.buttons.edit', 'Edit')}
            </Button>
          )}
          <Button
            type='submit'
            className='flex-1'
            disabled={!isFormInEditMode || updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <>
                <Loader size={16} className='mr-2 animate-spin' />
                {t('profileForm.updating', 'Updating...')}
              </>
            ) : (
              <>
                <CheckCircle size={16} className='mr-2' />
                {t('profileForm.buttons.update', 'Update')}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default BusinessUserProfileForm
