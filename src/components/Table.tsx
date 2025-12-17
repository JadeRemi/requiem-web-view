import { useState, useRef, useEffect } from 'react'
import type { TableColumn, SortParams, SortDirection } from '../types/api'
import { Icon } from './Icon'
import { Loader } from './Loader'

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
  /** Number of skeleton rows to show when loading with no data */
  skeletonRows?: number
  /** Function to get additional class name for a row */
  rowClassName?: (row: T) => string | undefined
}

/**
 * Reusable Table Component
 * - Sortable columns with chevron indicators
 * - Fixed header with scrollable body
 * - Infinite scroll support
 */
// Generate varied widths for skeleton bars
const SKELETON_WIDTHS = ['40%', '70%', '55%', '60%', '45%', '65%', '50%', '75%', '35%', '80%']

function getSkeletonWidth(rowIndex: number, colIndex: number): string {
  return SKELETON_WIDTHS[(rowIndex + colIndex * 3 + 7) % SKELETON_WIDTHS.length] ?? '50%'
}

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
  skeletonRows = 10,
  rowClassName,
}: TableProps<T>) {
  const [sort, setSort] = useState<SortParams | undefined>(currentSort)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Sync internal sort state with parent's currentSort prop
  useEffect(() => {
    setSort(currentSort)
  }, [currentSort])

  // Handle column sort click
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return

    const newDirection: SortDirection = 
      sort?.field === column.key && sort.direction === 'asc' ? 'desc' : 'asc'
    
    const newSort: SortParams = { field: column.key, direction: newDirection }
    setSort(newSort)
    onSort?.(newSort)
  }

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const element = loadMoreRef.current
    const container = scrollContainerRef.current
    
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    // Only observe if we have both element and container, and there's more to load
    if (!element || !container || !hasMore || loading) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target && target.isIntersecting && onLoadMore) {
          onLoadMore()
        }
      },
      {
        root: container,
        rootMargin: '50px',
        threshold: 0,
      }
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, onLoadMore])

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

  // Render skeleton rows
  const renderSkeletonRows = () => (
    <>
      {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
        <tr key={`skeleton-${rowIndex}`} className="table-row table-skeleton-row">
          {columns.map((column, colIndex) => (
            <td
              key={column.key}
              className="table-td"
              style={{ 
                width: column.width,
                textAlign: column.align ?? 'left' 
              }}
            >
              <div 
                className="skeleton-bar"
                style={{ 
                  width: column.width ? '70%' : getSkeletonWidth(rowIndex, colIndex),
                  animationDelay: `${(rowIndex * 0.05) + (colIndex * 0.02)}s`
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  )

  const showSkeleton = loading && data.length === 0

  return (
    <div className={`table-container ${showSkeleton ? 'table-container-loading' : ''}`}>
      {showSkeleton && (
        <div className="table-loader-overlay">
          <Loader size={48} color="var(--grey-300)" />
        </div>
      )}
      
      {/* Fixed Header - outside scroll area */}
      <div className="table-header-wrapper">
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
        </table>
      </div>

      {/* Scrollable Body */}
      <div className="table-body-wrapper" ref={scrollContainerRef}>
        <table className="data-table">
          <tbody className={`table-body ${showSkeleton ? 'table-body-skeleton' : ''}`}>
            {showSkeleton ? (
              renderSkeletonRows()
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="table-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const extraClass = rowClassName?.(row) ?? ''
                return (
                  <tr key={String(row[keyField])} className={`table-row ${extraClass}`}>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="table-td"
                        style={{
                          width: column.width,
                          textAlign: column.align ?? 'left'
                        }}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Bottom section: loader when loading more, line when complete */}
        {data.length > 0 && (
          <div className="table-bottom">
            {loading ? (
              <div className="table-bottom-loader">
                <Loader size={32} color="var(--grey-400)" />
              </div>
            ) : !hasMore ? (
              <div className="table-bottom-line" />
            ) : null}
          </div>
        )}

        {/* Infinite scroll sentinel - must be inside scroll container */}
        {hasMore && !loading && <div ref={loadMoreRef} className="table-load-more" />}
      </div>
    </div>
  )
}
