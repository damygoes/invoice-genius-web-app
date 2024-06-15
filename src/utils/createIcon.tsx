import React from 'react'

export const createIcon = (
  IconComponent: React.ElementType
): React.ReactElement => {
  return <IconComponent size={18} className='mr-2' strokeWidth={1.2} />
}
