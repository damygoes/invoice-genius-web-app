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
  const fetchInvoices = async () => {
    const response = await axiosClient.get('/invoices')
    return response.data as InvoiceItem[]
  }

  return {
    fetchInvoices
  }
}
