import { useState } from 'react'
import { Button } from '../ui/button'

type OptionType<T> = {
  value: T
  label: string
}

type GenericSelectProps<T> = {
  options: OptionType<T>[]
  selectedOption: T | null
  onSelect: (option: T) => void
}

const GenericSelect = <T extends string | number | symbol>({
  options,
  selectedOption,
  onSelect
}: GenericSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T | null>(selectedOption)

  const handleSelect = (option: T) => {
    setSelectedValue(option)
    onSelect(option)
  }

  return (
    <div className='flex w-full items-center justify-center gap-5'>
      {options.map(option => (
        <Button
          key={option.value.toString()}
          onClick={() => handleSelect(option.value)}
          variant={selectedValue === option.value ? 'default' : 'outline'}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

export default GenericSelect
