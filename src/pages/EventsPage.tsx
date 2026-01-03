import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from '../components/Calendar'
import { FacePreview } from '../components/FacePreview'
import { Tooltip } from '../components/Tooltip'
import { Typography, TypographyVariant } from '../components/Typography'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES } from '../config'
import { findPlayerByUuid } from '../mock/ladder'

interface GameEvent {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  startTime: string // e.g., "14:00"
  endTime: string // e.g., "23:59"
}

interface PastEvent {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  winnerUuid: string
  participants: number
  totalPlaytime: number // percentage 0-100
}

/**
 * Generate Gun Derby event dates
 * Always starts on the first Wednesday of next month and runs for 2 weeks
 */
function getGunDerbyDates(): { startDate: Date; endDate: Date } {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

  // Find the first Wednesday of next month
  // getDay(): 0 = Sunday, 3 = Wednesday
  let firstWednesday = 1
  const firstDayOfMonth = nextMonth.getDay()

  if (firstDayOfMonth <= 3) {
    // Wednesday is in the first week
    firstWednesday = 1 + (3 - firstDayOfMonth)
  } else {
    // Wednesday is in the next week
    firstWednesday = 1 + (7 - firstDayOfMonth) + 3
  }

  const startDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), firstWednesday)
  // 2 weeks = 14 days, end date is 13 days after start (inclusive)
  const endDate = new Date(startDate.getTime() + 13 * 24 * 60 * 60 * 1000)

  return { startDate, endDate }
}

/**
 * Generate array of dates between start and end (inclusive)
 */
function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = []
  const current = new Date(startDate)

  while (current <= endDate) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

/**
 * Format date as "MMM DD, YYYY"
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Mock past events data */
const PAST_EVENTS: PastEvent[] = [
  {
    id: 'cutthroat-dec',
    name: 'Cutthroat',
    description: `A ruthless free-for-all where every player is both hunter and prey.
No teams, no alliances — trust no one. The last survivor claims victory and all the spoils.`,
    startDate: new Date(2026, 0, 1), // Jan 1, 2026
    endDate: new Date(2026, 0, 1), // 1 day event
    startTime: '00:00',
    endTime: '23:59',
    winnerUuid: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', // I_Chample
    participants: 128,
    totalPlaytime: 87,
  },
  {
    id: 'isometric-conquest-dec',
    name: 'Isometric Conquest',
    description: `A strategic territory control game played on an isometric grid.
Capture zones, hold positions, and outmaneuver your opponents to dominate the battlefield.`,
    startDate: new Date(2025, 11, 26), // Dec 26, 2025
    endDate: new Date(2025, 11, 28), // 3 day event
    startTime: '12:00',
    endTime: '18:00',
    winnerUuid: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', // Zigfrit
    participants: 256,
    totalPlaytime: 72,
  },
  {
    id: 'build-battle-dec',
    name: 'Build Battle',
    description: `Show off your creativity in this timed building competition.
Each round presents a new theme. Build fast, build smart, and impress the judges to win.`,
    startDate: new Date(2025, 11, 15), // Dec 15, 2025
    endDate: new Date(2025, 11, 21), // 1 week event
    startTime: '10:00',
    endTime: '22:00',
    winnerUuid: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', // Liliput
    participants: 89,
    totalPlaytime: 64,
  },
]

/**
 * Events Page
 *
 * Displays upcoming game events with calendar visualization
 */
