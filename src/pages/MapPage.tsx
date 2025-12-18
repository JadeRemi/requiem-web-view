import { useState, useEffect, useMemo } from 'react'
import { EXTERNAL_URLS, MAP_ROTATION } from '../config'
import { ChatWidget } from '../components/ChatWidget'
import { Icon } from '../components/Icon'
import { Typography, TypographyVariant } from '../components/Typography'
import { usePageTitle } from '../hooks/usePageTitle'

interface MapCycle {
  id: string
  label: string
  url: string
  startDate: Date
  endDate: Date
  cycleNumber: number
}

/** Get the start of the current week (Monday) */
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Format date as "MMM DD" */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Calculate cycle number from first cycle start date (1-indexed) */
function getCycleNumber(weekStart: Date): number {
  const firstCycleStart = new Date(MAP_ROTATION.FIRST_CYCLE_START)
  const msPerDay = 24 * 60 * 60 * 1000
  const daysDiff = Math.floor((weekStart.getTime() - firstCycleStart.getTime()) / msPerDay)
  const cycleNumber = Math.floor(daysDiff / MAP_ROTATION.CYCLE_DAYS) + 1
  return cycleNumber
}

/** Calculate map cycles based on current date */
function getMapCycles(): MapCycle[] {
  const now = new Date()
  const currentWeekStart = getWeekStart(now)
  const cycleDays = MAP_ROTATION.CYCLE_DAYS
  const msPerDay = 24 * 60 * 60 * 1000

  // Previous cycle
  const prevStart = new Date(currentWeekStart.getTime() - cycleDays * msPerDay)
  const prevEnd = new Date(currentWeekStart.getTime() - msPerDay)

  // Current cycle
  const currStart = currentWeekStart
  const currEnd = new Date(currentWeekStart.getTime() + (cycleDays - 1) * msPerDay)

  // Next cycle
  const nextStart = new Date(currentWeekStart.getTime() + cycleDays * msPerDay)
  const nextEnd = new Date(currentWeekStart.getTime() + (2 * cycleDays - 1) * msPerDay)

  return [
    {
      id: 'previous',
      label: 'Previous cycle',
      url: EXTERNAL_URLS.BLUEMAP_PREVIOUS,
      startDate: prevStart,
      endDate: prevEnd,
      cycleNumber: getCycleNumber(prevStart),
    },
    {
      id: 'current',
      label: 'Current cycle',
      url: EXTERNAL_URLS.BLUEMAP_CURRENT,
      startDate: currStart,
      endDate: currEnd,
      cycleNumber: getCycleNumber(currStart),
    },
    {
      id: 'next',
      label: 'Next cycle',
      url: EXTERNAL_URLS.BLUEMAP_NETHER,
      startDate: nextStart,
      endDate: nextEnd,
      cycleNumber: getCycleNumber(nextStart),
    },
  ]
}

/** Calculate time until next rotation */
function getRotationTime(cycles: MapCycle[]): string {
  const now = new Date()
  const currentCycle = cycles[1] // Current cycle is always index 1
  if (!currentCycle) return ''
  const rotationDate = new Date(currentCycle.endDate.getTime() + 24 * 60 * 60 * 1000) // Day after current ends

  const diffMs = rotationDate.getTime() - now.getTime()
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000))

  if (diffDays > 1) {
    return `${diffDays} days`
  } else if (diffDays === 1) {
    return '1 day'
  } else {
    // Less than 1 day, show HH:MM
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000))
    const diffMinutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000))
    return `${diffHours.toString().padStart(2, '0')}:${diffMinutes.toString().padStart(2, '0')}`
  }
}

/** Get rotation disclaimer text based on cycle type */
function getRotationDisclaimer(cycleId: string): string {
  switch (cycleId) {
    case 'next':
      return 'This map will move to Current cycle'
    case 'current':
      return 'This map will move to Previous cycle'
    case 'previous':
      return 'This map will be destroyed'
    default:
      return ''
  }
}

export function MapPage() {
  usePageTitle()
  const [currentIndex, setCurrentIndex] = useState(1) // Start at current cycle
  const [rotationText, setRotationText] = useState('')

  const cycles = useMemo(() => getMapCycles(), [])

  // Update rotation timer
  useEffect(() => {
    const updateRotation = () => {
      setRotationText(getRotationTime(cycles))
    }

    updateRotation()
    const interval = setInterval(updateRotation, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [cycles])

  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < cycles.length - 1

  const handlePrev = () => {
    if (canGoBack) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (canGoForward) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const currentCycle = cycles[currentIndex]
  if (!currentCycle) return null

  const dateRange = `${formatDate(currentCycle.startDate)} - ${formatDate(currentCycle.endDate)}`

  return (
    <div className="page map-page">
      <div className="map-carousel">
        {canGoBack && (
          <button className="map-nav-btn map-nav-prev" onClick={handlePrev}>
            <Icon name="chevron-left" size={32} />
          </button>
        )}

        <div className="map-container">
          <div className="map-header">
            <div className="map-cycle-title">
              <Typography variant={TypographyVariant.H3} className="map-cycle-label">
                {currentCycle.label}
              </Typography>
              <Typography variant={TypographyVariant.H3} color="var(--color-text-tertiary)" className="map-cycle-number">
                #{currentCycle.cycleNumber}
              </Typography>
            </div>
            <Typography variant={TypographyVariant.BodySmall} color="var(--color-text-secondary)" className="map-date-range">
              {dateRange}
            </Typography>
            <div className="map-rotation-info">
              <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)" className="map-rotation">
                Rotation in {rotationText}
              </Typography>
              <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)" className="map-disclaimer">
                {getRotationDisclaimer(currentCycle.id)}
              </Typography>
            </div>
          </div>
          <iframe
            key={currentCycle.id}
            src={currentCycle.url}
            title={`World Map - ${currentCycle.label}`}
            className="map-iframe"
            allowFullScreen
          />
        </div>

        {canGoForward && (
          <button className="map-nav-btn map-nav-next" onClick={handleNext}>
            <Icon name="chevron-right" size={32} />
          </button>
        )}
      </div>
      <ChatWidget />
    </div>
  )
}
