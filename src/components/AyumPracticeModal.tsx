import { useEffect, useState, useRef } from 'react'
import { Typography, TypographyVariant } from './Typography'
import { AspectColor, AYUM_ABILITIES } from '../mock/ayumAbilities'
import '../styles/components/ayum-practice.css'

interface AspectInfo {
  name: string
  color: AspectColor
  key: string
}

const ASPECTS: AspectInfo[] = [
  { name: 'Ardor', color: 'red', key: '1' },
  { name: 'Yearn', color: 'green', key: '2' },
  { name: 'Urge', color: 'yellow', key: '3' },
  { name: 'Menace', color: 'blue', key: '4' },
]

interface AyumPracticeModalContentProps {
  onClose: () => void
}

interface HistoricalAbility {
  name: string
  timestamp: number
  count: number
}

export function AyumPracticeModalContent({ onClose }: AyumPracticeModalContentProps) {
  const [combination, setCombination] = useState<AspectColor[]>([])
  const [confirmedCombination, setConfirmedCombination] = useState<string | null>(null)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoricalAbility[]>([])
  const [castSuccess, setCastSuccess] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup timeout on unmount only
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close modal on Escape
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Handle aspect selection (1, 2, 3, 4)
      if (['1', '2', '3', '4'].includes(e.key)) {
        const aspect = ASPECTS.find(a => a.key === e.key)
        if (aspect) {
          setActiveKey(e.key)
          setCombination(prev => {
            const newCombination = [...prev, aspect.color]
            // Keep only last 4 aspects
            if (newCombination.length > 4) {
              return newCombination.slice(-4)
            }
            return newCombination
          })
        }
      }

      // Handle combination confirmation (Q)
      if (e.key === 'q' || e.key === 'Q') {
        if (combination.length === 4) {
          // Find matching ability (order-agnostic, match by color counts)
          const countColors = (colors: AspectColor[]) => {
            return colors.reduce((acc, color) => {
              acc[color] = (acc[color] || 0) + 1
              return acc
            }, {} as Record<AspectColor, number>)
          }

          const userCounts = countColors(combination)
          const matchingAbility = AYUM_ABILITIES.find(ability => {
            const abilityCounts = countColors(ability.aspects)
            return (
              userCounts.green === abilityCounts.green &&
              userCounts.yellow === abilityCounts.yellow &&
              userCounts.red === abilityCounts.red &&
              userCounts.blue === abilityCounts.blue
            )
          })

          const combinationText = matchingAbility?.name || 'Unknown'

          // If there's already a confirmed combination, add it to history immediately
          if (confirmedCombination) {
            setHistory(prev => {
              // Check if the last entry has the same name
              const firstEntry = prev[0]
              if (firstEntry && firstEntry.name === confirmedCombination) {
                // Increment the count of the last entry
                const updated = [...prev]
                updated[0] = { name: firstEntry.name, timestamp: firstEntry.timestamp, count: firstEntry.count + 1 }
                return updated
              } else {
                // Add new entry
                const newHistory = [{ name: confirmedCombination, timestamp: Date.now(), count: 1 }, ...prev]
                return newHistory.slice(0, 9)
              }
            })
          }

          setConfirmedCombination(combinationText)
          setCombination([])
          setCastSuccess(true)

          // Clear cast success animation after 600ms
          setTimeout(() => {
            setCastSuccess(false)
          }, 600)

          // Clear existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }

          // Clear confirmation and add to history after 3 seconds
          timeoutRef.current = setTimeout(() => {
            setConfirmedCombination(null)
            // Add to history when confirmation disappears
            setHistory(prev => {
              // Check if the last entry has the same name
              const firstEntry = prev[0]
              if (firstEntry && firstEntry.name === combinationText) {
                // Increment the count of the last entry
                const updated = [...prev]
                updated[0] = { name: firstEntry.name, timestamp: firstEntry.timestamp, count: firstEntry.count + 1 }
                return updated
              } else {
                // Add new entry
                const newHistory = [{ name: combinationText, timestamp: Date.now(), count: 1 }, ...prev]
                return newHistory.slice(0, 9)
              }
            })
            timeoutRef.current = null
          }, 3000)
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        setActiveKey(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [combination, onClose])

  return (
    <div className="ayum-practice-modal">
      <Typography variant={TypographyVariant.H2} style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
        Ayum Training
      </Typography>

      <Typography variant={TypographyVariant.Body} color="var(--color-text-secondary)" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
        Practice casting abilities by pressing 1-4 to select Aspects, then Q to confirm.
      </Typography>

      {/* Aspect Buttons */}
      <div className="aspect-buttons">
        {ASPECTS.map((aspect) => (
          <div key={aspect.key} className="aspect-container">
            <div
              className={`aspect-button aspect-${aspect.color} ${activeKey === aspect.key ? 'active' : ''}`}
            >
              <span className="aspect-initial">{aspect.name[0]}</span>
            </div>
            <Typography
              variant={TypographyVariant.Caption}
              style={{ marginTop: 'var(--space-2)', textAlign: 'center', whiteSpace: 'nowrap' }}
            >
              {aspect.name} <span style={{ color: 'var(--grey-500)' }}>[{aspect.key}]</span>
            </Typography>
          </div>
        ))}
      </div>

      {/* Combination Meter with Q button */}
      <div className={`combination-meter ${castSuccess ? 'cast-success' : ''}`}>
        {[0, 1, 2, 3].map((slotIndex) => (
          <div key={slotIndex} className={`combination-slot ${castSuccess ? 'cast-success' : ''}`}>
            {combination[slotIndex] && (
              <div className={`combination-dot aspect-${combination[slotIndex]}`} />
            )}
          </div>
        ))}
        <div className={`q-button ${castSuccess ? 'cast-success' : ''}`} style={{ visibility: combination.length === 4 ? 'visible' : 'hidden' }}>
          Q
        </div>
      </div>

      {/* Confirmed Combination - Always rendered to prevent modal stretching */}
      <div className={`confirmed-combination ${confirmedCombination ? 'visible' : ''}`}>
        {confirmedCombination && (
          <Typography variant={TypographyVariant.H3} style={{ fontFamily: 'var(--font-orbitron)' }} key={confirmedCombination}>
            {confirmedCombination}
          </Typography>
        )}
      </div>

      {/* Historical Log */}
      <div className="ability-history">
        {history.map((entry, index) => (
          <div
            key={`${entry.timestamp}-${index}`}
            className="ability-history-entry"
            style={{
              opacity: Math.max(0.05, 1 - index * 0.05),
              fontSize: `${Math.max(0.6, 1 - index * 0.02)}rem`,
            }}
          >
            <Typography variant={TypographyVariant.BodySmall} style={{ fontFamily: 'var(--font-orbitron)' }}>
              {entry.name}{entry.count > 1 ? ` [x${entry.count}]` : ''}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
