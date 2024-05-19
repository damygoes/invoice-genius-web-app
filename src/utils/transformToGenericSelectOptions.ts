import { useTranslation } from 'react-i18next'

const TransformToGenericSelectOptions = <T>(
  options: T[]
): { value: T; label: string }[] => {
  const { t } = useTranslation()
  if (!options) {
    return []
  }

  const tranformedOptions = options.map(option => ({
    value: option,
    label: `${t(`${option}`, `${option}`)}`
  }))

  return tranformedOptions
}

export default TransformToGenericSelectOptions
