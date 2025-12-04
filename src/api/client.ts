/**
 * API Client - Prototype for future Go backend
 * 
 * This module provides a typed interface for backend communication.
 * Currently returns mock data; will be connected to actual endpoints later.
 */

import type { 
  ApiResponse, 
  ApiMeta, 
  ListRequest, 
  LadderResponse,
  PlayerDTO 
} from '../types/api'
import { MOCK_PLAYERS } from '../mock/ladder'

/** Base URL for API - will be configured per environment */
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/** Simulated network delay for realistic UX testing */
const MOCK_DELAY_MS = 300

/** Helper to simulate async API call */
async function mockDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
}

/** Create success response wrapper */
function createSuccessResponse<T>(data: T, meta?: ApiMeta): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    data,
  }
  if (meta !== undefined) {
    response.meta = meta
  }
  return response
}

/**
 * Fetch ladder data with pagination and sorting
 */
export async function fetchLadder(request: ListRequest): Promise<ApiResponse<LadderResponse>> {
  await mockDelay()

  const { pagination, sort } = request
  let players = [...MOCK_PLAYERS] as PlayerDTO[]

  // Apply sorting
  if (sort) {
    players.sort((a, b) => {
      const aVal = a[sort.field as keyof PlayerDTO]
      const bVal = b[sort.field as keyof PlayerDTO]
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.direction === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      const aStr = String(aVal)
      const bStr = String(bVal)
      return sort.direction === 'asc' 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr)
    })
  }

  // Update ranks after sorting
  players = players.map((p, idx) => ({ ...p, rank: idx + 1 }))

  // Apply pagination
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  const paginatedPlayers = players.slice(start, end)

  const meta: ApiMeta = {
    page: pagination.page,
    pageSize: pagination.pageSize,
    totalCount: players.length,
    totalPages: Math.ceil(players.length / pagination.pageSize),
    hasMore: end < players.length,
  }

  return createSuccessResponse({ players: paginatedPlayers }, meta)
}

/**
 * Generic fetch wrapper for future real API calls
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      return {
        success: false,
        data: null as T,
        error: {
          code: `HTTP_${response.status}`,
          message: response.statusText,
        },
      }
    }

    const data = await response.json() as T
    return createSuccessResponse(data)
  } catch (err) {
    return {
      success: false,
      data: null as T,
      error: {
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
    }
  }
}

