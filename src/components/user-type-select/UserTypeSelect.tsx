import { AvailableUserType } from '@/types/User'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

type UserTypeSelectProps = {
  selectedUserType: AvailableUserType | null
  onSelect: (optionId: AvailableUserType) => void
}

const UserTypeSelect = ({
  selectedUserType,
  onSelect
}: UserTypeSelectProps) => {
  const { t } = useTranslation()
  const [selectedOption, setSelectedOption] =
    useState<AvailableUserType | null>(selectedUserType)

  const userTypeSelectOptions = [
    { value: 'private', label: `${t('userTypeSelect.private', 'Private')}` },
    { value: 'business', label: `${t('userTypeSelect.business', 'Business')}` }
  ]

  const handleSelectUserType = (optionId: AvailableUserType) => {
    setSelectedOption(optionId)
    onSelect(optionId)
  }

  return (
    <div className='flex w-full items-center justify-center gap-5'>
      {userTypeSelectOptions.map(type => {
        return (
          <Button
            key={type.value}
            onClick={() =>
              handleSelectUserType(type.value as AvailableUserType)
            }
            variant={selectedOption === type.value ? 'default' : 'outline'}
          >
            {type.label}
          </Button>
        )
      })}
    </div>
  )
}

export default UserTypeSelect
