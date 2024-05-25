import { useAvatar } from '@/hooks/useAvatar'
import { useUser } from '@/hooks/useUser'
import { cn } from '@/lib/utils'
import { privateUserProfileFormSchema } from '@/models/privateUserProfileFormSchema'
import { PrivateUserProfile } from '@/types/PrivateUserProfile'
import { convertBase64StringToUrl } from '@/utils/convertBase64StringToUrl'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import ControlledEditingInput from '../controlled-editing-input/ControlledEditingInput'
import AvatarUploader from '../shared/AvatarUploader'
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
import ProfileFormButtons from './ProfileFormButtons'

type BusinessUserProfileFormProps = {
  profile: PrivateUserProfile | null
  userId: string
  className?: string
}

const PrivateUserForm = ({
  profile,
  userId,
  className
}: BusinessUserProfileFormProps) => {
  const queryClient = new QueryClient()
  const { toast } = useToast()
  const { t } = useTranslation()
  const { updateUserProfile } = useUser()
  const { fetchAvatar, setUploadedImageUrl } = useAvatar()
  const [isFormInEditMode, setIsFormInEditMode] = useState(false)
  const form = useForm<z.infer<typeof privateUserProfileFormSchema>>({
    resolver: zodResolver(privateUserProfileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: {
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      email: '',
      phone: '',
      mobile: '',
      username: ''
    }
  })

  useEffect(() => {
    if (profile) {
      form.setValue('firstName', profile.firstName ?? '')
      form.setValue('lastName', profile.lastName ?? '')
      form.setValue('address.number', profile.address?.number ?? '')
      form.setValue('address.street', profile.address?.street ?? '')
      form.setValue('address.city', profile.address?.city ?? '')
      form.setValue('address.state', profile.address?.state ?? '')
      form.setValue('address.zip', profile.address?.zip ?? '')
      form.setValue('address.country', profile.address?.country ?? '')
      form.setValue('email', profile.email ?? '')
      form.setValue('phone', profile.phone ?? '')
      form.setValue('mobile', profile.mobile ?? '')
      form.setValue('username', profile.username ?? '')
    }
  }, [form, profile])

  const { data: UserAvatar, isLoading: isAvatarLoading } = useQuery({
    queryKey: ['userAvatar'],
    queryFn: () => fetchAvatar(userId),
    enabled: !!profile
  })

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof privateUserProfileFormSchema>) =>
      updateUserProfile(userId, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['userProfile', `userProfile_${userId}`]
      })
      window.location.reload()
    }
  })

  async function onSubmit(
    values: z.infer<typeof privateUserProfileFormSchema>
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

  useEffect(() => {
    if (UserAvatar) {
      const decodedJPEGUrl = convertBase64StringToUrl(
        UserAvatar.avatarBase64,
        'jpeg'
      )
      setUploadedImageUrl(decodedJPEGUrl)
    } else {
      setUploadedImageUrl('')
    }
  }, [UserAvatar, setUploadedImageUrl])

  return (
    <Form {...form}>
      <div className='flex max-h-16 items-center justify-between gap-4'>
        <Typography size='2xl'>
          {t('profileForm.title.private', 'Profile')}
        </Typography>
        <AvatarUploader
          containerClassName='size-14'
          isLoading={isAvatarLoading}
        />
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'scrollbar-hide flex h-full flex-col justify-start gap-12 overflow-y-auto overflow-x-hidden p-2',
          className
        )}
      >
        <ScrollArea className=' min-h-[75%]'>
          <div className='my-2 grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('profileForm.labels.firstName', 'First Name')}
                  </FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.firstName', 'First Name')}`}
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
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('profileForm.labels.lastName', 'Last Name')}
                  </FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.lastName', 'Last Name')}`}
                      disabled={!isFormInEditMode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='my-2 grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='mb-5 mt-2'>
                  <FormLabel>
                    {t('profileForm.labels.username', 'Username')}
                  </FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.username', 'Username')}`}
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
              name='email'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel>
                    {t('profileForm.labels.email', 'Email')}
                  </FormLabel>
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
          </div>
          <div className='grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-2'>
            <Typography className='col-span-2 mb-2 font-semibold'>
              {t('profileForm.title.privateAddress', ' Address')}
            </Typography>
            <FormField
              control={form.control}
              name='address.street'
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
                name='address.state'
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
                name='address.country'
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
                name='address.number'
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
                name='address.zip'
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
                name='address.city'
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
          <div className='grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='phone'
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
              name='mobile'
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
        <ProfileFormButtons
          isFormInEditMode={isFormInEditMode}
          setIsFormInEditMode={setIsFormInEditMode}
          updateMutation={updateMutation}
        />
      </form>
    </Form>
  )
}

export default PrivateUserForm
