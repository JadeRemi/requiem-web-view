import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Icon } from './Icon'
import { FacePreview } from './FacePreview'
import { Blinker } from './Blinker'
import { CoinViewer } from './CoinViewer'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES, CURRENCY } from '../config'
import { findPlayerByUuid } from '../mock/ladder'
import { isPlayerOnline } from '../mock/online-players'

/**
 * Header Component
 *
 * Fixed header with login/logout button on the right side.
 * Shows username block when logged in (with skin icon for game auth).
 * Mirrors the burger menu positioning on the left.
 * Hidden on login page when not logged in.
 */
export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoggedIn, logout } = useAuth()

  const isOnLoginPage = location.pathname === ROUTES.LOGIN
  const isOnStorePage = location.pathname === ROUTES.STORE

  // Hide login button when on login page and not logged in
  if (isOnLoginPage && !isLoggedIn) {
    return null
  }

  const handleClick = () => {
    if (isLoggedIn) {
      logout()
    } else {
      navigate(ROUTES.LOGIN)
    }
  }

  // Get display name and skin hash based on auth type
  const getDisplayName = () => {
    if (!user) return null
    if (user.type === 'discord') {
      return user.discordName
    }
    return user.gameName
  }

  // Get skin hash for game users from mock data
  const getSkinHash = () => {
    if (!user || user.type !== 'game') return undefined
    const player = findPlayerByUuid(user.gameUuid)
    return player?.skinHash
  }

  return (
    <header className="app-header">
      {isLoggedIn && user && (
        <>
          {isOnStorePage && (
            <div className="header-currency">
              <span className="header-currency-amount">{CURRENCY.MOCK_BALANCE}</span>
              <span className="header-currency-x">×</span>
              <CoinViewer size={24} />
            </div>
          )}
          <div className="header-user-info">
            {user.type === 'game' && (
              <Link to={`${ROUTES.PROFILE}?uuid=${user.gameUuid}`} className="header-user-link">
                {getSkinHash() && (
                  <FacePreview skinHash={getSkinHash()!} size={18} className="header-user-face" />
                )}
                <span className="header-user-name">{getDisplayName()}</span>
                {isPlayerOnline(user.gameUuid) && <Blinker />}
              </Link>
            )}
            {user.type === 'discord' && (
              <>
                <Icon name="discord" size={16} className="header-user-discord-icon" />
                <span className="header-user-name">{getDisplayName()}</span>
              </>
            )}
          </div>
        </>
      )}
      <button className="header-auth-btn" onClick={handleClick}>
        <Icon name={isLoggedIn ? 'logout' : 'login'} size={20} />
        <span className="header-auth-label">{isLoggedIn ? 'Logout' : 'Login'}</span>
      </button>
    </header>
  )
}
