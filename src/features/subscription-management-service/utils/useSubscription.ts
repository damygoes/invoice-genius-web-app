import useAxiosInterceptor from '@/services/axios/axiosClient'
import { SubscriptionDTO, SubscriptionPayload } from '@/types/Subscription'
import { create } from 'zustand'

type ISubscriptionStore = {
  isSubscriptionManagementModalOpen: boolean
  setSubscriptionManagementModalOpen: (isOpen: boolean) => void
  subscription: SubscriptionPayload | null
  setSubscription: (subscription: SubscriptionPayload) => void
  resetModal: () => void
  isDeleteSubscriptionModalOpen: boolean
  setDeleteSubscriptionModalOpen: (isOpen: boolean) => void
  subscriptionsToDelete: SubscriptionDTO[]
  setSubscriptionsToDelete: (subscriptions: SubscriptionDTO[]) => void
  addSubscriptionToDelete: (subscription: SubscriptionDTO) => void
  removeSubscriptionToDelete: (subscriptionId: string) => void
  subscriptionToEdit: SubscriptionDTO | null
  setSubscriptionToEdit: (subscription: SubscriptionDTO) => void
}

const subscriptionManagementStore = create<ISubscriptionStore>(set => ({
  isSubscriptionManagementModalOpen: false,
  setSubscriptionManagementModalOpen: isOpen =>
    set(state => ({ ...state, isSubscriptionManagementModalOpen: isOpen })),
  subscription: null,
  setSubscription: subscription => set(state => ({ ...state, subscription })),
  resetModal: () =>
    set(state => ({
      ...state,
      isSubscriptionManagementModalOpen: false,
      subscription: null,
      subscriptionsToDelete: [],
      subscriptionToEdit: null
    })),
  isDeleteSubscriptionModalOpen: false,
  setDeleteSubscriptionModalOpen: isOpen =>
    set(state => ({ ...state, isDeleteSubscriptionModalOpen: isOpen })),
  subscriptionsToDelete: [],
  setSubscriptionsToDelete: subscriptions =>
    set(state => ({ ...state, subscriptionsToDelete: subscriptions })),
  addSubscriptionToDelete: subscription =>
    set(state => ({
      subscriptionsToDelete: [...state.subscriptionsToDelete, subscription]
    })),
  removeSubscriptionToDelete: subscriptionId =>
    set(state => ({
      subscriptionsToDelete: state.subscriptionsToDelete.filter(
        sub => sub.id !== subscriptionId
      )
    })),
  subscriptionToEdit: null,
  setSubscriptionToEdit: subscription =>
    set(state => ({ ...state, subscriptionToEdit: subscription }))
}))

export const useSubscriptionManagementStore = () => {
  const axiosClient = useAxiosInterceptor()

  const {
    isSubscriptionManagementModalOpen,
    setSubscriptionManagementModalOpen,
    subscription,
    setSubscription,
    resetModal,
    isDeleteSubscriptionModalOpen,
    setDeleteSubscriptionModalOpen,
    subscriptionsToDelete,
    setSubscriptionsToDelete,
    addSubscriptionToDelete,
    removeSubscriptionToDelete,
    subscriptionToEdit,
    setSubscriptionToEdit
  } = subscriptionManagementStore()

  const addNewSubscription = async (
    payload: SubscriptionPayload,
    id: string
  ): Promise<SubscriptionDTO> => {
    const subscription = await axiosClient.post('subscriptions-management', {
      ...payload,
      userId: id
    })
    return subscription.data.subscription
  }

  const getUserSubscriptions = async (id: string) => {
    const subscriptions = await axiosClient.get(
      `subscriptions-management/user/${id}`,
      {
        params: {
          id
        }
      }
    )
    return subscriptions.data.subscriptions as SubscriptionDTO[]
  }

  const updateSubscription = async (
    payload: SubscriptionPayload,
    subscriptionId: string,
    userId: string
  ): Promise<SubscriptionDTO> => {
    if (!subscriptionId) throw new Error('Subscription ID is required')
    if (!userId) throw new Error('User ID is required')
    const updatedSubscription = await axiosClient.patch(
      `subscriptions-management/${subscriptionId}`,
      {
        ...payload,
        userId
      }
    )
    return updatedSubscription.data.subscription
  }

  const deleteSubscription = async (
    subscriptionIds: string[],
    userId: string
  ) => {
    if (subscriptionIds.length === 0) {
      throw new Error('No subscription IDs provided')
    }

    try {
      const deletedSubscriptions = await Promise.all(
        subscriptionIds.map(async id => {
          try {
            const response = await axiosClient.delete(
              `subscriptions-management/${id}`,
              {
                headers: {
                  'User-ID': userId
                }
              }
            )
            return response.data
          } catch (error) {
            console.error(`Failed to delete subscription with ID: ${id}`, error)
            throw new Error(`Failed to delete subscription with ID: ${id}`)
          }
        })
      )

      return deletedSubscriptions
    } catch (error) {
      console.error('One or more deletions failed', error)
      throw new Error('One or more deletions failed')
    }
  }

  return {
    isSubscriptionManagementModalOpen,
    setSubscriptionManagementModalOpen,
    subscription,
    setSubscription,
    resetModal,
    addNewSubscription,
    getUserSubscriptions,
    isDeleteSubscriptionModalOpen,
    setDeleteSubscriptionModalOpen,
    subscriptionsToDelete,
    setSubscriptionsToDelete,
    addSubscriptionToDelete,
    removeSubscriptionToDelete,
    subscriptionToEdit,
    setSubscriptionToEdit,
    updateSubscription,
    deleteSubscription
  }
}
