import { Receipt } from 'lucide-react'

export const renderIcon = (icon: typeof Receipt) => {
  if (!icon) return null
  const IconComponent = icon
  return <IconComponent strokeWidth={1.2} color='currentColor' size={24} />
}
