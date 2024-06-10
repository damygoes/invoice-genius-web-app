import { createIcon } from '@/utils/createIcon'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export type PossibleNavigations = 'next' | 'previous'

type PageNavigatorProps = {
  type: PossibleNavigations
  text: string
  url: string
}

const PageNavigator = ({ type, text, url }: PageNavigatorProps) => {
  const IconComponent = type === 'next' ? ArrowRight : ArrowLeft
  return (
    <Link to={url}>
      <Button variant='ghost'>
        {createIcon(IconComponent)}
        {text}
      </Button>
    </Link>
  )
}

export default PageNavigator
