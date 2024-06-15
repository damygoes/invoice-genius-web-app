import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const generatePDF = async (element: HTMLElement): Promise<Blob> => {
  const canvas = await html2canvas(element)
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF()
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  return pdf.output('blob')
}

export default generatePDF
