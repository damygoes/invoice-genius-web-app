import { useState } from 'react'
import { Button } from '../ui/button'

type OptionType<T> = {
  value: T
  label: string
}

type GenericMultiSelectProps<T> = {
  options: OptionType<T>[]
  selectedOptions: T[]
  onSelect: (options: T[]) => void
}

const GenericMultiSelect = <T extends string | number | symbol>({
  options,
  selectedOptions,
  onSelect
}: GenericMultiSelectProps<T>) => {
  const [selectedValues, setSelectedValues] = useState<T[]>(selectedOptions)

  const handleSelect = (option: T) => {
    let updatedValues: T[]
    if (selectedValues.includes(option)) {
      updatedValues = selectedValues.filter(value => value !== option)
    } else {
      updatedValues = [...selectedValues, option]
    }
    setSelectedValues(updatedValues)
    onSelect(updatedValues)
  }

  return (
    <div className='flex w-full items-center justify-center gap-5'>
      {options.map(option => (
        <Button
          type='button'
          key={option.value.toString()}
          onClick={() => handleSelect(option.value)}
          variant={
            selectedValues.includes(option.value) ? 'default' : 'outline'
          }
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

export default GenericMultiSelect
