import { useAuthedAppUser } from '@/hooks/useUser'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useTranslation } from 'react-i18next'
import { DropdownMenuItem } from '../ui/dropdown-menu'

const LogoutButton = () => {
  const { logout } = useKindeAuth()
  const { resetAuthedAppUser } = useAuthedAppUser()
  const { t } = useTranslation()

  const handleLogout = () => {
    resetAuthedAppUser()
    logout()
  }

  return (
    <DropdownMenuItem onClick={handleLogout}>
      {t('common.logout', 'Logout')}
    </DropdownMenuItem>
  )
}

export default LogoutButton
