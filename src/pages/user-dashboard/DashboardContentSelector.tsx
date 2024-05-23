import GenericSelect from '@/components/generic-select/GenericSelect'
import { ProvidedServices } from '@/types/User'
import TransformToGenericSelectOptions from '@/utils/transformToGenericSelectOptions'

type DashboardContentSelectorProps = {
  selectedServices: ProvidedServices[]
  selected: ProvidedServices
  onSelect: (service: ProvidedServices) => void
}

const DashboardContentSelector = ({
  selectedServices,
  selected,
  onSelect
}: DashboardContentSelectorProps) => {
  const dashboardSelectionOptions =
    TransformToGenericSelectOptions(selectedServices)

  return (
    <div>
      <GenericSelect
        options={dashboardSelectionOptions}
        selectedOption={selected}
        onSelect={onSelect}
      />
    </div>
  )
}

export default DashboardContentSelector
