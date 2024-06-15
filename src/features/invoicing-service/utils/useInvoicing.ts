import useAxiosInterceptor from '@/services/axios/axiosClient'
import { InvoiceItem } from '@/types/Invoice'
import { create } from 'zustand'
import { InvoicingService } from './InvoicingService'

type IInvoicingStore = {
  isClientForm: boolean
  isInvoiceForm: boolean
  setClientForm: (isOpen: boolean) => void
  setInvoiceForm: (isOpen: boolean) => void
  invoiceToDelete: InvoiceItem | null
  setInvoiceToDelete: (invoice: InvoiceItem | null) => void
  invoiceDeleteModalOpen: boolean
  setInvoiceDeleteModalOpen: (isOpen: boolean) => void
  resetInvoiceStore: () => void
}

export const possibleInvoiceManagementServices = [
  'Invoice',
  'Clients'
] as InvoicingService[]

const invoiceManagementStore = create<IInvoicingStore>(set => ({
  isClientForm: false,
  isInvoiceForm: false,
  setClientForm: isOpen => set({ isClientForm: isOpen }),
  setInvoiceForm: isOpen => set({ isInvoiceForm: isOpen }),
  invoiceToDelete: null,
  setInvoiceToDelete: invoice => set({ invoiceToDelete: invoice }),
  invoiceDeleteModalOpen: false,
  setInvoiceDeleteModalOpen: isOpen => set({ invoiceDeleteModalOpen: isOpen }),
  resetInvoiceStore: () => {
    set({ isClientForm: false, isInvoiceForm: false })
    set({ invoiceToDelete: null, invoiceDeleteModalOpen: false })
  }
}))

export const useInvoicing = () => {
  const {
    isClientForm,
    isInvoiceForm,
    setClientForm,
    setInvoiceForm,
    invoiceToDelete,
    setInvoiceToDelete,
    invoiceDeleteModalOpen,
    setInvoiceDeleteModalOpen,
    resetInvoiceStore
  } = invoiceManagementStore()

  return {
    isClientForm,
    isInvoiceForm,
    setClientForm,
    setInvoiceForm,
    invoiceToDelete,
    setInvoiceToDelete,
    invoiceDeleteModalOpen,
    setInvoiceDeleteModalOpen,
    resetInvoiceStore
  }
}

export const useInvoicingActions = () => {
  const axiosClient = useAxiosInterceptor()

  const handlePrintInvoice = (invoiceRef: React.RefObject<HTMLDivElement>) => {
    if (invoiceRef.current) {
      const printContents = (invoiceRef.current as HTMLDivElement).innerHTML
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload() // Reload the window to restore the original contents
    }
  }

  const fetchInvoices = async () => {
    const response = await axiosClient.get('/invoices')
    return response.data as InvoiceItem[]
  }

  const deleteInvoice = async (invoiceId: string) => {
    const response = await axiosClient.delete(`/invoices/${invoiceId}`)
    return response.data
  }

  return {
    fetchInvoices,
    handlePrintInvoice,
    deleteInvoice
  }
}
