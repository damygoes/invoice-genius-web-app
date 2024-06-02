import { cn } from '@/lib/utils'
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
  className?: string
}

const GenericSelect = <T extends string | number | symbol>({
  options,
  selectedOption,
  onSelect,
  className
}: GenericSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T | null>(selectedOption)

  const handleSelect = (option: T) => {
    setSelectedValue(option)
    onSelect(option)
  }

  return (
    <div
      className={cn('flex w-full items-center justify-center gap-5', className)}
    >
      {options.map(option => (
        <Button
          type='button'
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
