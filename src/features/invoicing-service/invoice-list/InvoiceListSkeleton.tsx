import InvoiceItemSkeleton from '../invoice-item/InvoiceItemSkeleton'

const InvoiceListSkeleton = () => {
  return (
    <div className='scrollbar-hide h-full w-full space-y-3 overflow-hidden'>
      {Array.from({ length: 5 }).map((_, index) => (
        <InvoiceItemSkeleton key={index} />
      ))}
    </div>
  )
}

export default InvoiceListSkeleton
