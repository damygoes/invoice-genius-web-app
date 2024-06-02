import { useSavedClient } from '@/features/invoicing-service/saved-clients/useSavedClient'
import { useInvoicing } from '@/features/invoicing-service/utils/useInvoicing'
import { cn } from '@/lib/utils'
import { clientFormSchema } from '@/models/clientFormSchema'
import { privateUserProfileFormSchema } from '@/models/privateUserProfileFormSchema'
import { SavedClientPayload } from '@/types/SavedClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import ControlledEditingInput from '../controlled-editing-input/ControlledEditingInput'
import LoadingButton from '../shared/LoadingButton'
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

type ClientFormProps = {
  className?: string
}

const ClientForm = ({ className }: ClientFormProps) => {
  const queryClient = new QueryClient()
  const { toast } = useToast()
  const { t } = useTranslation()
  const {
    createSavedClient,
    savedclientToEdit,
    updateSavedClient,
    resetClientStore
  } = useSavedClient()
  const { setClientForm } = useInvoicing()
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      mobile: '',
      address: {
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      }
    }
  })

  useEffect(() => {
    if (savedclientToEdit && savedclientToEdit !== null) {
      form.setValue('firstName', savedclientToEdit.firstName ?? '')
      form.setValue('lastName', savedclientToEdit.lastName ?? '')
      form.setValue('address.number', savedclientToEdit.address?.number ?? '')
      form.setValue('address.street', savedclientToEdit.address?.street ?? '')
      form.setValue('address.city', savedclientToEdit.address?.city ?? '')
      form.setValue('address.state', savedclientToEdit.address?.state ?? '')
      form.setValue('address.zip', savedclientToEdit.address?.zip ?? '')
      form.setValue('address.country', savedclientToEdit.address?.country ?? '')
      form.setValue('email', savedclientToEdit.email ?? '')
      form.setValue('phone', savedclientToEdit.phone ?? '')
      form.setValue('mobile', savedclientToEdit.mobile ?? '')
    }
  }, [form, savedclientToEdit])

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof clientFormSchema>) =>
      createSavedClient(data as SavedClientPayload),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['savedClients']
      })
    }
  })

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof clientFormSchema>) =>
      updateSavedClient(
        savedclientToEdit?.id as string,
        data as SavedClientPayload
      ),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['savedClients']
      })
    }
  })

  const handleReset = () => {
    resetClientStore()
    setClientForm(false)
  }

  async function onSubmit(
    values: z.infer<typeof privateUserProfileFormSchema>
  ) {
    if (savedclientToEdit) {
      try {
        await updateMutation.mutateAsync(values)
        form.reset()
        handleReset()
        toast({
          title: `${t('clientForm.toasts.success.update.title', 'Client updated')}`,
          variant: 'default'
        })
      } catch (error) {
        console.error('Error updating profile', error)
        form.reset()
        handleReset()
        toast({
          title: `${t('clientForm.toasts.error.update.title', 'Error updating client')}`,
          variant: 'destructive'
        })
      }
    } else {
      try {
        await createMutation.mutateAsync(values)
        form.reset()
        handleReset()
        toast({
          title: `${t('clientForm.toasts.success.add.title', 'Client added successfully')}`,
          variant: 'default'
        })
      } catch (error) {
        console.error('Error updating profile', error)
        form.reset()
        handleReset()
        toast({
          title: `${t('clientForm.toasts.error.add.title', 'Error adding client')}`,
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-2 pb-10'>
      <Typography size='lg'>{t('clientForm.title', 'Add Client')}</Typography>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'scrollbar-hide flex h-full w-full flex-col justify-start gap-4 overflow-y-auto overflow-x-hidden px-4 py-2',
            className
          )}
        >
          <ScrollArea className='min-h-[90%] flex-1'>
            <div className='grid w-full grid-cols-1 gap-x-5 lg:grid-cols-2'>
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
              name='email'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel>
                    {t('profileForm.labels.email', 'Email')}
                  </FormLabel>
                  <FormControl>
                    <ControlledEditingInput
                      placeholder={`${t('profileForm.labels.email', 'Email')}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-1'>
              <Typography className='col-span-2 font-semibold'>
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <div className='flex h-[8%] w-full shrink-0 items-center justify-center'>
            {savedclientToEdit ? (
              <LoadingButton
                isLoading={updateMutation.isPending}
                defaultText='clientForm.buttons.update'
                loadingText='clientForm.buttons.isUpdating'
              />
            ) : (
              <LoadingButton
                isLoading={createMutation.isPending}
                defaultText='clientForm.buttons.save'
                loadingText='clientForm.buttons.isCreating'
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ClientForm
