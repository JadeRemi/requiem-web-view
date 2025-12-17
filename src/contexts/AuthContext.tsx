import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

const AUTH_STORAGE_KEY = 'requiem_auth'

export type AuthType = 'discord' | 'game'

interface DiscordAuth {
  type: 'discord'
  discordId: string
  discordName: string
}

interface GameAuth {
  type: 'game'
  gameUuid: string
  gameName: string
}

export type AuthUser = DiscordAuth | GameAuth

interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  loginWithDiscord: (discordId: string, discordName: string) => void
  loginWithGame: (gameUuid: string, gameName: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider
 *
 * Manages user authentication state with localStorage persistence.
 * Supports two auth methods: Discord and Game (server command).
 * Currently uses mock auth - will integrate with backend later.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored) as AuthUser
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
    return null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const loginWithDiscord = useCallback((discordId: string, discordName: string) => {
    const newUser: DiscordAuth = { type: 'discord', discordId, discordName }
    setUser(newUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    window.location.reload()
  }, [])

  const loginWithGame = useCallback((gameUuid: string, gameName: string) => {
    const newUser: GameAuth = { type: 'game', gameUuid, gameName }
    setUser(newUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    window.location.reload()
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    window.location.reload()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loginWithDiscord, loginWithGame, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
