import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Printer } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'
import InvoicePreview from './InvoicePreview'

const InvoicePreviewModal = () => {
  const { isPreviewModalOpen, setIsPreviewModalOpen } = useInvoiceStore()
  const { t } = useTranslation()
  const invoiceRef = useRef(null)

  const handlePrintInvoice = () => {
    if (invoiceRef.current) {
      const printContents = (invoiceRef.current as HTMLDivElement).innerHTML
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload() // Reload the window to restore the original contents
    }
  }

  return (
    <Dialog
      open={isPreviewModalOpen}
      onOpenChange={() => setIsPreviewModalOpen(false)}
    >
      <DialogContent className='scrollbar-hide max-w-2xl overflow-x-hidden overflow-y-scroll bg-background'>
        <div ref={invoiceRef}>
          <InvoicePreview />
        </div>
        <DialogFooter>
          <Button type='button' onClick={handlePrintInvoice}>
            <Printer size={16} className='mr-2' />
            {t('invoiceTemplate.buttons.printInvoice', 'Print Invoice')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InvoicePreviewModal
