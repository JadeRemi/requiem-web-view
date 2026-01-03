import { useState, useMemo, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from '../components/Table'
import { FacePreview } from '../components/FacePreview'
import { Tooltip } from '../components/Tooltip'
import { Blinker } from '../components/Blinker'
import { Typography, TypographyVariant } from '../components/Typography'
import { useAuth, AuthUser } from '../contexts/AuthContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES, DEFAULT_SKIN_HASH } from '../config'
import { findPlayerByUuid } from '../mock/ladder'
import { isPlayerOnline } from '../mock/online-players'
import { TIME_LADDER, type TimeLadderEntry } from '../mock/ladders/time'
import { COMBAT_LADDER, type CombatLadderEntry } from '../mock/ladders/combat'
import { PROGRESS_LADDER, type ProgressLadderEntry } from '../mock/ladders/progress'
import type { TableColumn, SortParams } from '../types/api'

type LadderTab = 'time' | 'combat' | 'progress'

/** Number of entries to load per page */
const PAGE_SIZE = 15

/** Initial loading delay to show skeleton */
const INITIAL_LOAD_DELAY = 800

/**
 * Check if a player UUID matches the currently logged in game user
 */
function isCurrentGameUser(playerUuid: string, user: AuthUser | null): boolean {
  if (!user || user.type !== 'game') return false
  return user.gameUuid === playerUuid
}

/**
 * Format minutes to hours (floored)
 */
function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  return `${hours}h`
}

/**
 * Format large numbers with locale
 */
