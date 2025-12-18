import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Table } from '../components/Table'
import { FacePreview } from '../components/FacePreview'
import { Tooltip } from '../components/Tooltip'
import { Typography, TypographyVariant } from '../components/Typography'
import { fetchLadder } from '../api/client'
import { useAuth, AuthUser } from '../contexts/AuthContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES } from '../config'
import { formatRelativeTime, formatFullDateTime, formatShortDate } from '../utils/dateFormat'
import type { PlayerDTO, TableColumn, SortParams, ListRequest } from '../types/api'

const PAGE_SIZE = 10

/**
 * Check if a player UUID matches the currently logged in game user
 */
function isCurrentGameUser(playerUuid: string, user: AuthUser | null): boolean {
  if (!user || user.type !== 'game') return false
  return user.gameUuid === playerUuid
}

/**
 * Ladder Page
 * Displays player rankings with sortable columns and infinite scroll
 */
export function LadderPage() {
  usePageTitle()
  const { user } = useAuth()
  const [players, setPlayers] = useState<PlayerDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortParams>({ field: 'score', direction: 'desc' })

  /** Table columns definition */
  const LADDER_COLUMNS: TableColumn<PlayerDTO>[] = [
    {
      key: 'rank',
      label: '#',
      width: '60px',
      align: 'center',
      sortable: false,
    },
    {
      key: 'username',
      label: 'Player',
      sortable: true,
      render: (value, row) => (
        <Link 
          to={`${ROUTES.PROFILE}?uuid=${row.uuid}`}
          className="player-cell-link"
        >
          <FacePreview skinHash={row.skinHash} size={20} />
          <span className="player-name">{String(value)}</span>
        </Link>
      ),
    },
    {
      key: 'score',
      label: 'Score',
      width: '120px',
      align: 'right',
      sortable: true,
      render: (value) => Number(value).toLocaleString(),
    },
    {
      key: 'kills',
      label: 'K/D',
      width: '100px',
      align: 'center',
      sortable: true,
      render: (_value, row) => {
        const kills = row.kills.value
        const deaths = row.deaths.value
        const rate = deaths > 0 ? Math.floor((kills / deaths) * 100) / 100 : kills
        const tooltipContent = (
          <div className="kd-tooltip">
            <div>Kills: {kills.toLocaleString()}</div>
            <div>Deaths: {deaths.toLocaleString()}</div>
          </div>
        )
        return (
          <Tooltip content={tooltipContent} position="top">
            <span className="kd-cell">{rate.toFixed(2)}</span>
          </Tooltip>
        )
      },
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      width: '130px',
      sortable: true,
      render: (value) => (
        <Tooltip content={formatFullDateTime(String(value))} position="top">
          <span className="last-active-cell">{formatRelativeTime(String(value))}</span>
        </Tooltip>
      ),
    },
    {
      key: 'firstJoined',
      label: 'Joined',
      width: '120px',
      sortable: true,
      render: (value) => formatShortDate(String(value)),
    },
  ]

  // Fetch data
  const loadData = useCallback(async (pageNum: number, sortParams: SortParams, append = false) => {
    setLoading(true)

    const request: ListRequest = {
      pagination: { page: pageNum, pageSize: PAGE_SIZE },
      sort: sortParams,
    }

    const response = await fetchLadder(request)

    if (response.success) {
      const newPlayers = response.data.players
      setPlayers((prev) => (append ? [...prev, ...newPlayers] : newPlayers))
      setHasMore(response.meta?.hasMore ?? false)
    }

    setLoading(false)
  }, [])

  // Initial load
  useEffect(() => {
    loadData(1, sort)
  }, [loadData, sort])

  // Handle sort change
  const handleSort = (newSort: SortParams) => {
    setSort(newSort)
    setPage(1)
    setPlayers([])
  }

  // Handle infinite scroll
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      loadData(nextPage, sort, true)
    }
  }

  return (
    <div className="page ladder-page">
      <div className="ladder-content">
        <Typography variant={TypographyVariant.H1} style={{ marginBottom: 'var(--space-6)' }}>
          Leaderboard
        </Typography>

        <Table<PlayerDTO>
          columns={LADDER_COLUMNS}
          data={players}
          keyField="id"
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSort={handleSort}
          currentSort={sort}
          emptyMessage="No players found"
          skeletonRows={10}
          rowClassName={(row) => isCurrentGameUser(row.uuid, user) ? 'table-row-current-user' : undefined}
        />
      </div>
    </div>
  )
}
