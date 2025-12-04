import { useState, useRef, useCallback, useEffect } from 'react'
import type { TableColumn, SortParams, SortDirection } from '../types/api'
import { Icon } from './Icon'

interface TableProps<T extends object> {
  columns: TableColumn<T>[]
  data: T[]
  keyField: keyof T & string
  loading?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
  onSort?: (sort: SortParams) => void
  currentSort?: SortParams
  emptyMessage?: string
}

/**
 * Reusable Table Component
 * - Sortable columns with chevron indicators
 * - Fixed header with scrollable body
 * - Infinite scroll support
 */
export function Table<T extends object>({
  columns,
  data,
  keyField,
  loading = false,
  hasMore = false,
  onLoadMore,
  onSort,
  currentSort,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const [sort, setSort] = useState<SortParams | undefined>(currentSort)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Handle column sort click
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return

    const newDirection: SortDirection = 
      sort?.field === column.key && sort.direction === 'asc' ? 'desc' : 'asc'
    
    const newSort: SortParams = { field: column.key, direction: newDirection }
    setSort(newSort)
    onSort?.(newSort)
  }

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target && target.isIntersecting && hasMore && !loading && onLoadMore) {
        onLoadMore()
      }
    },
    [hasMore, loading, onLoadMore]
  )

  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver])

  // Render sort indicator
  const renderSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null

    const isActive = sort?.field === column.key
    const direction = isActive ? sort.direction : undefined

    return (
      <span className="table-sort-icons">
        <Icon
          name="chevron-up"
          size={12}
          className={`sort-icon ${direction === 'asc' ? 'active' : ''}`}
        />
        <Icon
          name="chevron-down"
          size={12}
          className={`sort-icon ${direction === 'desc' ? 'active' : ''}`}
        />
      </span>
    )
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead className="table-header">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`table-th ${column.sortable ? 'sortable' : ''}`}
                  style={{ 
                    width: column.width, 
                    textAlign: column.align ?? 'left' 
                  }}
                  onClick={() => handleSort(column)}
                >
                  <span className="th-content">
                    {column.label}
                    {renderSortIcon(column)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {data.length === 0 && !loading ? (
              <tr>
                <td colSpan={columns.length} className="table-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={String(row[keyField])} className="table-row">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="table-td"
                      style={{ textAlign: column.align ?? 'left' }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="table-load-more">
        {loading && <span className="table-loading">Loading...</span>}
      </div>
    </div>
  )
}

