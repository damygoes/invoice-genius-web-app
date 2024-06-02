import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
// import DialogDeletionImage from "@assets/delete-image.png";
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icons } from './Icons'

type DeleteConfirmationModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  loadingText?: string
  isLoading?: boolean
  disabled?: boolean
}

const DialogDeletionImage = Icons.caution

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  title,
  description,
  cancelText,
  confirmText,
  isLoading = false,
  loadingText,
  disabled = false
}) => {
  const { t } = useTranslation()
  return (
    <Dialog modal defaultOpen={false} open={isOpen} onOpenChange={onClose}>
      <DialogContent className='space-y-5 backdrop-blur-2xl'>
        <DialogHeader className='items-center'>
          <DialogDeletionImage className='size-48' />
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className='text-pretty text-center'>
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type='button'
            variant='ghost'
            onClick={onClose}
            disabled={disabled}
          >
            {cancelText ?? t('common.cancel', 'Cancel')}
          </Button>
          <Button type='submit' onClick={onDelete} disabled={disabled}>
            {confirmText ?? t('common.delete', 'Delete')}
            {isLoading && (loadingText ?? t('common.loading', 'Deleting'))}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationModal
