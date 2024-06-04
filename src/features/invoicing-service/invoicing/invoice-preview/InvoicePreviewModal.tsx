import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Printer } from 'lucide-react'
import { useRef } from 'react'
import { useInvoiceStore } from '../../utils/useInvoiceTemplate'
import InvoicePreview from './InvoicePreview'

const InvoicePreviewModal = () => {
  const { isPreviewModalOpen, setIsPreviewModalOpen } = useInvoiceStore()
  const invoiceRef = useRef(null)

  // const handleDownloadInvoice = async () => {
  //   if (invoiceRef.current) {
  //     const element = invoiceRef.current;
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const canvas = await html2canvas(element, {
  //       scale: 2,
  //     });
  //     const imgData = canvas.toDataURL("image/png");
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  //     heightLeft -= pdfHeight;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  //       heightLeft -= pdfHeight;
  //     }

  //     pdf.save("invoice.pdf");
  //   }
  // };

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
            Print Invoice
          </Button>
          {/* <Button type="button" onClick={handleDownloadInvoice}>
            Download Invoice
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InvoicePreviewModal
