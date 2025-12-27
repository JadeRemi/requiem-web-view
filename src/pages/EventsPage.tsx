import { useMemo } from 'react'
import { Calendar } from '../components/Calendar'
import { Typography, TypographyVariant } from '../components/Typography'
import { usePageTitle } from '../hooks/usePageTitle'

interface GameEvent {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
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
    year: 'numeric'
  })
}

/**
 * Events Page
 *
 * Displays upcoming game events with calendar visualization
 */
export function EventsPage() {
  usePageTitle()

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
        endDate: gunDerbyDates.endDate
      }
    ]
  }, [])

  return (
    <div className="page events-page">
      <div className="events-content">
        {events.map(event => {
          const eventDates = getDateRange(event.startDate, event.endDate)

          return (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <Typography variant={TypographyVariant.H2} className="event-name">
                  {event.name}
                </Typography>
                <div className="event-name-divider" />
                <Typography variant={TypographyVariant.BodySmall} color="var(--grey-400)" className="event-dates">
                  {formatDate(event.startDate)} — {formatDate(event.endDate)}
                </Typography>
                <Typography variant={TypographyVariant.Body} color="var(--grey-400)" className="event-description">
                  {event.description}
                </Typography>
              </div>
              <Calendar
                eventDates={eventDates}
                initialDate={event.startDate}
                className="event-calendar"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
