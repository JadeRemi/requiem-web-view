import { Typography, TypographyVariant } from '../components/Typography'
import { Icon } from '../components/Icon'
import { Tooltip } from '../components/Tooltip'
import { useSettingsStore } from '../stores/settingsStore'
import { useAuth } from '../contexts/AuthContext'

/**
 * Settings Page
 *
 * User preferences including:
 * - Custom cursor toggle
 * - 3D viewer animation/rotation controls
 * - Connected accounts status (readonly)
 */
export function SettingsPage() {
  const {
    customCursor,
    setCustomCursor,
    playerAnimate,
    setPlayerAnimate,
    playerRotate,
    setPlayerRotate,
    equipmentRotate,
    setEquipmentRotate,
    enemyRotate,
    setEnemyRotate,
  } = useSettingsStore()

  const { user } = useAuth()

  // Determine connected accounts
  const isDiscordConnected = user?.type === 'discord'
  const isGameConnected = user?.type === 'game'

  return (
    <div className="settings-page">
      <div className="settings-content">
        {/* Appearance Section */}
        <section className="settings-section">
          <Typography variant={TypographyVariant.H3} className="settings-section-title">
            Appearance
          </Typography>

          <div className="settings-option">
            <div className="settings-option-info">
              <Typography variant={TypographyVariant.Label} className="settings-option-label">
                Custom Cursor
              </Typography>
              <Typography variant={TypographyVariant.BodySmall} color="var(--grey-500)" className="settings-option-description">
                Use a game-style cursor instead of the default
              </Typography>
            </div>
            <Tooltip content={`Currently: ${customCursor ? 'On' : 'Off'}`} position="top">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={customCursor}
                  onChange={(e) => setCustomCursor(e.target.checked)}
                />
                <span className="settings-toggle-slider" />
              </label>
            </Tooltip>
          </div>
        </section>

        {/* 3D Viewer Section */}
        <section className="settings-section">
          <Typography variant={TypographyVariant.H3} className="settings-section-title">
            3D Viewer
          </Typography>

          <div className="settings-option">
            <div className="settings-option-info">
              <Typography variant={TypographyVariant.Label} className="settings-option-label">
                Player Animation
              </Typography>
              <Typography variant={TypographyVariant.BodySmall} color="var(--grey-500)" className="settings-option-description">
                Enable idle breathing animation for player models
              </Typography>
            </div>
            <Tooltip content={`Currently: ${playerAnimate ? 'On' : 'Off'}`} position="top">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={playerAnimate}
                  onChange={(e) => setPlayerAnimate(e.target.checked)}
                />
                <span className="settings-toggle-slider" />
              </label>
            </Tooltip>
          </div>

          <div className="settings-option">
            <div className="settings-option-info">
              <Typography variant={TypographyVariant.Label} className="settings-option-label">
                Player Auto-Rotate
              </Typography>
              <Typography variant={TypographyVariant.BodySmall} color="var(--grey-500)" className="settings-option-description">
                Automatically rotate player models
              </Typography>
            </div>
            <Tooltip content={`Currently: ${playerRotate ? 'On' : 'Off'}`} position="top">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={playerRotate}
                  onChange={(e) => setPlayerRotate(e.target.checked)}
                />
                <span className="settings-toggle-slider" />
              </label>
            </Tooltip>
          </div>

          <div className="settings-option">
            <div className="settings-option-info">
              <Typography variant={TypographyVariant.Label} className="settings-option-label">
                Equipment Auto-Rotate
              </Typography>
              <Typography variant={TypographyVariant.BodySmall} color="var(--grey-500)" className="settings-option-description">
                Automatically rotate equipment item models
              </Typography>
            </div>
            <Tooltip content={`Currently: ${equipmentRotate ? 'On' : 'Off'}`} position="top">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={equipmentRotate}
                  onChange={(e) => setEquipmentRotate(e.target.checked)}
                />
                <span className="settings-toggle-slider" />
              </label>
            </Tooltip>
          </div>

          <div className="settings-option">
            <div className="settings-option-info">
              <Typography variant={TypographyVariant.Label} className="settings-option-label">
                Enemy Auto-Rotate
              </Typography>
              <Typography variant={TypographyVariant.BodySmall} color="var(--grey-500)" className="settings-option-description">
                Automatically rotate enemy models in wiki
              </Typography>
            </div>
            <Tooltip content={`Currently: ${enemyRotate ? 'On' : 'Off'}`} position="top">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={enemyRotate}
                  onChange={(e) => setEnemyRotate(e.target.checked)}
                />
                <span className="settings-toggle-slider" />
              </label>
            </Tooltip>
          </div>
        </section>

        {/* Connected Accounts Section */}
        <section className="settings-section">
          <Typography variant={TypographyVariant.H3} className="settings-section-title">
            Connected Accounts
          </Typography>

          <div className="settings-account">
            <div className="settings-account-info">
              <Icon name="discord" size={20} className="settings-account-icon" />
              <Typography variant={TypographyVariant.Body}>
                Discord
              </Typography>
            </div>
            <div className={`settings-account-status ${isDiscordConnected ? 'connected' : 'disconnected'}`}>
              <Icon name={isDiscordConnected ? 'check' : 'close'} size={16} />
              <Typography variant={TypographyVariant.Caption}>
                {isDiscordConnected ? 'Connected' : 'Not connected'}
              </Typography>
            </div>
          </div>

          <div className="settings-account">
            <div className="settings-account-info">
              <Icon name="terminal" size={20} className="settings-account-icon" />
              <Typography variant={TypographyVariant.Body}>
                Game Account
              </Typography>
            </div>
            <div className={`settings-account-status ${isGameConnected ? 'connected' : 'disconnected'}`}>
              <Icon name={isGameConnected ? 'check' : 'close'} size={16} />
              <Typography variant={TypographyVariant.Caption}>
                {isGameConnected ? 'Connected' : 'Not connected'}
              </Typography>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
