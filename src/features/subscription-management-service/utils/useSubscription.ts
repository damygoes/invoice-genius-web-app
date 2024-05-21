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
      subscription: null
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
    }))
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
    removeSubscriptionToDelete
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
    removeSubscriptionToDelete
  }
}
