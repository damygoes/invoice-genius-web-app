import { Badge, badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { InvoiceStatus } from '@/types/Invoice'
import { GetInvoiceStatusBadge } from '../utils/getInvoiceStatusBadge'

type InvoiceItemStatusBadgeProps = {
  status: InvoiceStatus
}

const InvoiceItemStatusBadge = ({ status }: InvoiceItemStatusBadgeProps) => {
  const { variant, color, text } = GetInvoiceStatusBadge(status)

  // Use inline styles for custom colors
  const customStyle = color.startsWith('#') ? { backgroundColor: color } : {}

  return (
    <Badge
      //   variant={variant}
      className={cn(badgeVariants({ variant }), `bg-${color}`)}
      style={customStyle}
    >
      {text}
    </Badge>
  )
}

export default InvoiceItemStatusBadge
