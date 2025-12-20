/**
 * Online Players Mock
 * List of player UUIDs currently online with their class info
 *
 * UUIDs reference players from mock/ladder.ts and mock/ladders/enemy-kills.ts
 */

import { findPlayerByUuid } from './ladder'
import { getRandomClassForPlayer, type PlayerClass } from './classes'

export interface OnlinePlayer {
  uuid: string
  username: string
  skinHash: string
  playerClass: PlayerClass
  level: number
}

/** Min and max player levels */
const MIN_LEVEL = 1
const MAX_LEVEL = 10

/**
 * Generate a consistent level for a player based on UUID
 */
function getPlayerLevel(uuid: string): number {
  let hash = 0
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return MIN_LEVEL + (Math.abs(hash) % (MAX_LEVEL - MIN_LEVEL + 1))
}

/**
 * Set of currently online player UUIDs
 */
export const ONLINE_PLAYER_UUIDS: Set<string> = new Set([
  'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
  'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
  'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
  'b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e', // SerpentKing
])

/**
 * Check if a player is currently online
 * @param uuid - Player UUID to check
 * @returns true if player is online
 */
export function isPlayerOnline(uuid: string): boolean {
  return ONLINE_PLAYER_UUIDS.has(uuid)
}

/**
 * Get all online players with their full info
 * @returns Array of online players with username, skin, and class
 */
export function getOnlinePlayers(): OnlinePlayer[] {
  const players: OnlinePlayer[] = []

  for (const uuid of ONLINE_PLAYER_UUIDS) {
    const player = findPlayerByUuid(uuid)
    if (player) {
      players.push({
        uuid: player.uuid,
        username: player.username,
        skinHash: player.skinHash,
        playerClass: getRandomClassForPlayer(uuid),
        level: getPlayerLevel(uuid),
      })
    }
  }

  return players
}

/**
 * Get the count of currently online players
 */
export function getOnlineCount(): number {
  return ONLINE_PLAYER_UUIDS.size
}

/**
 * Mock server online status
 */
export const SERVER_ONLINE = true

/**
 * Check if the server is online
 */
export function isServerOnline(): boolean {
  return SERVER_ONLINE
}
