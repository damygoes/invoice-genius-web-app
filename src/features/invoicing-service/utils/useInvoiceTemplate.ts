import useAxiosInterceptor from '@/services/axios/axiosClient'
import { SavedClient } from '@/types/SavedClient'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type InvoiceTemplateSteps = 'template' | 'preview'

type InvoiceTemplateTableRowItemType = {
  serviceName: string
  serviceDescription: string
  rate: number
  hours: number
  amount: number
}

type InvoiceState = {
  isPreviewModalOpen: boolean
  setIsPreviewModalOpen: (isOpen: boolean) => void
  invoiceTemplateStep: InvoiceTemplateSteps
  setInvoiceTemplateStep: (step: InvoiceTemplateSteps) => void
  selectedClient: string | null
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
      isPreviewModalOpen: false,
      setIsPreviewModalOpen: isOpen => set({ isPreviewModalOpen: isOpen }),
      invoiceTemplateStep: 'template',
      setInvoiceTemplateStep: step => set({ invoiceTemplateStep: step }),
      selectedClient: null,
      invoiceItems: initialState,
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

  return {
    getSelectedClientDetails
  }
}
