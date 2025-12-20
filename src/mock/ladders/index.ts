/**
 * Ladders Index
 * Re-exports all ladder data and provides utility functions
 *
 * For player UUIDs reference, see enemy-kills.ts - it has all 40 mock player UUIDs.
 */

// Re-export ladder data
export { KILLS_LADDER } from './kills'
export { ENEMY_KILLS_LADDER } from './enemy-kills'
export { TIME_LADDER, type TimeLadderEntry } from './time'
export { COMBAT_LADDER, type CombatLadderEntry } from './combat'
export { PROGRESS_LADDER, type ProgressLadderEntry } from './progress'
