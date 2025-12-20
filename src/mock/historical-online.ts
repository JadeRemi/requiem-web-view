/**
 * Historical Online Players Mock
 * Data for the online players chart on home page
 */

export interface HistoricalDataPoint {
  timestamp: string // ISO date string
  count: number
}

export type TimeRange = 'today' | 'week' | 'month' | 'year'

/**
 * Generate hourly data for today (last 24 hours)
 */
function generateTodayData(): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const date = new Date(now)
    date.setHours(now.getHours() - i, 0, 0, 0)

    // Simulate player count pattern - lower at night, higher during day
    const hour = date.getHours()
    let baseCount = 15
    if (hour >= 10 && hour <= 14) baseCount = 35 // Late morning peak
    else if (hour >= 18 && hour <= 22) baseCount = 45 // Evening peak
    else if (hour >= 2 && hour <= 7) baseCount = 5 // Night low

    const variation = Math.floor(Math.random() * 10) - 5
    const count = Math.max(0, baseCount + variation)

    data.push({
      timestamp: date.toISOString(),
      count,
    })
  }

  return data
}

/**
 * Generate daily data for this week (last 7 days)
 */
function generateWeekData(): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const now = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    date.setHours(12, 0, 0, 0) // Noon of each day

    // Weekend has slightly higher counts
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const baseCount = isWeekend ? 38 : 28

    const variation = Math.floor(Math.random() * 12) - 6
    const count = Math.max(0, baseCount + variation)

    data.push({
      timestamp: date.toISOString(),
      count,
    })
  }

  return data
}

/**
 * Generate daily data for this month (last 30 days)
 */
function generateMonthData(): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    date.setHours(12, 0, 0, 0)

    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const baseCount = isWeekend ? 40 : 30

    const variation = Math.floor(Math.random() * 15) - 7
    const count = Math.max(0, baseCount + variation)

    data.push({
      timestamp: date.toISOString(),
      count,
    })
  }

  return data
}

/**
 * Generate monthly data for this year (last 12 months)
 */
function generateYearData(): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(now.getMonth() - i, 15) // Middle of each month
    date.setHours(12, 0, 0, 0)

    // Summer months have higher counts
    const month = date.getMonth()
    let baseCount = 25
    if (month >= 5 && month <= 8) baseCount = 45 // Summer peak
    else if (month >= 11 || month <= 1) baseCount = 35 // Winter holiday bump

    const variation = Math.floor(Math.random() * 10) - 5
    const count = Math.max(0, baseCount + variation)

    data.push({
      timestamp: date.toISOString(),
      count,
    })
  }

  return data
}

// Pre-generate data (in real app this would come from API)
const TODAY_DATA = generateTodayData()
const WEEK_DATA = generateWeekData()
const MONTH_DATA = generateMonthData()
const YEAR_DATA = generateYearData()

/**
 * Get historical online data for the specified time range
 */
export function getHistoricalData(range: TimeRange): HistoricalDataPoint[] {
  switch (range) {
    case 'today':
      return TODAY_DATA
    case 'week':
      return WEEK_DATA
    case 'month':
      return MONTH_DATA
    case 'year':
      return YEAR_DATA
  }
}

/**
 * Format timestamp for chart label based on time range
 */
export function formatChartLabel(timestamp: string, range: TimeRange): string {
  const date = new Date(timestamp)

  switch (range) {
    case 'today':
      return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
    case 'week':
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    case 'month':
      return date.toLocaleDateString('en-US', { day: 'numeric' })
    case 'year':
      return date.toLocaleDateString('en-US', { month: 'short' })
  }
}
