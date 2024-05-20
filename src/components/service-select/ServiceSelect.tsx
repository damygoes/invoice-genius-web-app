import { AvailableUserType, ProvidedServices } from '@/types/User'
import TransformToGenericSelectOptions from '@/utils/transformToGenericSelectOptions'
import GenericMultiSelect from '../generic-select/GenericMultiSelect'

type ServiceSelectProps = {
  userType: AvailableUserType | null
  selectedServices: Set<ProvidedServices>
  onSelect: (services: Set<ProvidedServices>) => void
}

const ServiceSelect = ({
  userType,
  selectedServices,
  onSelect
}: ServiceSelectProps) => {
  const AVAILABLE_SERVICES_FOR_PRIVATE_USERS: ProvidedServices[] = [
    'receiptManagement',
    'subscriptionManagement'
  ]
  const AVAILABLE_SERVICES_FOR_BUSINESS_USERS: ProvidedServices[] = [
    'receiptManagement',
    'subscriptionManagement',
    'invoicing'
  ]

  const availableServices =
    userType === 'private'
      ? AVAILABLE_SERVICES_FOR_PRIVATE_USERS
      : AVAILABLE_SERVICES_FOR_BUSINESS_USERS

  const selectOptions = TransformToGenericSelectOptions(availableServices)

  const handleSelect = (services: ProvidedServices[]) => {
    onSelect(new Set(services))
  }

  return (
    <div>
      <GenericMultiSelect
        options={selectOptions}
        selectedOptions={Array.from(selectedServices)}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default ServiceSelect
