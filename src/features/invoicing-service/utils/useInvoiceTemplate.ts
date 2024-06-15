import useAxiosInterceptor from '@/services/axios/axiosClient'
import { SavedClient } from '@/types/SavedClient'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type InvoiceTemplateSteps = 'template' | 'preview'

export type InvoiceTemplateTableRowItemType = {
  serviceName: string
  serviceDescription: string
  rate: number
  hours: number
  amount: number
}

export type InvoicePayload = {
  client: string
  items: InvoiceTemplateTableRowItemType[]
  invoiceSubTotal: number
  invoiceVAT: number
  invoiceTotal: number
  dueDate: Date
  invoiceNumber: string
}

type InvoiceState = {
  invoiceNumber: string
  setInvoiceNumber: (invoiceNumber: string) => void
  invoiceTemplateStep: InvoiceTemplateSteps
  setInvoiceTemplateStep: (step: InvoiceTemplateSteps) => void
  selectedClient: string | null
  invoiceDueDate: Date | null
  setInvoiceDueDate: (date: Date | null) => void
  invoiceItems: InvoiceTemplateTableRowItemType[]
  setSelectedClient: (client: string | null) => void
  addRow: () => void
  removeRow: (index: number) => void
  updateRow: (index: number, newItem: InvoiceTemplateTableRowItemType) => void
  resetInvoiceTemplateState: () => void
  getSubtotal: () => number
  getVat: () => number
  getTotal: () => number
}

const initialState: InvoiceTemplateTableRowItemType[] = [
  {
    serviceName: '',
    serviceDescription: '',
    rate: 0,
    hours: 0,
    amount: 0
  }
]

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      invoiceNumber: '',
      setInvoiceNumber: invoiceNumber => set({ invoiceNumber }),
      invoiceTemplateStep: 'template',
      setInvoiceTemplateStep: step => set({ invoiceTemplateStep: step }),
      selectedClient: null,
      invoiceItems: initialState,
      invoiceDueDate: null,
      setInvoiceDueDate: date => set({ invoiceDueDate: date }),
      setSelectedClient: client => set({ selectedClient: client }),
      addRow: () =>
        set(state => ({
          invoiceItems: [
            ...state.invoiceItems,
            {
              serviceName: '',
              serviceDescription: '',
              rate: 0,
              hours: 0,
              amount: 0
            }
          ]
        })),
      removeRow: index =>
        set(state => ({
          invoiceItems: state.invoiceItems.filter((_, i) => i !== index)
        })),
      updateRow: (index, newItem) =>
        set(state => {
          newItem.amount = newItem.rate * newItem.hours
          const newItems = state.invoiceItems.map((item, i) =>
            i === index ? newItem : item
          )
          return { invoiceItems: newItems }
        }),
      resetInvoiceTemplateState: () =>
        set({
          selectedClient: null,
          invoiceItems: initialState,
          invoiceTemplateStep: 'template'
        }),
      getSubtotal: () =>
        get().invoiceItems.reduce((acc, item) => acc + item.amount, 0),
      getVat: () => get().getSubtotal() * 0.19,
      getTotal: () => get().getSubtotal() + get().getVat()
    }),
    {
      name: 'invoice-store'
    }
  )
)

export const useInvoiceStoreActions = () => {
  const axiosClient = useAxiosInterceptor()

  const getSelectedClientDetails = async (clientId: string) => {
    const response = await axiosClient.get(`/clients/${clientId}`)
    return response.data as SavedClient
  }

  const sendInvoice = async (formData: FormData) => {
    const response = await axiosClient.post(
      '/invoices/send-invoice',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  }

  return {
    getSelectedClientDetails,
    sendInvoice
  }
}