function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Format ISO date string to readable date
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format ISO date string to relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffMins < 60) {
    return `${diffMins}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays < 7) {
    return `${diffDays}d ago`
  } else if (diffWeeks < 4) {
    return `${diffWeeks}w ago`
  } else if (diffMonths < 12) {
    return `${diffMonths}mo ago`
  } else {
    return `${diffYears}y ago`
  }
}

interface LadderTableProps {
  user: AuthUser | null
  includeJailed: boolean
}

/**
 * Time Ladder Table
 */
function TimeLadderTable({ user, includeJailed }: LadderTableProps) {
  const [sort, setSort] = useState<SortParams>({ field: 'playtime', direction: 'desc' })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setInitialLoad(false)
    }, INITIAL_LOAD_DELAY)
    return () => clearTimeout(timer)
  }, [])

  // Reload when includeJailed changes (simulates API request)
  useEffect(() => {
    if (!initialLoad) {
      setLoading(true)
      setPage(1)
      const timer = setTimeout(() => {
        setLoading(false)
      }, INITIAL_LOAD_DELAY)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [includeJailed])

  const sortedData = useMemo(() => {
    const data = [...TIME_LADDER]
    data.sort((a, b) => {
      const field = sort.field as keyof TimeLadderEntry
      if (field === 'lastActive' || field === 'firstJoined') {
        const aVal = new Date(a[field]).getTime()
        const bVal = new Date(b[field]).getTime()
        return sort.direction === 'desc' ? bVal - aVal : aVal - bVal
      }
      const aVal = a[field] as number
      const bVal = b[field] as number
      return sort.direction === 'desc' ? bVal - aVal : aVal - bVal
    })
    return data
  }, [sort])

  const displayedData = useMemo(() => {
    if (initialLoad) return []
    return sortedData.slice(0, page * PAGE_SIZE)
  }, [sortedData, page, initialLoad])

  const hasMore = !initialLoad && displayedData.length < sortedData.length

  const handleLoadMore = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setPage((p) => p + 1)
      setLoading(false)
    }, 300)
  }, [])

  const columns: TableColumn<TimeLadderEntry>[] = [
    {
      key: 'uuid',
      label: 'Player',
      sortable: false,
      render: (_value, row) => {
        const player = findPlayerByUuid(row.uuid)
        return (
          <Link to={`${ROUTES.PROFILE}?uuid=${row.uuid}`} className="player-cell-link">
            <FacePreview skinHash={player?.skinHash ?? DEFAULT_SKIN_HASH} size={20} />
            <span className="player-name">{player?.username ?? 'Unknown'}</span>
            {isPlayerOnline(row.uuid) && <Blinker />}
          </Link>
        )
      },
    },
    {
      key: 'playtime',
      label: 'Playtime',
      width: '120px',
      align: 'right',
      sortable: true,
      render: (value) => formatPlaytime(Number(value)),
    },
    {
      key: 'afkTime',
      label: 'AFK Time',
      width: '110px',
      align: 'right',
      sortable: true,
      render: (value) => formatPlaytime(Number(value)),
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      width: '130px',
      align: 'right',
      sortable: true,
      render: (value) => (
        <Tooltip content={formatDate(String(value))} position="top">
          <span>{formatRelativeTime(String(value))}</span>
        </Tooltip>
      ),
    },
    {
      key: 'firstJoined',
      label: 'Joined',
      width: '130px',
      align: 'right',
      sortable: true,
      render: (value) => (
        <Tooltip content={formatDate(String(value))} position="top">
          <span>{formatRelativeTime(String(value))}</span>
        </Tooltip>
      ),
    },
  ]

  return (
    <Table<TimeLadderEntry>
      columns={columns}
      data={displayedData}
      keyField="uuid"
      loading={loading}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      onSort={setSort}
      currentSort={sort}
      emptyMessage="No players found"
      rowClassName={(row) => (isCurrentGameUser(row.uuid, user) ? 'table-row-current-user' : undefined)}
    />
  )
}

/**
 * Combat Ladder Table
 */
function CombatLadderTable({ user, includeJailed }: LadderTableProps) {
  const [sort, setSort] = useState<SortParams>({ field: 'pvpKills', direction: 'desc' })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setInitialLoad(false)
    }, INITIAL_LOAD_DELAY)
    return () => clearTimeout(timer)
  }, [])

  // Reload when includeJailed changes (simulates API request)
  useEffect(() => {
    if (!initialLoad) {
      setLoading(true)
      setPage(1)
      const timer = setTimeout(() => {
        setLoading(false)
      }, INITIAL_LOAD_DELAY)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [includeJailed])

  const sortedData = useMemo(() => {
    const data = [...COMBAT_LADDER]
    data.sort((a, b) => {
      const field = sort.field as keyof CombatLadderEntry | 'kd'
      if (field === 'kd') {
        const aKills = a.pvpKills + a.pveKills
        const bKills = b.pvpKills + b.pveKills
        const aKd = a.deaths > 0 ? aKills / a.deaths : aKills
        const bKd = b.deaths > 0 ? bKills / b.deaths : bKills
        return sort.direction === 'desc' ? bKd - aKd : aKd - bKd
      }
      const aVal = a[field as keyof CombatLadderEntry] as number
      const bVal = b[field as keyof CombatLadderEntry] as number
      return sort.direction === 'desc' ? bVal - aVal : aVal - bVal
    })
    return data
  }, [sort])

  const displayedData = useMemo(() => {
    if (initialLoad) return []
    return sortedData.slice(0, page * PAGE_SIZE)
  }, [sortedData, page, initialLoad])

  const hasMore = !initialLoad && displayedData.length < sortedData.length

  const handleLoadMore = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setPage((p) => p + 1)
      setLoading(false)
    }, 300)
  }, [])

  const columns: TableColumn<CombatLadderEntry & { kd: number }>[] = [
    {
      key: 'uuid',
      label: 'Player',
      sortable: false,
      render: (_value, row) => {
        const player = findPlayerByUuid(row.uuid)
        return (
          <Link to={`${ROUTES.PROFILE}?uuid=${row.uuid}`} className="player-cell-link">
            <FacePreview skinHash={player?.skinHash ?? DEFAULT_SKIN_HASH} size={20} />
            <span className="player-name">{player?.username ?? 'Unknown'}</span>
            {isPlayerOnline(row.uuid) && <Blinker />}
          </Link>
        )
      },
    },
    {
      key: 'pvpKills',
      label: 'PvP Kills',
      width: '100px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
    {
      key: 'pveKills',
      label: 'PvE Kills',
      width: '100px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
    {
      key: 'duelRank',
      label: 'Duel Rank',
      width: '100px',
      align: 'center',
      sortable: true,
      render: (value) => `#${value}`,
    },
    {
      key: 'murderRank',
      label: 'Murder Rank',
      width: '115px',
      align: 'center',
      sortable: true,
      render: (value) => `#${value}`,
    },
    {
      key: 'dps',
      label: 'DPS',
      width: '90px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
    {
      key: 'deaths',
      label: 'Deaths',
      width: '90px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
    {
      key: 'kd',
      label: 'K/D',
      width: '80px',
      align: 'right',
      sortable: true,
      render: (value) => Number(value).toFixed(2),
    },
  ]

  const dataWithKd = displayedData.map((entry) => {
    const kills = entry.pvpKills + entry.pveKills
    const kd = entry.deaths > 0 ? kills / entry.deaths : kills
    return { ...entry, kd }
  })

  return (
    <Table<CombatLadderEntry & { kd: number }>
      columns={columns}
      data={dataWithKd}
      keyField="uuid"
      loading={loading}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      onSort={setSort}
      currentSort={sort}
      emptyMessage="No players found"
      rowClassName={(row) => (isCurrentGameUser(row.uuid, user) ? 'table-row-current-user' : undefined)}
    />
  )
}

/**
 * Progress Ladder Table
 */
