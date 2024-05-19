import { ReactNode } from 'react'
import { Typography } from '../ui/typography'

type OnboardingSectionProps = {
  sectionTitle: string
  component: ReactNode
}

const OnboardingSection = ({
  sectionTitle,
  component
}: OnboardingSectionProps) => {
  return (
    <section className='flex min-h-52 w-full flex-col items-center justify-center gap-6 rounded-lg bg-secondary shadow-sm lg:max-w-2xl'>
      <Typography size='xl'>{sectionTitle}</Typography>
      <div className='w-full'>{component}</div>
    </section>
  )
}

export default OnboardingSection
