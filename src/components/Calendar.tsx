import { useState, useMemo, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface CalendarProps {
  /** Dates to highlight as event dates */
  eventDates: Date[]
  /** Initial month to display (defaults to first event date's month) */
  initialDate?: Date
  /** Tooltip text for start date cell */
  startTooltip?: string
  /** Tooltip text for end date cell */
  endTooltip?: string
  className?: string
}

/** Day names for header */
const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/** Month names */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

/** Get number of days in a month */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/** Get the day of week for the first day of month (0 = Monday, 6 = Sunday) */
function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay()
  // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  return day === 0 ? 6 : day - 1
}

/** Check if two dates are the same day */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/** Check if a date is in the event dates array */
function isEventDate(date: Date, eventDates: Date[]): boolean {
  return eventDates.some(eventDate => isSameDay(date, eventDate))
}

/**
 * Calendar Component
 *
 * Displays a month view calendar with highlighted event dates.
 * Navigation via triangle buttons to adjacent months.
 */
export function Calendar({ eventDates, initialDate, startTooltip, endTooltip, className = '' }: CalendarProps) {
  // Default to first event date's month, or current month
  const defaultDate = initialDate || eventDates[0] || new Date()
  const [currentMonth, setCurrentMonth] = useState(defaultDate.getMonth())
  const [currentYear, setCurrentYear] = useState(defaultDate.getFullYear())

  // Hover state for event days (controls both tooltips and highlight)
  const [isEventHovered, setIsEventHovered] = useState(false)
  const [startTooltipRect, setStartTooltipRect] = useState<DOMRect | null>(null)
  const [endTooltipRect, setEndTooltipRect] = useState<DOMRect | null>(null)
  const startDateRef = useRef<HTMLDivElement>(null)
  const endDateRef = useRef<HTMLDivElement>(null)

  // Get start and end dates from eventDates array
  const startDate = eventDates.length > 0 ? eventDates[0] : null
  const endDate = eventDates.length > 0 ? eventDates[eventDates.length - 1] : null
  const isSameDayEvent = startDate && endDate && isSameDay(startDate, endDate)

  const handleEventMouseEnter = useCallback(() => {
    setIsEventHovered(true)
    // Get rect for start date cell if visible
    if (startTooltip && startDateRef.current) {
      setStartTooltipRect(startDateRef.current.getBoundingClientRect())
    }
    // Get rect for end date cell if visible
    if (endTooltip && endDateRef.current) {
      setEndTooltipRect(endDateRef.current.getBoundingClientRect())
    }
  }, [startTooltip, endTooltip])

  const handleEventMouseLeave = useCallback(() => {
    setIsEventHovered(false)
    setStartTooltipRect(null)
    setEndTooltipRect(null)
  }, [])

  const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth])
  const firstDayOfMonth = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth])

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = []

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }, [daysInMonth, firstDayOfMonth])

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className={`calendar ${className}`}>
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          <span className="calendar-triangle calendar-triangle-left" />
        </button>
        <div className="calendar-title">
          <span className="calendar-month">{MONTH_NAMES[currentMonth]}</span>
          <span className="calendar-year">{currentYear}</span>
        </div>
        <button
          className="calendar-nav-btn"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <span className="calendar-triangle calendar-triangle-right" />
        </button>
      </div>

      <div className="calendar-grid">
        {/* Day name headers */}
        {DAY_NAMES.map(day => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="calendar-day calendar-day-empty" />
          }

          const date = new Date(currentYear, currentMonth, day)
          const isEvent = isEventDate(date, eventDates)
          const isToday = isSameDay(date, new Date())
          const isStartDate = startDate && isSameDay(date, startDate)
          const isEndDate = endDate && isSameDay(date, endDate)

          // Determine which ref to use (start takes priority if same day)
          const cellRef = isStartDate ? startDateRef : isEndDate ? endDateRef : undefined

          return (
            <div
              key={day}
              ref={cellRef}
              className={`calendar-day ${isEvent ? 'calendar-day-event' : ''} ${isToday ? 'calendar-day-today' : ''} ${isEvent && isEventHovered ? 'calendar-day-event-hover' : ''}`}
              onMouseEnter={isEvent ? handleEventMouseEnter : undefined}
              onMouseLeave={isEvent ? handleEventMouseLeave : undefined}
            >
              {day}
            </div>
          )
        })}
      </div>

      {/* Combined tooltip for same-day events */}
      {isEventHovered && isSameDayEvent && startTooltipRect && startTooltip && endTooltip && (createPortal(
        <div
          className="tooltip tooltip-top"
          style={{
            position: 'fixed',
            left: startTooltipRect.left + startTooltipRect.width / 2,
            top: startTooltipRect.top - 8,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="tooltip-content">{startTooltip}{'\n'}{endTooltip}</div>
          <div className="tooltip-beak tooltip-beak-top" />
        </div>,
        document.body
      ) as React.ReactElement)}

      {/* Start date tooltip (above) - only when not same day */}
      {isEventHovered && !isSameDayEvent && startTooltipRect && startTooltip && (createPortal(
        <div
          className="tooltip tooltip-top"
          style={{
            position: 'fixed',
            left: startTooltipRect.left + startTooltipRect.width / 2,
            top: startTooltipRect.top - 8,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="tooltip-content">{startTooltip}</div>
          <div className="tooltip-beak tooltip-beak-top" />
        </div>,
        document.body
      ) as React.ReactElement)}

      {/* End date tooltip (below) - only when not same day */}
      {isEventHovered && !isSameDayEvent && endTooltipRect && endTooltip && (createPortal(
        <div
          className="tooltip tooltip-bottom"
          style={{
            position: 'fixed',
            left: endTooltipRect.left + endTooltipRect.width / 2,
            top: endTooltipRect.top + endTooltipRect.height + 8,
            transform: 'translate(-50%, 0)',
          }}
        >
          <div className="tooltip-content">{endTooltip}</div>
          <div className="tooltip-beak tooltip-beak-bottom" />
        </div>,
        document.body
      ) as React.ReactElement)}
    </div>
  )
}
