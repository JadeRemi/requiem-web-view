/**
 * Online Players Mock
 * List of player UUIDs currently online
 *
 * This file only contains UUIDs - if a UUID is present here, that player is considered online.
 * UUIDs reference players from mock/ladder.ts and mock/ladders/enemy-kills.ts
 */

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
