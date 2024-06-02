import DeleteIcon from '@/components/shared/DeleteIcon'
import EditIcon from '@/components/shared/EditIcon'
import { Typography } from '@/components/ui/typography'
import { SavedClient } from '@/types/SavedClient'
import { useTranslation } from 'react-i18next'
import { GetSavedClientDetails } from '../utils/getSavedClientDetails'
import { useInvoicing } from '../utils/useInvoicing'
import { useSavedClient } from './useSavedClient'

type SavedClientItemProps = {
  savedClient: SavedClient
  index: number
}

const SavedClientItem = ({ savedClient, index }: SavedClientItemProps) => {
  const { t } = useTranslation()
  const {
    setSavedClientToEdit,
    setSavedClientToDelete,
    setSavedClientDeleteModal
  } = useSavedClient()
  const { setClientForm } = useInvoicing()
  if (!savedClient) {
    return null
  }

  const clientDetails = GetSavedClientDetails(savedClient)
  if (!clientDetails) {
    return null
  }

  const { name, address } = clientDetails

  const handleEditSavedClient = () => {
    setSavedClientToEdit(savedClient)
    setClientForm(true)
  }

  const handleDeleteSavedClient = () => {
    setSavedClientToDelete(savedClient)
    setSavedClientDeleteModal(true)
  }

  return (
    <div
      key={savedClient.id}
      className='flex w-full cursor-grab items-center justify-start gap-5 rounded-md bg-accent p-3 shadow-sm'
    >
      <Typography>{index + 1}</Typography>
      <div className='flex-1 space-y-1'>
        <Typography size='xl'>{name}</Typography>
        <Typography size='xs'>{address}</Typography>
      </div>
      <section className='z-10 flex items-center gap-4'>
        <EditIcon
          tooltipContent={`${t('savedClients.buttons.edit', 'Edit client details')}`}
          onClick={handleEditSavedClient}
        />
        <DeleteIcon
          tooltipContent={`${t('savedClients.buttons.delete', 'Delete client')}`}
          onClick={handleDeleteSavedClient}
        />
      </section>
    </div>
  )
}

export default SavedClientItem
