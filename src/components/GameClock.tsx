import { useState, useEffect } from 'react'

/**
 * Game Clock Component
 *
 * Displays the in-game time with a sun/moon indicator.
 * Full day cycle = 20 minutes real time = 24 hours in-game time.
 * - 1 in-game hour = 50 seconds real time
 * - 1 in-game minute = 0.833 seconds real time
 *
 * Day: 06:00 - 18:00 (sun)
 * Night: 18:00 - 06:00 (moon)
 */

/** Full day cycle duration in milliseconds (20 minutes) */
const DAY_CYCLE_MS = 20 * 60 * 1000

/** Mock start time - arbitrary epoch for consistent time across sessions */
const EPOCH_START = new Date('2024-01-01T00:00:00Z').getTime()

interface GameClockProps {
  className?: string
}

export function GameClock({ className = '' }: GameClockProps) {
  const [gameTime, setGameTime] = useState({ hours: 0, minutes: 0 })

  useEffect(() => {
    const calculateGameTime = () => {
      const now = Date.now()
      const elapsed = now - EPOCH_START

      // Position in the current day cycle (0 to 1)
      const cyclePosition = (elapsed % DAY_CYCLE_MS) / DAY_CYCLE_MS

      // Convert to 24-hour time (0-23:59)
      const totalMinutes = cyclePosition * 24 * 60
      const hours = Math.floor(totalMinutes / 60)
      const minutes = Math.floor(totalMinutes % 60)

      setGameTime({ hours, minutes })
    }

    calculateGameTime()

    // Update every 833ms (approximately 1 in-game minute)
    const interval = setInterval(calculateGameTime, 833)

    return () => clearInterval(interval)
  }, [])

  // Determine if it's day or night
  // Day: 06:00 - 17:59, Night: 18:00 - 05:59
  const isDay = gameTime.hours >= 6 && gameTime.hours < 18

  // Format time digits
  const hours = gameTime.hours.toString().padStart(2, '0')
  const minutes = gameTime.minutes.toString().padStart(2, '0')

  return (
    <div className={`game-clock ${className}`}>
      <span className="game-clock-time">
        <span className="game-clock-digit">{hours[0]}</span>
        <span className="game-clock-digit">{hours[1]}</span>
        <span className="game-clock-separator">:</span>
        <span className="game-clock-digit">{minutes[0]}</span>
        <span className="game-clock-digit">{minutes[1]}</span>
      </span>
      <span className="game-clock-icon">{isDay ? '☀️' : '🌙'}</span>
    </div>
  )
}
