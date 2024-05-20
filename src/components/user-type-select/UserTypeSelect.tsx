import { AvailableUserType } from '@/types/User'
import TransformToGenericSelectOptions from '@/utils/transformToGenericSelectOptions'
import { useState } from 'react'
import GenericSelect from '../generic-select/GenericSelect'

type UserTypeSelectProps = {
  selectedUserType: AvailableUserType | null
  onSelect: (optionId: AvailableUserType) => void
}

const UserTypeSelect = ({
  selectedUserType,
  onSelect
}: UserTypeSelectProps) => {
  const [selectedOption, setSelectedOption] =
    useState<AvailableUserType | null>(selectedUserType)

  const options: AvailableUserType[] = ['private', 'business']

  const userTypeSelectOptions = TransformToGenericSelectOptions(options)

  const handleSelectUserType = (optionId: AvailableUserType) => {
    setSelectedOption(optionId)
    onSelect(optionId)
  }

  return (
    <div className='flex w-full items-center justify-center gap-5'>
      <GenericSelect
        options={userTypeSelectOptions}
        selectedOption={selectedOption}
        onSelect={handleSelectUserType}
      />
    </div>
  )
}

export default UserTypeSelect
