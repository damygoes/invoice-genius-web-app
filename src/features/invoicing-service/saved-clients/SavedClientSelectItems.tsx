import { SelectItem } from '@/components/ui/select'
import { SavedClient } from '@/types/SavedClient'
import { GetSavedClientDetails } from '../utils/getSavedClientDetails'

const SavedClientSelectItems = ({ clients }: { clients: SavedClient[] }) => {
  if (!clients) {
    return null
  }
  return clients.map(client => {
    const clientDetails = GetSavedClientDetails(client)
    if (!clientDetails) {
      return null
    }
    const { name } = clientDetails
    return (
      <SelectItem key={client.id} value={client.id}>
        {name}
      </SelectItem>
    )
  })
}

export default SavedClientSelectItems
