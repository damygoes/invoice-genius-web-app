import { AvailableUserType, ProvidedServices } from '@/types/User'
import { useTranslation } from 'react-i18next'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

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
  const { t } = useTranslation()
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

  const toggleService = (service: ProvidedServices) => {
    const updatedServices = new Set(selectedServices)
    if (selectedServices.has(service)) {
      updatedServices.delete(service)
    } else {
      updatedServices.add(service)
    }
    onSelect(updatedServices)
  }

  return (
    <ToggleGroup
      type='multiple'
      className='flex w-full items-center justify-center gap-5'
    >
      {availableServices.map(service => {
        return (
          <ToggleGroupItem
            key={service}
            value={service}
            onClick={() => toggleService(service)}
            variant={selectedServices.has(service) ? 'default' : 'outline'}
          >
            {t(`serviceSelect.${service}`)}
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}

export default ServiceSelect
