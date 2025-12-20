/**
 * Ladder Types
 * Types for different leaderboard categories
 */

/** Base entry for any ladder - player UUID with a numeric value */
export interface LadderEntry {
  uuid: string
  value: number
}

/** Ladder category identifiers */
export type LadderId =
  | 'kills'
  | 'deaths'
  | 'kd-ratio'
  | 'enemy-kills'
  | 'dps'
  | 'gold'
  | 'experience'
  | 'achievements'
  | 'playtime'
  | 'dungeons-completed'
  | 'bosses-killed'
  | 'quests-completed'

/** Ladder metadata */
export interface LadderMeta {
  id: LadderId
  name: string
  description: string
  unit?: string
  /** Format function for displaying values */
  formatValue?: (value: number) => string
}

/** All available ladders */
export const LADDER_META: Record<LadderId, LadderMeta> = {
  kills: {
    id: 'kills',
    name: 'Player Kills',
    description: 'Total PvP kills',
  },
  deaths: {
    id: 'deaths',
    name: 'Deaths',
    description: 'Total deaths',
  },
  'kd-ratio': {
    id: 'kd-ratio',
    name: 'K/D Ratio',
    description: 'Kill to death ratio',
    formatValue: (v) => v.toFixed(2),
  },
  'enemy-kills': {
    id: 'enemy-kills',
    name: 'Enemy Kills',
    description: 'Total PvE kills',
  },
  dps: {
    id: 'dps',
    name: 'DPS',
    description: 'Damage per second',
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    description: 'Total gold earned',
  },
  experience: {
    id: 'experience',
    name: 'Experience',
    description: 'Total experience points',
  },
  achievements: {
    id: 'achievements',
    name: 'Achievements',
    description: 'Achievements unlocked',
  },
  playtime: {
    id: 'playtime',
    name: 'Playtime',
    description: 'Total time played',
    unit: 'hours',
    formatValue: (v) => `${v}h`,
  },
  'dungeons-completed': {
    id: 'dungeons-completed',
    name: 'Dungeons',
    description: 'Dungeons completed',
  },
  'bosses-killed': {
    id: 'bosses-killed',
    name: 'Bosses',
    description: 'Bosses defeated',
  },
  'quests-completed': {
    id: 'quests-completed',
    name: 'Quests',
    description: 'Quests completed',
  },
}
