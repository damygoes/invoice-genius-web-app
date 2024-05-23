import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { DropdownMenuItem } from '../ui/dropdown-menu'

const LogoutButton = () => {
  const { logout } = useAuth()
  const { t } = useTranslation()

  const handleLogout = () => {
    logout()
  }

  return (
    <DropdownMenuItem onClick={handleLogout}>
      {t('common.logout', 'Logout')}
    </DropdownMenuItem>
  )
}

export default LogoutButton
