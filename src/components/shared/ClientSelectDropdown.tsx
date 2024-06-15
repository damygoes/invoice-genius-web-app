import SavedClientSelectItems from '@/features/invoicing-service/saved-clients/SavedClientSelectItems'
import { useSavedClient } from '@/features/invoicing-service/utils/useSavedClient'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Skeleton } from '../ui/skeleton'
import EmptyDataRenderer from './EmptyDataRenderer'

type ClientSelectDropdownProps = {
  onSelectClient: (client: string) => void
}

const ClientSelectDropdown = ({
  onSelectClient
}: ClientSelectDropdownProps) => {
  const { t } = useTranslation()
  const { getUsersSavedClients } = useSavedClient()
  const { data: fetchedSavedClients, isLoading } = useQuery({
    queryKey: ['savedClients'],
    queryFn: getUsersSavedClients,
    refetchInterval: 60 // Refetch every 60 seconds
  })

  if (isLoading) {
    return <Skeleton className='h-10 w-full' />
  }

  return (
    <Select onValueChange={onSelectClient}>
      <SelectTrigger>
        <SelectValue
          placeholder={t('clientSelectDropdown.placeholder', 'Select a client')}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fetchedSavedClients && fetchedSavedClients.length > 0 && (
            <SelectLabel className='mb-2'>
              {t('savedClients.title', 'Saved Clients')}
            </SelectLabel>
          )}
          {fetchedSavedClients?.length === 0 ? (
            <div className='mx-auto w-1/2'>
              <EmptyDataRenderer
                title={`${t('clientForm.emptyData.title', 'No Clients')}`}
                description={`${t('clientForm.emptyData.description', 'You have not saved any clients yet')}`}
              />
            </div>
          ) : (
            <SavedClientSelectItems clients={fetchedSavedClients!} />
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ClientSelectDropdown
