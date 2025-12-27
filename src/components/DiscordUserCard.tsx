/**
 * Discord-style user profile card
 * Displays user info, join date, and role tags
 *
 * Styles: src/styles/components/discord-card.css
 * Colors: src/styles/discord-colors.css
 */

export interface DiscordRole {
  name: string
  color: string
}

export interface DiscordUserCardProps {
  username: string
  avatarUrl: string
  bannerColor?: string
  memberSince: string
  roles?: DiscordRole[]
}

export function DiscordUserCard({
  username,
  avatarUrl,
  bannerColor = 'var(--discord-banner-default)',
  memberSince,
  roles = [],
}: DiscordUserCardProps) {
  return (
    <div className="discord-card">
      <div className="discord-card-header">
        <div className="discord-banner" style={{ background: bannerColor }} />
      </div>
      <div className="discord-card-body">
        <div className="discord-profile-header">
          <div className="discord-avatar">
            <img src={avatarUrl} alt={username} />
          </div>
        </div>
        <div className="discord-profile-body">
          <div className="discord-username">{username}</div>
          <hr className="discord-divider" />
          <div className="discord-info-section">
            <div className="discord-category-title">Member Since</div>
            <p className="discord-info-text">{memberSince}</p>
          </div>
          {roles.length > 0 && (
            <div className="discord-roles-section">
              <div className="discord-category-title">Roles</div>
              <div className="discord-roles-list">
                {roles.map((role, index) => (
                  <div key={index} className="discord-role">
                    <div
                      className="discord-role-color"
                      style={{ background: role.color }}
                    />
                    <span>{role.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
