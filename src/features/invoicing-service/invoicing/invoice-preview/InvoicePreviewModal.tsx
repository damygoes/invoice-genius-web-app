import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'
import InvoicePreview from './InvoicePreview'

const InvoicePreviewModal = () => {
  const { isPreviewModalOpen, setIsPreviewModalOpen } = useInvoiceStore()
  return (
    <Dialog
      open={isPreviewModalOpen}
      onOpenChange={() => setIsPreviewModalOpen(false)}
    >
      <DialogContent className='scrollbar-hide max-w-2xl overflow-x-hidden overflow-y-scroll bg-background'>
        <InvoicePreview />
        <DialogFooter>
          <Button type='button'>Download Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InvoicePreviewModal
