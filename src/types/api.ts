/**
 * API Types and DTOs
 * These interfaces define the contract between frontend and future Go backend
 */

/** Base response wrapper from API */
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: ApiError
  meta?: ApiMeta
}

/** API error structure */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}

/** Pagination metadata */
export interface ApiMeta {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasMore: boolean
}

/** Pagination request params */
export interface PaginationParams {
  page: number
  pageSize: number
}

/** Sort direction */
export type SortDirection = 'asc' | 'desc'

/** Sort params for table queries */
export interface SortParams {
  field: string
  direction: SortDirection
}

/** Generic list request with pagination and sorting */
export interface ListRequest {
  pagination: PaginationParams
  sort?: SortParams
  filters?: Record<string, string | number | boolean>
}

/** Player data from ladder */
export interface PlayerDTO {
  id: string
  username: string
  score: number
  rank: number
  gamesPlayed: number
  winRate: number
  lastActive: string
  avatarUrl?: string
}

/** Ladder response */
export interface LadderResponse {
  players: PlayerDTO[]
}

/** Table column definition */
export interface TableColumn<T extends object> {
  key: keyof T & string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

