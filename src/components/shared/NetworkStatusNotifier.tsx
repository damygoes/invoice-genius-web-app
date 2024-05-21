import useNetworkStatus from '@/hooks/useNetworkStatus'
import { cn } from '@/lib/utils'
import { Triangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const NetworkStatusNotifier = () => {
  const isOnline = useNetworkStatus()
  const [showError, setShowError] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOnline) {
      // Network is offline, show error message
      setShowError(true)
    } else {
      // Network is online, hide error message after 2 seconds
      const timeoutId = setTimeout(() => {
        setShowError(false)
      }, 2000)

      // Cleanup the timeout when the component unmounts or when network status changes
      return () => clearTimeout(timeoutId)
    }
  }, [isOnline])

  if (!isOnline && showError) {
    return (
      <div
        className={cn(
          'fixed left-1/2 top-7 flex h-8 w-fit -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-lg bg-accent/80 px-6 py-2 text-sm shadow-md'
        )}
      >
        <Triangle className='mr-2 h-4 w-4' />
        {t(
          'networkStatus.offline',
          'You are offline. Please check your internet connection.'
        )}
      </div>
    )
  }

  return null // Don't render anything if the network is online or if there's no error
}

export default NetworkStatusNotifier
