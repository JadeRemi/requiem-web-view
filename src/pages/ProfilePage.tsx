import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SkinViewer } from '../components/SkinViewer'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { Typography, TypographyVariant } from '../components/Typography'
import { usePlayerStore } from '../stores/playerStore'
import { ROUTES, GAME_STATS } from '../config'
import { useEffect } from 'react'
import { formatShortDate, formatRelativeTime } from '../utils/dateFormat'
import { EQUIPMENT_MODELS, type EquipmentModel } from '../mock/equipment'
import type { RankedStat } from '../types/api'

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
        <Typography variant={TypographyVariant.H2}>
          {stat.value}/{GAME_STATS.TOTAL_ACHIEVEMENTS}
        </Typography>
        <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
          #{stat.rank}
        </Typography>
      </div>
    </div>
  )
}

export function ProfilePage() {
  const selectedPlayer = usePlayerStore((state) => state.selectedPlayer)
  const navigate = useNavigate()
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null)
  const [equipmentRotate, setEquipmentRotate] = useState(true)

  // Redirect to ladder if no player selected
  useEffect(() => {
    if (!selectedPlayer) {
      navigate(ROUTES.LADDER)
    }
  }, [selectedPlayer, navigate])

  if (!selectedPlayer) {
    return null
  }

  const handleEquipmentClick = (equipment: EquipmentModel) => {
    if (selectedEquipment?.id === equipment.id) {
      setSelectedEquipment(null)
    } else {
      setSelectedEquipment(equipment)
      setEquipmentRotate(true) // Reset rotation when selecting new equipment
    }
  }

  return (
    <div className="page profile-page">
      <div className="profile-content">
        <div className="profile-cards">
          {/* 3D Viewer Card */}
          <div className="profile-card viewer-card">
            <SkinViewer
              skinHash={selectedPlayer.skinHash}
              config={{
                animate: true,
                autoRotate: true,
                running: false,
                showCape: true,
                freezeCameraY: true,
              }}
              width={400}
              height={500}
              compactControls
            />
          </div>

          {/* Stats Card */}
          <div className="profile-card stats-card">
            <Typography 
              variant={TypographyVariant.H1} 
              style={{ marginBottom: 'var(--space-6)', textTransform: 'none' }}
            >
              {selectedPlayer.username}
            </Typography>

            <div className="stats-grid">
              <StatDisplay label="Player Kills" stat={selectedPlayer.kills} />
              <StatDisplay label="Enemy Kills" stat={selectedPlayer.enemyKills} />
              <StatDisplay label="Deaths" stat={selectedPlayer.deaths} />
              <StatDisplay label="DPS" stat={selectedPlayer.dps} />
              <AchievementsDisplay stat={selectedPlayer.achievements} />
              <StatDisplay label="Gold" stat={selectedPlayer.gold} />
              <StatDisplay label="Experience" stat={selectedPlayer.experience} />
            </div>

            <div className="stats-dates">
              <div className="date-item">
                <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
                  Joined
                </Typography>
                <Typography variant={TypographyVariant.Body}>
                  {formatShortDate(selectedPlayer.firstJoined)}
                </Typography>
              </div>

              <div className="date-item">
                <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)">
                  Last Played
                </Typography>
                <Typography variant={TypographyVariant.Body}>
                  {formatShortDate(selectedPlayer.lastActive)} ({formatRelativeTime(selectedPlayer.lastActive)})
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
