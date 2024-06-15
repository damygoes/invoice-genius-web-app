import {
  useInvoicing,
  useInvoicingActions
} from '@/features/invoicing-service/utils/useInvoicing'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal'
import { useToast } from '../ui/use-toast'

const DeleteInvoiceItemModal = () => {
  const queryClient = new QueryClient()

  const { toast } = useToast()
  const { t } = useTranslation()
  const { invoiceDeleteModalOpen, invoiceToDelete, resetInvoiceStore } =
    useInvoicing()
  const { deleteInvoice } = useInvoicingActions()

  const deleteMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['invoices']
      })
    }
  })

  const handleDeleteInvoiceItem = () => {
    if (!invoiceToDelete) {
      return
    }

    try {
      deleteMutation.mutateAsync(invoiceToDelete.id)
      resetInvoiceStore()
      toast({
        title: `${t('invoiceItemDeleteModal.toasts.success.title', 'Invoice deleted')}`,
        description: `${t('invoiceItemDeleteModal.toasts.success.description', 'The invoice has been successfully deleted')}`
      })
    } catch (error) {
      console.error(error)
      toast({
        title: `${t('invoiceItemDeleteModal.toasts.error.title', 'Error')}`,
        description: `${t('invoiceItemDeleteModal.toasts.error.description', 'An error occurred while deleting the invoice')}`,
        variant: 'destructive'
      })
    }
  }

  return (
    <DeleteConfirmationModal
      isOpen={invoiceDeleteModalOpen}
      onClose={() => {
        resetInvoiceStore()
      }}
      onDelete={handleDeleteInvoiceItem}
      title={t('invoiceItemDeleteModal.title', 'Delete invoice')}
      description={`${t(
        'invoiceItemDeleteModal.description',
        'Are you sure you want to delete the invoice with number {{invoiceNumber}}?',
        {
          invoiceNumber: invoiceToDelete?.invoiceNumber
        }
      )}`}
      isLoading={deleteMutation.isPending}
      loadingText={t(
        'invoiceItemDeleteModal.loadingText',
        'Deleting invoice...'
      )}
      disabled={deleteMutation.isPending}
    />
  )
}

export default DeleteInvoiceItemModal
