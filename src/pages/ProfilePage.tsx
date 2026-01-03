import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { SkinViewer } from '../components/SkinViewer'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { Typography, TypographyVariant } from '../components/Typography'
import { Loader } from '../components/Loader'
import { HexagonOverlay } from '../components/HexagonOverlay'
import { Blinker } from '../components/Blinker'
import { Tooltip } from '../components/Tooltip'
import { fetchPlayer } from '../api/client'
import { useSettingsStore } from '../stores/settingsStore'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES, GAME_STATS } from '../config'
import { formatShortDate, formatRelativeTime } from '../utils/dateFormat'
import { EQUIPMENT_MODELS, type EquipmentModel } from '../mock/equipment'
import { findPlayerGuild, findPlayerGuildMembership, getGuildRoleLabel } from '../mock/guilds'
import { getRandomClassForPlayer } from '../mock/classes'
import { getUnlockedAchievementsWithData } from '../mock/achievements'
import { isPlayerOnline } from '../mock/online-players'
import type { RankedStat, PlayerDTO } from '../types/api'
import type { SkinViewerConfig } from '../types/skin'

/** Punishment status for a player */
interface PunishmentStatus {
  jailed: { since: Date } | null
  muted: { since: Date } | null
}

/**
 * Mock function to get punishment status for a player
 * 20% chance for each punishment type
 * Re-rolls on every page refresh
 */
function getPlayerPunishmentStatus(_uuid: string): PunishmentStatus {
  const now = new Date()

  // Random duration: 1-14 days for jail, 1-48 hours for mute
  const jailDays = Math.floor(Math.random() * 14) + 1
  const muteHours = Math.floor(Math.random() * 48) + 1

  return {
    jailed: Math.random() < 0.2 ? { since: new Date(now.getTime() - jailDays * 24 * 60 * 60 * 1000) } : null,
    muted: Math.random() < 0.2 ? { since: new Date(now.getTime() - muteHours * 60 * 60 * 1000) } : null,
  }
}

/**
 * Format date with time in 24-hour format (e.g., "Dec 28, 2025, 14:30")
 */
function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/**
 * Format relative time with full words (e.g., "7 days ago", "10 hours ago")
 */
