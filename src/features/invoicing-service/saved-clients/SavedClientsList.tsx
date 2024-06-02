import SaveClientButton from '@/components/saved-clients/SaveClientButton'
import DeleteConfirmationModal from '@/components/shared/DeleteConfirmationModal'
import EmptyDataRenderer from '@/components/shared/EmptyDataRenderer'
import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { SavedClients } from '@/types/SavedClient'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SavedClientItem from './SavedClientItem'
import { useSavedClient } from './useSavedClient'

const SavedClientsList = () => {
  const queryClient = new QueryClient()
  const { t } = useTranslation()
  const { toast } = useToast()
  const {
    getUsersSavedClients,
    savedClientDeleteModal,
    resetClientStore,
    savedClientToDelete,
    deleteSavedClient
  } = useSavedClient()
  const { data: fetchedSavedClients, isLoading } = useQuery({
    queryKey: ['savedClients'],
    queryFn: getUsersSavedClients,
    refetchInterval: 60 // Refetch every 60 seconds
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteSavedClient(savedClientToDelete?.id as string),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['savedClients']
      })
    }
  })

  const [savedClients, setSavedClients] = useState<SavedClients>([])

  useEffect(() => {
    if (fetchedSavedClients) {
      setSavedClients(fetchedSavedClients)
    }
  }, [fetchedSavedClients])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!fetchedSavedClients) {
    return null
  }

  const handleDeleteSavedClient = async () => {
    try {
      await deleteMutation.mutateAsync()
      resetClientStore()
      toast({
        title: `${t('clientForm.deleteModal.toasts.success.title', 'Client deleted')}`,
        description: `${t('clientForm.deleteModal.toasts.success.description', 'The client has been deleted successfully')}`
      })
    } catch (error) {
      console.error(error)
      resetClientStore()
      toast({
        title: `${t('clientForm.deleteModal.toasts.error.title', 'Error')}`,
        description: `${t('clientForm.deleteModal.toasts.error.description', 'An error occurred while deleting the client')}`,
        variant: 'destructive'
      })
    }
  }

  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full items-center justify-between'>
        <Heading>{t('savedClients.title', 'Saved Clients')}</Heading>
        <SaveClientButton />
      </div>
      {savedClients.length === 0 ? (
        <EmptyDataRenderer
          title={`${t('clientForm.emptyData.title', 'No Clients')}`}
          description={`${t('clientForm.emptyData.description', 'You have not saved any clients yet')}`}
          className='border-none shadow-none'
        />
      ) : (
        <ScrollArea className='flex h-full w-full flex-col items-start justify-between gap-5 rounded-lg'>
          <Reorder.Group
            axis='y'
            values={savedClients}
            onReorder={setSavedClients}
            className='flex w-full flex-col gap-2'
          >
            <AnimatePresence>
              {savedClients.map((savedClient, index) => {
                return (
                  <Reorder.Item key={savedClient.id} value={savedClient}>
                    <SavedClientItem
                      key={savedClient.id}
                      savedClient={savedClient}
                      index={index}
                    />
                  </Reorder.Item>
                )
              })}
            </AnimatePresence>
          </Reorder.Group>
        </ScrollArea>
      )}

      {savedClientDeleteModal && (
        <DeleteConfirmationModal
          isOpen={savedClientDeleteModal}
          onClose={resetClientStore}
          onDelete={handleDeleteSavedClient}
          title={t('clientForm.deleteModal.title', 'Delete Client')}
          description={`${t('clientForm.deleteModal.description', 'Are you sure you want to delete the following client(s)?')} ${savedClientToDelete?.firstName} ${savedClientToDelete?.lastName}`}
          isLoading={deleteMutation.isPending}
          disabled={deleteMutation.isPending}
          loadingText={t('clientForm.deleteModal.loadingText', 'Deleting...')}
        />
      )}
    </section>
  )
}

export default SavedClientsList
