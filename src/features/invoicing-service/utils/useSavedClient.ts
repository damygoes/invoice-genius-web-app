import useAxiosInterceptor from '@/services/axios/axiosClient'
import {
  SavedClient,
  SavedClientPayload,
  SavedClients
} from '@/types/SavedClient'

import { create } from 'zustand'

type IClientStore = {
  savedclientToEdit: SavedClient | null
  setSavedClientToEdit: (client: SavedClient) => void
  resetClientStore: () => void
  savedClientToDelete: SavedClient | null
  setSavedClientToDelete: (client: SavedClient) => void
  savedClientDeleteModal: boolean
  setSavedClientDeleteModal: (value: boolean) => void
}

const useSavedClientStore = create<IClientStore>(set => ({
  savedclientToEdit: null,
  setSavedClientToEdit: client => set({ savedclientToEdit: client }),
  savedClientToDelete: null,
  setSavedClientToDelete: client => set({ savedClientToDelete: client }),
  savedClientDeleteModal: false,
  setSavedClientDeleteModal: value => set({ savedClientDeleteModal: value }),
  resetClientStore: () =>
    set({
      savedclientToEdit: null,
      savedClientToDelete: null,
      savedClientDeleteModal: false
    })
}))

export const useSavedClient = () => {
  const axiosClient = useAxiosInterceptor()

  const {
    savedclientToEdit,
    setSavedClientToEdit,
    resetClientStore,
    savedClientDeleteModal,
    setSavedClientDeleteModal,
    savedClientToDelete,
    setSavedClientToDelete
  } = useSavedClientStore()

  const createSavedClient = async (
    data: SavedClientPayload
  ): Promise<SavedClient> => {
    const client = await axiosClient.post('clients', data)
    return client.data
  }

  const updateSavedClient = async (
    id: string,
    data: SavedClientPayload
  ): Promise<SavedClient> => {
    const client = await axiosClient.patch(`clients/${id}`, data)
    return client.data
  }

  const getUsersSavedClients = async () => {
    try {
      const response = await axiosClient.get('clients')
      return response.data as SavedClients
    } catch (error) {
      console.error('Failed to fetch saved clients:', error)
      throw error
    }
  }

  const deleteSavedClient = async (id: string) => {
    try {
      const response = await axiosClient.delete(`clients/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to delete saved client:', error)
      throw error
    }
  }

  return {
    savedclientToEdit,
    setSavedClientToEdit,
    resetClientStore,
    createSavedClient,
    updateSavedClient,
    getUsersSavedClients,
    deleteSavedClient,
    savedClientDeleteModal,
    setSavedClientDeleteModal,
    savedClientToDelete,
    setSavedClientToDelete
  }
}