function formatRelativeTimeFull(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  } else {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`
  }
}

/**
 * Format achievement tooltip content
 * Shows "Obtained x hours/days ago" + "On [date with time]"
 */
function formatAchievementTooltip(unlockedAt: string): React.ReactNode {
  const date = new Date(unlockedAt)
  const relativeTime = formatRelativeTimeFull(date)
  const dateTime = formatDateTime(date)

  return (
    <>
      Obtained {relativeTime}
      <br />
      On {dateTime}
    </>
  )
}

/** Display a ranked stat with value and rank */
function StatDisplay({ label, stat }: { label: string; stat: RankedStat }) {
  return (
    <div className="stat-item">
      <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
        {label}
      </Typography>
      <div className="stat-value-row">
        <Typography variant={TypographyVariant.H2}>
          {stat.value.toLocaleString()}
        </Typography>
        <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
          #{stat.rank}
        </Typography>
      </div>
    </div>
  )
}

/** Display achievements as x/y format */
function AchievementsDisplay({ stat }: { stat: RankedStat }) {
  return (
    <div className="stat-item">
      <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
        Achievements
      </Typography>
      <div className="stat-value-row">
        <span className="achievement-value">
          <Typography variant={TypographyVariant.H2} as="span">
            {stat.value}
          </Typography>
          <Typography variant={TypographyVariant.H2} as="span" color="var(--color-text-tertiary)">
            /{GAME_STATS.TOTAL_ACHIEVEMENTS}
          </Typography>
        </span>
        <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
          #{stat.rank}
        </Typography>
      </div>
    </div>
  )
}

export function ProfilePage() {
  usePageTitle()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [player, setPlayer] = useState<PlayerDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null)
  const [achievementsExpanded, setAchievementsExpanded] = useState(false)
  const [visibleAchievementCount, setVisibleAchievementCount] = useState<number | null>(null)
  const achievementsRowRef = useRef<HTMLDivElement>(null)

  // Persisted settings from store
  const playerAnimate = useSettingsStore((s) => s.playerAnimate)
  const playerRotate = useSettingsStore((s) => s.playerRotate)
  const equipmentRotate = useSettingsStore((s) => s.equipmentRotate)
  const setPlayerAnimate = useSettingsStore((s) => s.setPlayerAnimate)
  const setPlayerRotate = useSettingsStore((s) => s.setPlayerRotate)
  const setEquipmentRotate = useSettingsStore((s) => s.setEquipmentRotate)

  const uuid = searchParams.get('uuid')

  // Get punishment status for the player (mocked with 20% chance each)
  const punishmentStatus = useMemo(() => {
    if (!uuid) return null
    return getPlayerPunishmentStatus(uuid)
  }, [uuid])

  // Handle skin viewer config changes
  const handleSkinViewerConfigChange = useCallback((key: keyof SkinViewerConfig, value: boolean) => {
    if (key === 'animate') {
      setPlayerAnimate(value)
    } else if (key === 'autoRotate') {
      setPlayerRotate(value)
    }
  }, [setPlayerAnimate, setPlayerRotate])

  // Fetch player data when UUID changes
  useEffect(() => {
    if (!uuid) {
      navigate(ROUTES.LADDER)
      return
    }

    setLoading(true)
    setError(null)

    fetchPlayer(uuid)
      .then((response) => {
        if (response.success) {
          setPlayer(response.data)
        } else {
          setError(response.error?.message ?? 'Failed to load player')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [uuid, navigate])

  const handleEquipmentClick = (equipment: EquipmentModel) => {
    if (selectedEquipment?.id === equipment.id) {
      setSelectedEquipment(null)
    } else {
      setSelectedEquipment(equipment)
    }
  }

  // Calculate how many achievements fit in one row
  const allAchievements = getUnlockedAchievementsWithData()
  const profileAchievementsRef = useRef<HTMLDivElement>(null)
  const [hasMeasured, setHasMeasured] = useState(false)

  useEffect(() => {
    // Don't measure while loading or if no player data
    if (loading || !player) return
    if (hasMeasured || achievementsExpanded) return

    // Wait for next frame to ensure DOM is rendered
    const timeoutId = setTimeout(() => {
      if (!achievementsRowRef.current || !profileAchievementsRef.current) return

      const container = achievementsRowRef.current
      const children = Array.from(container.children) as HTMLElement[]
      if (children.length === 0) return

      const containerWidth = profileAchievementsRef.current.offsetWidth
      let totalWidth = 0
      let count = 0
      const gap = 8 // var(--space-2)

      for (const child of children) {
        const childWidth = child.offsetWidth + (count > 0 ? gap : 0)
        // Reserve space for "+N more" button (approx 90px)
        if (totalWidth + childWidth > containerWidth - 90) break
        totalWidth += childWidth
        count++
      }

      // If all fit, show all (-1 means show all)
      if (count >= allAchievements.length) {
        setVisibleAchievementCount(-1)
      } else {
        setVisibleAchievementCount(Math.max(1, count))
      }
      setHasMeasured(true)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [loading, player, allAchievements.length, achievementsExpanded, hasMeasured])

  // Show loader while fetching
  if (loading) {
    return (
      <div className="page profile-page">
        <div className="profile-loading">
          <Loader />
          <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
            Loading player...
          </Typography>
        </div>
      </div>
    )
  }

  // Show error if player not found
  if (error || !player) {
    return (
      <div className="page profile-page">
        <div className="profile-error">
          <Typography variant={TypographyVariant.H2} color="var(--color-text-secondary)">
            {error ?? 'Player not found'}
          </Typography>
          <button className="btn-primary" onClick={() => navigate(ROUTES.LADDER)}>
            Back to Leaderboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page profile-page">
      <div className="profile-content">
        <div className="profile-cards">
          {/* 3D Viewer Card */}
          <div className="profile-card viewer-card">
            <SkinViewer
              skinHash={player.skinHash}
              config={{
                animate: playerAnimate,
                autoRotate: playerRotate,
                running: false,
                showCape: true,
                freezeCameraY: true,
              }}
              onConfigChange={handleSkinViewerConfigChange}
              width={400}
              height={500}
              compactControls
            />
          </div>

          {/* Stats Card */}
          <div className="profile-card stats-card">
            <div className="stats-card-content">
              <div className="profile-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Typography
                    variant={TypographyVariant.H1}
                    style={{ textTransform: 'none' }}
                  >
                    {player.username}
                  </Typography>
                  {isPlayerOnline(player.uuid) && <Blinker />}
                </div>
                {(() => {
                  const guild = findPlayerGuild(player.uuid)
                  const membership = findPlayerGuildMembership(player.uuid)
                  if (!guild || !membership) return null
                  return (
                    <Link to={ROUTES.GUILDS} className="profile-guild-link">
                      <span className="profile-guild-tag">[{guild.tag}]</span>
                      <span className="profile-guild-name">{guild.name}</span>
                      <span className="profile-guild-role">({getGuildRoleLabel(membership.role)})</span>
                    </Link>
                  )
                })()}
                {(() => {
                  const playerClass = getRandomClassForPlayer(player.uuid)
                  return (
                    <div className="profile-class-row">
                      <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
                        Main Class:
                      </Typography>
                      <Link
                        to={`${ROUTES.WIKI_CLASSES}#${playerClass.id}`}
                        className="profile-class-link"
                      >
                        {playerClass.name}
                      </Link>
                    </div>
                  )
                })()}
              </div>

              <div className="stats-grid">
                <StatDisplay label="Player Kills" stat={player.kills} />
                <StatDisplay label="Enemy Kills" stat={player.enemyKills} />
                <StatDisplay label="Deaths" stat={player.deaths} />
                <StatDisplay label="DPS" stat={player.dps} />
                <AchievementsDisplay stat={player.achievements} />
                <StatDisplay label="Gold" stat={player.gold} />
                <StatDisplay label="Experience" stat={player.experience} />
              </div>

              <div className="stats-dates">
                <div className="date-item">
                  <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
                    Joined
                  </Typography>
                  <Typography variant={TypographyVariant.Body}>
                    {formatShortDate(player.firstJoined)}
                  </Typography>
                </div>

                <div className="date-item">
                  <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
                    Last Played
                  </Typography>
                  <Typography variant={TypographyVariant.Body}>
                    {formatShortDate(player.lastActive)} ({formatRelativeTime(player.lastActive)})
                  </Typography>
                </div>
              </div>

              {/* Equipment Buttons */}
              <div className="equipment-buttons">
                <Typography
                  variant={TypographyVariant.Caption}
                  color="var(--color-text-secondary)"
                  style={{ marginBottom: 'var(--space-2)' }}
                >
                  Equipment showcase
                </Typography>
                <div className="equipment-grid">
                  {EQUIPMENT_MODELS.map((equipment, index) => (
                    <button
                      key={equipment.id}
                      className={`equipment-btn ${selectedEquipment?.id === equipment.id ? 'active' : ''}`}
                      onClick={() => handleEquipmentClick(equipment)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Preview Card */}
          {selectedEquipment && (
            <div className="profile-card equipment-card">
              {selectedEquipment.warped && (
                <HexagonOverlay 
                  coverageRadius={200}
                  innerCarveRadius={120}
                  padding={{ top: 12, bottom: 12, left: 0, right: 0 }}
                  noise={{ scale: 50 }}
                  holeDensity={0.45}
                  color="#ff00ff"
                  colorDark="#1a0010"
                  opacity={0.25}
                />
              )}
              <EquipmentViewer 
                model={selectedEquipment} 
                autoRotate={equipmentRotate}
                onToggleRotate={() => setEquipmentRotate(!equipmentRotate)}
              />
              <div className="equipment-title">
                <Typography 
                  variant={TypographyVariant.H2} 
                  style={{ textTransform: 'none' }}
                >
                  {selectedEquipment.name}
                </Typography>
              </div>
            </div>
          )}
        </div>

        {/* Punishment Status */}
        {punishmentStatus && (punishmentStatus.jailed || punishmentStatus.muted) && (
          <div className="profile-punishments-wrapper">
            <div className="profile-punishments">
              {punishmentStatus.jailed && (
                <span className="profile-punishment profile-punishment-jailed">
                  Jailed{' '}
                  <Tooltip content={formatDateTime(punishmentStatus.jailed.since)} position="top">
                    <span className="profile-punishment-time">
                      {formatRelativeTimeFull(punishmentStatus.jailed.since)}
                    </span>
                  </Tooltip>
                </span>
              )}
              {punishmentStatus.jailed && punishmentStatus.muted && (
                <span className="profile-punishment-separator">|</span>
              )}
              {punishmentStatus.muted && (
                <span className="profile-punishment profile-punishment-muted">
                  Muted{' '}
                  <Tooltip content={formatDateTime(punishmentStatus.muted.since)} position="top">
                    <span className="profile-punishment-time">
                      {formatRelativeTimeFull(punishmentStatus.muted.since)}
                    </span>
                  </Tooltip>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Last Achievements Section */}
        <div className="profile-achievements" ref={profileAchievementsRef}>
          <div className="profile-achievements-header">
            <Typography
              variant={TypographyVariant.Caption}
              color="var(--color-text-secondary)"
            >
              Latest Achievements
            </Typography>
            {achievementsExpanded && (
              <button
                className="profile-achievements-collapse"
                onClick={() => setAchievementsExpanded(false)}
              >
                (collapse)
              </button>
            )}
          </div>
          <div
            ref={achievementsRowRef}
            className={`profile-achievements-row ${achievementsExpanded ? 'expanded' : ''}`}
            style={!hasMeasured && !achievementsExpanded ? { visibility: 'hidden' } : undefined}
          >
            {(() => {
              // Before measuring or when expanded, show all
              // After measuring: -1 = all fit, positive number = visible count
              const showAll = achievementsExpanded || visibleAchievementCount === -1 || !hasMeasured
              const displayedAchievements = showAll
                ? allAchievements
                : allAchievements.slice(0, visibleAchievementCount ?? 1)
              const hiddenCount = allAchievements.length - displayedAchievements.length

              return (
                <>
                  {displayedAchievements.map((achievement) => (
                    <Tooltip
                      key={achievement.id}
                      content={formatAchievementTooltip(achievement.unlockedAt)}
                      position="top"
                    >
                      <Link
                        to={`${ROUTES.WIKI_ACHIEVEMENTS}#${achievement.id}`}
                        className="profile-achievement-btn"
                      >
                        <span className="profile-achievement-trophy">♔</span>
                        <span className="profile-achievement-name">{achievement.name}</span>
                      </Link>
                    </Tooltip>
                  ))}
                  {hiddenCount > 0 && !achievementsExpanded && hasMeasured && (
                    <button
                      className="profile-achievement-more"
                      onClick={() => setAchievementsExpanded(true)}
                    >
                      +{hiddenCount} more
                    </button>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
