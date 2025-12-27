/**
 * Discord-style message component
 * Displays a message with avatar, username, timestamp, and content
 *
 * Styles: src/styles/components/discord-message.css
 * Colors: src/styles/discord-colors.css
 */

import { DiscordUserCard, DiscordRole } from './DiscordUserCard'

export interface DiscordMessageProps {
  username: string
  avatarUrl: string
  timestamp: string
  content: string
  /** Optional: user card data for click-to-expand */
  userCard?: {
    bannerColor?: string
    memberSince: string
    roles?: DiscordRole[]
  }
  /** Controlled: whether card is shown */
  isCardVisible?: boolean
  /** Callback when user clicks to toggle card */
  onUserClick?: () => void
}

export function DiscordMessage({
  username,
  avatarUrl,
  timestamp,
  content,
  userCard,
  isCardVisible = false,
  onUserClick,
}: DiscordMessageProps) {
  const handleUserClick = () => {
    if (userCard && onUserClick) {
      onUserClick()
    }
  }

  return (
    <div className={`discord-review-row ${isCardVisible ? 'card-visible' : ''}`}>
      {userCard && (
        <div className={`discord-review-card-container ${isCardVisible ? 'visible' : ''}`}>
          <DiscordUserCard
            username={username}
            avatarUrl={avatarUrl}
            memberSince={userCard.memberSince}
            {...(userCard.bannerColor && { bannerColor: userCard.bannerColor })}
            {...(userCard.roles && { roles: userCard.roles })}
          />
        </div>
      )}
      <div className="discord-message">
        <div className="discord-message-main">
          <div className="discord-message-avatar" onClick={handleUserClick}>
            <img src={avatarUrl} alt={username} />
          </div>
          <div className="discord-message-body">
            <div className="discord-message-header">
              <span className="discord-message-username" onClick={handleUserClick}>
                {username}
              </span>
              <a href="#" className="discord-message-timestamp">{timestamp}</a>
            </div>
            <div className="discord-message-content">{content}</div>
          </div>
        </div>
        <hr className="discord-message-divider" />
      </div>
    </div>
  )
}
