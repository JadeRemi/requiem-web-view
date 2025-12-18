import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { Icon } from '../components/Icon'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/Toast'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES } from '../config'
import { MOCK_PLAYERS } from '../mock/ladder'

/** Generate random alphanumeric code */
function generateCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function LoginPage() {
  usePageTitle()
  const navigate = useNavigate()
  const { isLoggedIn, loginWithDiscord, loginWithGame } = useAuth()
  const toast = useToast()
  const [code, setCode] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.HOME)
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    setCode(generateCode())
  }, [])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(`/web ${code}`)
      toast.success('Command copied to clipboard')
    } catch {
      toast.error('Failed to copy command')
    }
  }

  const handleDiscordLogin = () => {
    // Mock Discord login - generates random Discord ID
    const mockDiscordId = crypto.randomUUID().replace(/-/g, '').slice(0, 18)
    const mockDiscordName = 'DiscordUser#' + Math.floor(Math.random() * 10000)
    loginWithDiscord(mockDiscordId, mockDiscordName)
  }

  const handleServerLogin = () => {
    // Pick random player from mock list so UUID/username match leaderboard
    const randomPlayer = MOCK_PLAYERS[Math.floor(Math.random() * MOCK_PLAYERS.length)]
    if (randomPlayer) {
      loginWithGame(randomPlayer.uuid, randomPlayer.username)
    }
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-methods">
          <button className="login-method discord" onClick={handleDiscordLogin}>
            <Icon name="discord" size={24} />
            <span className="login-method-text">Login with Discord</span>
          </button>

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="login-method server">
            <Typography variant={TypographyVariant.BodySmall} color="var(--color-text-secondary)">
              Run this command in-game to link your account:
            </Typography>
            <button className="code-box" onClick={handleCopyCode}>
              <code className="code-text">/web {code}</code>
              <Icon name="copy" size={16} className="code-copy-icon" />
            </button>
            <button className="server-login-btn" onClick={handleServerLogin}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