function ProgressLadderTable({ user, includeJailed }: LadderTableProps) {
  const [sort, setSort] = useState<SortParams>({ field: 'achievements', direction: 'desc' })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setInitialLoad(false)
    }, INITIAL_LOAD_DELAY)
    return () => clearTimeout(timer)
  }, [])

  // Reload when includeJailed changes (simulates API request)
  useEffect(() => {
    if (!initialLoad) {
      setLoading(true)
      setPage(1)
      const timer = setTimeout(() => {
        setLoading(false)
      }, INITIAL_LOAD_DELAY)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [includeJailed])

  const sortedData = useMemo(() => {
    const data = [...PROGRESS_LADDER]
    data.sort((a, b) => {
      const field = sort.field as keyof ProgressLadderEntry
      const aVal = a[field] as number
      const bVal = b[field] as number
      return sort.direction === 'desc' ? bVal - aVal : aVal - bVal
    })
    return data
  }, [sort])

  const displayedData = useMemo(() => {
    if (initialLoad) return []
    return sortedData.slice(0, page * PAGE_SIZE)
  }, [sortedData, page, initialLoad])

  const hasMore = !initialLoad && displayedData.length < sortedData.length

  const handleLoadMore = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setPage((p) => p + 1)
      setLoading(false)
    }, 300)
  }, [])

  const columns: TableColumn<ProgressLadderEntry>[] = [
    {
      key: 'uuid',
      label: 'Player',
      sortable: false,
      render: (_value, row) => {
        const player = findPlayerByUuid(row.uuid)
        return (
          <Link to={`${ROUTES.PROFILE}?uuid=${row.uuid}`} className="player-cell-link">
            <FacePreview skinHash={player?.skinHash ?? DEFAULT_SKIN_HASH} size={20} />
            <span className="player-name">{player?.username ?? 'Unknown'}</span>
            {isPlayerOnline(row.uuid) && <Blinker />}
          </Link>
        )
      },
    },
    {
      key: 'achievements',
      label: 'Achievements',
      width: '130px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
    {
      key: 'totalExp',
      label: 'Total Exp',
      width: '120px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
    {
      key: 'totalGold',
      label: 'Total Gold',
      width: '120px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
    {
      key: 'totalQuests',
      label: 'Quests',
      width: '100px',
      align: 'right',
      sortable: true,
      render: (value) => formatNumber(Number(value)),
    },
  ]

  return (
    <Table<ProgressLadderEntry>
      columns={columns}
      data={displayedData}
      keyField="uuid"
      loading={loading}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      onSort={setSort}
      currentSort={sort}
      emptyMessage="No players found"
      rowClassName={(row) => (isCurrentGameUser(row.uuid, user) ? 'table-row-current-user' : undefined)}
    />
  )
}

const TABS: { id: LadderTab; label: string }[] = [
  { id: 'time', label: 'Time' },
  { id: 'combat', label: 'Combat' },
  { id: 'progress', label: 'Progress' },
]

/** Mock: Statistics last updated 20 hours ago from page load */
function getLastUpdatedDate(): Date {
  const date = new Date()
  date.setHours(date.getHours() - 20)
  return date
}

/**
 * Format date with time in 24-hour format (e.g., "Dec 28, 2025, 14:30")
 */
function formatDateTime(isoString: string): string {
  const date = new Date(isoString)
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
 * Format relative time with full words (e.g., "20 hours ago")
 */
function formatRelativeTimeLong(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  }
}

/**
 * Ladder Page
 * Displays player rankings with sortable columns across three tabs
 */
export function LadderPage() {
  usePageTitle()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<LadderTab>('time')
  const [showJailedPlayers, setShowJailedPlayers] = useState(false)

  // Mock last updated date - computed once on mount
  const lastUpdated = useMemo(() => getLastUpdatedDate(), [])
  const lastUpdatedFormatted = formatDateTime(lastUpdated.toISOString())

  // TODO: In the future, showJailedPlayers will trigger an API call to reload data

  return (
    <div className="page ladder-page">
      <div className="ladder-content">
        <div className="ladder-header-row">
          <Typography
            variant={TypographyVariant.Caption}
            color="var(--color-text-tertiary)"
          >
            Statistics update once per day. Last updated:{' '}
            <Tooltip content={lastUpdatedFormatted} position="top">
              <span className="ladder-last-updated">{formatRelativeTimeLong(lastUpdated.toISOString())}</span>
            </Tooltip>
          </Typography>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showJailedPlayers}
              onChange={(e) => setShowJailedPlayers(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-box" />
            <span>Show jailed players</span>
          </label>
        </div>

        <div className="ladder-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`ladder-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ladder-table-container">
          {activeTab === 'time' && <TimeLadderTable user={user} includeJailed={showJailedPlayers} />}
          {activeTab === 'combat' && <CombatLadderTable user={user} includeJailed={showJailedPlayers} />}
          {activeTab === 'progress' && <ProgressLadderTable user={user} includeJailed={showJailedPlayers} />}
        </div>
      </div>
    </div>
  )
}
