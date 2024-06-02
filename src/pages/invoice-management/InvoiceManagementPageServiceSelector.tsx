import GenericSelect from '@/components/generic-select/GenericSelect'
import { InvoicingService } from '@/features/invoicing-service/utils/InvoicingService'
import TransformToGenericSelectOptions from '@/utils/transformToGenericSelectOptions'

type InvoiceManagementPageServiceSelectorProps = {
  selectedInvoiceManagementServices: InvoicingService[]
  selected: InvoicingService
  onSelect: (service: InvoicingService) => void
}

const InvoiceManagementPageServiceSelector = ({
  selectedInvoiceManagementServices,
  selected,
  onSelect
}: InvoiceManagementPageServiceSelectorProps) => {
  const invoiceManagementPageSelectOptions = TransformToGenericSelectOptions(
    selectedInvoiceManagementServices
  )

  return (
    <div>
      <GenericSelect
        options={invoiceManagementPageSelectOptions}
        selectedOption={selected}
        onSelect={onSelect}
      />
    </div>
  )
}

export default InvoiceManagementPageServiceSelector
