import { SavedClient } from '@/types/SavedClient'

type ReturnType = {
  name: string
  address: string
}

export const GetSavedClientDetails = (
  client: SavedClient
): ReturnType | null => {
  if (!client) {
    return null
  }

  return {
    name: `${client.firstName} ${client.lastName}`,

    address: `${client.address.street} ${client.address.number}, ${client.address.zip} ${client.address.city}, ${client.address.country}`
  }
}
