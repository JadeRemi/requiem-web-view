import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Table } from '../components/Table'
import { Typography, TypographyVariant } from '../components/Typography'
import { fetchLadder } from '../api/client'
import { ROUTES } from '../config'
import type { PlayerDTO, TableColumn, SortParams, ListRequest } from '../types/api'

const PAGE_SIZE = 10

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
    render: (value) => (
      <Link to={ROUTES.PROFILE} className="player-link">
        {String(value)}
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
    key: 'killRate',
    label: 'Kill Rate',
    width: '100px',
    align: 'center',
    sortable: true,
    render: (value) => `${(Number(value) * 100).toFixed(1)}%`,
  },
  {
    key: 'firstJoined',
    label: 'Joined',
    width: '120px',
    sortable: true,
    render: (value) => {
      const date = new Date(String(value))
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    },
  },
  {
    key: 'lastActive',
    label: 'Last Active',
    width: '120px',
    sortable: true,
    render: (value) => {
      const date = new Date(String(value))
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    },
  },
]

/**
 * Ladder Page
 * Displays player rankings with sortable columns and infinite scroll
 */
export function LadderPage() {
  const [players, setPlayers] = useState<PlayerDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortParams>({ field: 'score', direction: 'desc' })

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
        <Typography variant={TypographyVariant.H1}>Leaderboard</Typography>
        <Typography 
          variant={TypographyVariant.Caption} 
          color="var(--color-text-secondary)"
          style={{ marginBottom: 'var(--space-6)' }}
        >
          Top players ranked by score
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
        />
      </div>
    </div>
  )
}
