/**
 * Ladders Index
 * Re-exports all ladder data and provides utility functions
 */

import type { LadderEntry, LadderId } from '../../types/ladder'
import { KILLS_LADDER } from './kills'
import { ENEMY_KILLS_LADDER } from './enemy-kills'

/** Map of ladder ID to ladder data */
const LADDERS: Partial<Record<LadderId, LadderEntry[]>> = {
  kills: KILLS_LADDER,
  'enemy-kills': ENEMY_KILLS_LADDER,
}

/**
 * Get ladder data by ID
 * @param id - Ladder identifier
 * @returns Array of ladder entries or undefined
 */
export function getLadder(id: LadderId): LadderEntry[] | undefined {
  return LADDERS[id]
}

/**
 * Get player's rank in a specific ladder
 * @param ladderId - Ladder identifier
 * @param playerUuid - Player UUID
 * @returns Player's rank (1-indexed) or undefined if not found
 */
export function getPlayerRank(ladderId: LadderId, playerUuid: string): number | undefined {
  const ladder = LADDERS[ladderId]
  if (!ladder) return undefined

  const index = ladder.findIndex(entry => entry.uuid === playerUuid)
  return index >= 0 ? index + 1 : undefined
}

/**
 * Get player's value in a specific ladder
 * @param ladderId - Ladder identifier
 * @param playerUuid - Player UUID
 * @returns Player's value or undefined if not found
 */
export function getPlayerValue(ladderId: LadderId, playerUuid: string): number | undefined {
  const ladder = LADDERS[ladderId]
  if (!ladder) return undefined

  const entry = ladder.find(e => e.uuid === playerUuid)
  return entry?.value
}

// Re-export individual ladders
export { KILLS_LADDER } from './kills'
export { ENEMY_KILLS_LADDER } from './enemy-kills'
