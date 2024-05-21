import { useSubscriptionManagementStore } from '@/features/subscription-management-service/utils/useSubscription'
import { subscriptionFormSchema } from '@/models/subscriptionFormSchema'
import { RECURRENCE_INTERVALS } from '@/types/RecurringInterval'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import { useTranslation } from "react-i18next";
import { useAuthedAppUser } from '@/hooks/useUser'
import { Loader, Plus } from 'lucide-react'
import { z } from 'zod'
import { DatePicker } from '../shared/DatePicker'
import { Button } from '../ui/button'
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

const AddSubscriptionForm = () => {
  const queryClient = new QueryClient()
  const { toast } = useToast()
  // const { t } = useTranslation();
  const [isRecurringSubscription, setIsRecurringSubscription] = useState(false)
  const [isReminderSet, setIsReminderSet] = useState(false)
  const { addNewSubscription, resetModal } = useSubscriptionManagementStore()
  const { authedAppUser } = useAuthedAppUser()

  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      subscriptionName: '',
      subscriptionCategory: '',
      recurring: false,
      recurringInterval: 'monthly',
      subscribedOn: new Date(),
      expiresOn: new Date(),
      setReminder: false,
      reminderPeriod: new Date()
    }
  })

  const recurringValue = form.watch('recurring')
  const reminderValue = form.watch('setReminder')

  useEffect(() => {
    setIsRecurringSubscription(recurringValue)
    setIsReminderSet(reminderValue)
  }, [recurringValue, reminderValue])

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

  async function onSubmit(values: z.infer<typeof subscriptionFormSchema>) {
    try {
      await createMutation.mutateAsync(values)
      form.reset()
      resetModal()
      toast({
        title: 'Subscription added successfully',
        variant: 'default'
      })
    } catch (error) {
      console.error('Error adding subscription', error)
      toast({
        title: 'Error adding subscription',
        variant: 'destructive'
      })
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
                <FormLabel>Subscription Name</FormLabel>
                <FormControl>
                  <Input placeholder='Subscription Name' {...field} />
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
                <FormLabel>Subscription Category</FormLabel>
                <FormControl>
                  <Input placeholder='Subscription Category' {...field} />
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
                  <FormLabel>Subscribed on</FormLabel>
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
                  <FormLabel>Expires on</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 place-items-center space-y-3 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='recurring'
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
                    <FormLabel>Is this a recurring subscription?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {isRecurringSubscription && (
              <FormField
                control={form.control}
                name='recurringInterval'
                render={({ field }) => (
                  <FormItem className='w-full space-y-3'>
                    <FormLabel>
                      Recurring Interval (Select all that apply)
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
            )}
          </div>
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
                    <FormLabel>Set a reminder for this subscription?</FormLabel>
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
                    <FormLabel>Reminder Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
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
            <Button type='submit' disabled={createMutation.isPending}>
              {createMutation.isPending ? (
                <>
                  <Loader className='mr-2 animate-spin' />
                  Adding Subscription...
                </>
              ) : (
                <>
                  <Plus className='mr-2' />
                  Add Subscription
                </>
              )}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </ScrollArea>
  )
}

export default AddSubscriptionForm
