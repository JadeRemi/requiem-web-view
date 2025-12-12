import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { SkinViewer } from '../components/SkinViewer'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { Typography, TypographyVariant } from '../components/Typography'
import { Loader } from '../components/Loader'
import { HexagonOverlay } from '../components/HexagonOverlay'
import { fetchPlayer } from '../api/client'
import { useSettingsStore } from '../stores/settingsStore'
import { ROUTES, GAME_STATS } from '../config'
import { formatShortDate, formatRelativeTime } from '../utils/dateFormat'
import { EQUIPMENT_MODELS, type EquipmentModel } from '../mock/equipment'
import type { RankedStat, PlayerDTO } from '../types/api'
import type { SkinViewerConfig } from '../types/skin'

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
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [player, setPlayer] = useState<PlayerDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null)

  // Persisted settings from store
  const playerAnimate = useSettingsStore((s) => s.playerAnimate)
  const playerRotate = useSettingsStore((s) => s.playerRotate)
  const equipmentRotate = useSettingsStore((s) => s.equipmentRotate)
  const setPlayerAnimate = useSettingsStore((s) => s.setPlayerAnimate)
  const setPlayerRotate = useSettingsStore((s) => s.setPlayerRotate)
  const setEquipmentRotate = useSettingsStore((s) => s.setEquipmentRotate)

  const uuid = searchParams.get('uuid')
  
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
          <div className="profile-card stats-card" style={{ position: 'relative' }}>
            <HexagonOverlay />
            <Typography 
              variant={TypographyVariant.H1} 
              style={{ marginBottom: 'var(--space-6)', textTransform: 'none' }}
            >
              {player.username}
            </Typography>

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
                Equipment
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

          {/* Equipment Preview Card */}
          {selectedEquipment && (
            <div className="profile-card equipment-card">
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
      </div>
    </div>
  )
}
