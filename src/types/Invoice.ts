import { InvoiceTemplateTableRowItemType } from '@/features/invoicing-service/utils/useInvoiceTemplate'

export type InvoiceStatus =
  | 'pending'
  | 'paid'
  | 'draft'
  | 'overdue'
  | 'declined'

export type InvoiceItem = {
  id: string
  clientId: string
  invoiceDate: string
  dueDate: string
  amount: number
  vat: number
  subTotal: number
  status: InvoiceStatus
  invoiceItems: InvoiceTemplateTableRowItemType[]
  createdAt: string
  updatedAt: string
}
