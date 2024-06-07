import InvoiceItemSkeleton from '../invoice-item/InvoiceItemSkeleton'

const InvoiceListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <InvoiceItemSkeleton key={index} />
      ))}
    </>
  )
}

export default InvoiceListSkeleton
