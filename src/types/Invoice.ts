import { InvoiceTemplateTableRowItemType } from '@/features/invoicing-service/utils/useInvoiceTemplate'

export type InvoiceImage = {
  id: string
  image: string
  invoiceId: string
}

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
  invoiceNumber: string
  pdfBase64: string
  images: InvoiceImage[]
  createdAt: string
  updatedAt: string
}
