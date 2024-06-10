import useAxiosInterceptor from '@/services/axios/axiosClient'
import { InvoiceItem } from '@/types/Invoice'
import { create } from 'zustand'
import { InvoicingService } from './InvoicingService'

type IInvoicingStore = {
  isClientForm: boolean
  isInvoiceForm: boolean
  setClientForm: (isOpen: boolean) => void
  setInvoiceForm: (isOpen: boolean) => void
}

export const possibleInvoiceManagementServices = [
  'Invoice',
  'Clients'
] as InvoicingService[]

const invoiceManagementStore = create<IInvoicingStore>(set => ({
  isClientForm: false,
  isInvoiceForm: false,
  setClientForm: isOpen => set({ isClientForm: isOpen }),
  setInvoiceForm: isOpen => set({ isInvoiceForm: isOpen })
}))

export const useInvoicing = () => {
  const { isClientForm, isInvoiceForm, setClientForm, setInvoiceForm } =
    invoiceManagementStore()

  return {
    isClientForm,
    isInvoiceForm,
    setClientForm,
    setInvoiceForm
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

  return {
    fetchInvoices,
    handlePrintInvoice
  }
}
