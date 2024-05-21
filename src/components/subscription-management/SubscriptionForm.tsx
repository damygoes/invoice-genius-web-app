import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { validateRecurringInterval } from '@/features/subscription-management-service/utils/validRecurringInterval'
import { useAuthedAppUser } from '@/hooks/useUser'
import { subscriptionFormSchema } from '@/models/subscriptionFormSchema'
import { RECURRENCE_INTERVALS } from '@/types/RecurringInterval'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { DatePicker } from '../shared/DatePicker'
import { Checkbox } from '../ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { ScrollArea } from '../ui/scroll-area'
import { SheetFooter } from '../ui/sheet'
import { useToast } from '../ui/use-toast'
import SubscriptionFormSubmitButton from './SubscriptionFormSubmitButton'

const SubscriptionForm = () => {
  const queryClient = new QueryClient()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [isReminderSet, setIsReminderSet] = useState(false)
  const {
    addNewSubscription,
    resetModal,
    subscriptionToEdit,
    updateSubscription
  } = useSubscriptionManagementStore()
  const { authedAppUser } = useAuthedAppUser()

  const subscriptionRecurringInterval = validateRecurringInterval(
    subscriptionToEdit?.recurringInterval
  )

  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      subscriptionName: subscriptionToEdit?.subscriptionName || '',
      subscriptionCategory: subscriptionToEdit?.subscriptionCategory || '',
      recurringInterval: subscriptionRecurringInterval || 'monthly',
      subscribedOn: subscriptionToEdit?.subscribedOn
        ? new Date(subscriptionToEdit.subscribedOn)
        : new Date(),
      expiresOn: subscriptionToEdit?.expiresOn
        ? new Date(subscriptionToEdit.expiresOn)
        : new Date(),
      setReminder: subscriptionToEdit?.setReminder || false,
      reminderPeriod: subscriptionToEdit?.reminderPeriod
        ? new Date(subscriptionToEdit.reminderPeriod)
        : undefined
    }
  })

  const reminderValue = form.watch('setReminder')

  useEffect(() => {
    setIsReminderSet(reminderValue)
  }, [reminderValue])

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof subscriptionFormSchema>) =>
      addNewSubscription(data, authedAppUser?.id as string),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['user_subscriptions']
      })
    }
  })
  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof subscriptionFormSchema>) =>
      updateSubscription(
        data,
        subscriptionToEdit?.id ?? '',
        authedAppUser?.id as string
      ),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [
          'user_subscriptions',
          `user_subscriptions_${subscriptionToEdit?.id}`
        ]
      })
    }
  })

  async function onSubmit(values: z.infer<typeof subscriptionFormSchema>) {
    if (subscriptionToEdit && subscriptionToEdit !== null) {
      try {
        await updateMutation.mutateAsync(values)
        form.reset()
        resetModal()
        toast({
          title: `${t('subscriptionManagementFormToasts.success.update.title', 'Subscription updated successfully')}`
        })
      } catch (error) {
        console.error('Error updating subscription', error)
        toast({
          title: `${t('subscriptionManagementFormToasts.error.update.title', 'Error updating subscription')}`,
          variant: 'destructive'
        })
      }
    } else {
      try {
        await createMutation.mutateAsync(values)
        form.reset()
        resetModal()
        toast({
          title: `${t('subscriptionManagementFormToasts.success.add.title', 'Subscription added successfully')}`
        })
      } catch (error) {
        console.error('Error adding subscription', error)
        toast({
          title: `${t('subscriptionManagementFormToasts.error.add.title', 'Error adding subscription')}`,
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <ScrollArea className='h-full w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex h-full w-full flex-col justify-between gap-5'
        >
          <FormField
            control={form.control}
            name='subscriptionName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t(
                    'subscriptionManagementForm.subscriptionName',
                    'Subscription Name'
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'subscriptionManagementForm.subscriptionName',
                      'Subscription Name'
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='subscriptionCategory'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t(
                    'subscriptionManagementForm.subscriptionCategory',
                    'Subscription Category'
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`${t(
                      'subscriptionManagementForm.subscriptionCategory',
                      'Subscription Category'
                    )}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 place-items-center lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='subscribedOn'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel>
                    {t(
                      'subscriptionManagementForm.subscribedOn',
                      'Subscribed on'
                    )}
                  </FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='expiresOn'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel>
                    {t('subscriptionManagementForm.expiresOn', 'Expires on')}
                  </FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='recurringInterval'
            render={({ field }) => (
              <FormItem className='w-full space-y-3'>
                <FormLabel>
                  {t(
                    'subscriptionManagementForm.recurringInterval',
                    'Recurring Interval'
                  )}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    orientation='horizontal'
                    className='flex flex-col space-y-1'
                  >
                    {RECURRENCE_INTERVALS.map(item => {
                      return (
                        <FormItem
                          key={item}
                          className='flex items-center space-x-3 space-y-0'
                        >
                          <FormControl>
                            <RadioGroupItem value={item} />
                          </FormControl>
                          <FormLabel className='font-normal capitalize'>
                            {item}
                          </FormLabel>
                        </FormItem>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 place-items-center space-y-3 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='setReminder'
              render={({ field }) => (
                <FormItem className='flex w-full items-start gap-3 space-y-0 rounded-md'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='h-5 w-5'
                    />
                  </FormControl>
                  <div className='leading-none'>
                    <FormLabel>
                      {t('subscriptionManagementForm.reminder', 'Set Reminder')}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {isReminderSet && (
              <FormField
                control={form.control}
                name='reminderPeriod'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col'>
                    <FormLabel>
                      {t(
                        'subscriptionManagementForm.reminderPeriod',
                        'Reminder Period'
                      )}
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value as Date}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <SheetFooter className='mt-6'>
            <SubscriptionFormSubmitButton
              isPending={
                subscriptionToEdit && subscriptionToEdit !== null
                  ? updateMutation.isPending
                  : createMutation.isPending
              }
              isEditMode={!!subscriptionToEdit}
            />
          </SheetFooter>
        </form>
      </Form>
    </ScrollArea>
  )
}

export default SubscriptionForm