export function EventsPage() {
  usePageTitle()
  const [showPastEvents, setShowPastEvents] = useState(false)

  // Mock events data
  const events: GameEvent[] = useMemo(() => {
    const gunDerbyDates = getGunDerbyDates()

    return [
      {
        id: 'gun-derby',
        name: 'Gun Derby',
        description: `A high-stakes shooting competition where players compete for glory and exclusive rewards.
Crates containing new guns spawn across the battlefield. Scavenge resources, find weapons, and craft your arsenal to survive.
At the start, choose from 3 class options. Each class figurine comes with randomly generated inventory contents.
The terrain is picked randomly each match. You have only one attempt at the event — make it count.
Only the last player standing keeps all the loot after the event ends.`,
        startDate: gunDerbyDates.startDate,
        endDate: gunDerbyDates.endDate,
        startTime: '14:00',
        endTime: '23:59',
      },
    ]
  }, [])

  /**
   * Format tooltip text for start date
   */
  function formatStartTooltip(startDate: Date, startTime: string): string {
    return `${startTime} ${formatDate(startDate)}`
  }

  /**
   * Format tooltip text for end date
   */
  function formatEndTooltip(endDate: Date, endTime: string): string {
    return `${endTime} ${formatDate(endDate)}`
  }

  /**
   * Format combined tooltip content for event dates (used in description)
   */
  function formatDateTooltip(startDate: Date, endDate: Date, startTime: string, endTime: string): string {
    return `${formatStartTooltip(startDate, startTime)}\n${formatEndTooltip(endDate, endTime)}`
  }

  return (
    <div className="page events-page">
      <div className="events-content">
        {/* Upcoming Events */}
        {events.map((event) => {
          const eventDates = getDateRange(event.startDate, event.endDate)
          const dateTooltip = formatDateTooltip(event.startDate, event.endDate, event.startTime, event.endTime)
          const startTip = formatStartTooltip(event.startDate, event.startTime)
          const endTip = formatEndTooltip(event.endDate, event.endTime)

          return (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <Typography variant={TypographyVariant.H2} className="event-name">
                  {event.name}
                </Typography>
                <div className="event-name-divider" />
                <Tooltip content={dateTooltip} position="top">
                  <Typography variant={TypographyVariant.BodySmall} as="span" color="var(--grey-400)" className="event-dates">
                    {formatDate(event.startDate)} — {formatDate(event.endDate)}
                  </Typography>
                </Tooltip>
                <Typography variant={TypographyVariant.Body} color="var(--grey-400)" className="event-description">
                  {event.description}
                </Typography>
              </div>
              <Calendar eventDates={eventDates} initialDate={event.startDate} startTooltip={startTip} endTooltip={endTip} className="event-calendar" />
            </div>
          )
        })}

        {/* Past Events Toggle */}
        <div className="events-past-header">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showPastEvents}
              onChange={(e) => setShowPastEvents(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-box" />
            <span>Show past events</span>
          </label>
        </div>

        {/* Past Events */}
        {showPastEvents && (
          <div className="events-past-list">
            {PAST_EVENTS.map((event) => {
              const eventDates = getDateRange(event.startDate, event.endDate)
              const dateTooltip = formatDateTooltip(event.startDate, event.endDate, event.startTime, event.endTime)
              const startTip = formatStartTooltip(event.startDate, event.startTime)
              const endTip = formatEndTooltip(event.endDate, event.endTime)
              const winner = findPlayerByUuid(event.winnerUuid)

              return (
                <div key={event.id} className="event-card event-card-past">
                  {/* Same layout as current events: header left, calendar right */}
                  <div className="event-card-body">
                    <div className="event-card-header">
                      <Typography variant={TypographyVariant.H2} className="event-name">
                        {event.name}
                      </Typography>
                      <div className="event-name-divider" />
                      <Tooltip content={dateTooltip} position="top">
                        <Typography variant={TypographyVariant.BodySmall} as="span" color="var(--grey-400)" className="event-dates">
                          {formatDate(event.startDate)}
                          {event.startDate.getTime() !== event.endDate.getTime() && ` — ${formatDate(event.endDate)}`}
                        </Typography>
                      </Tooltip>
                      <Typography variant={TypographyVariant.Body} color="var(--grey-400)" className="event-description">
                        {event.description}
                      </Typography>
                    </div>
                    <Calendar eventDates={eventDates} initialDate={event.startDate} startTooltip={startTip} endTooltip={endTip} className="event-calendar" />
                  </div>

                  {/* Event Statistics - full width footer under entire card */}
                  <div className="event-stats-footer">
                    <div className="event-stat-column">
                      <Typography variant={TypographyVariant.Caption} color="var(--grey-500)">
                        Winner
                      </Typography>
                      {winner && (
                        <Link to={`${ROUTES.PROFILE}?uuid=${event.winnerUuid}`} className="event-winner-link">
                          <FacePreview skinHash={winner.skinHash} size={20} />
                          <span className="event-winner-name">{winner.username}</span>
                        </Link>
                      )}
                    </div>

                    <div className="event-stat-column">
                      <Typography variant={TypographyVariant.Caption} color="var(--grey-500)">
                        Participants
                      </Typography>
                      <Typography variant={TypographyVariant.Body} color="var(--grey-200)">
                        {event.participants}
                      </Typography>
                    </div>

                    <div className="event-stat-column">
                      <Typography variant={TypographyVariant.Caption} color="var(--grey-500)">
                        Total Playtime
                      </Typography>
                      <Typography variant={TypographyVariant.Body} color="var(--grey-200)">
                        {event.totalPlaytime}%
                      </Typography>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
