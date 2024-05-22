// import useAxiosInterceptor from "@/services/axios/axiosClient";
import { create } from 'zustand'

type IInvoicingStore = {
  isClientForm: boolean
  isInvoiceForm: boolean
  setClientForm: (isOpen: boolean) => void
  setInvoiceForm: (isOpen: boolean) => void
}

const invoiceManagementStore = create<IInvoicingStore>(set => ({
  isClientForm: false,
  isInvoiceForm: false,
  setClientForm: isOpen => set({ isClientForm: isOpen }),
  setInvoiceForm: isOpen => set({ isInvoiceForm: isOpen })
}))

export const useInvoicing = () => {
  //   const axiosClient = useAxiosInterceptor();

  const { isClientForm, isInvoiceForm, setClientForm, setInvoiceForm } =
    invoiceManagementStore()

  return {
    isClientForm,
    isInvoiceForm,
    setClientForm,
    setInvoiceForm
  }
}
