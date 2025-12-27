/**
 * Chat mock data for game chat widget
 *
 * This module provides mock data for both chat messages and game events.
 * Designed to be easily convertible to a WebSocket-compatible API schema.
 */

import { MOCK_PLAYERS } from './ladder'

/** Player status prefixes */
export enum PlayerStatus {
  Explorer = 'Explorer',
  Trader = 'Trader',
  Master = 'Master',
  Killer = 'Killer',
  Thief = 'Thief',
  Ascended = 'Ascended',
}

/** Event types for game events */
export enum GameEventType {
  Death = 'death',
  Kill = 'kill',
}

/** Feed item types - discriminator for chat messages vs events */
export enum FeedItemType {
  Message = 'message',
  Event = 'event',
}

/** Status weights - higher = more likely to appear */
export const STATUS_WEIGHTS: Record<PlayerStatus, number> = {
  [PlayerStatus.Explorer]: 20,
  [PlayerStatus.Trader]: 15,
  [PlayerStatus.Master]: 5,
  [PlayerStatus.Killer]: 25,
  [PlayerStatus.Thief]: 10,
  [PlayerStatus.Ascended]: 2,
}

/** Weight for no status (regular player) */
const NO_STATUS_WEIGHT = 40

/** Pool of mock chat messages (sci-fi themed) */
export const MESSAGE_POOL = [
  'gg',
  'nice',
  'anyone want to party up?',
  'where is the anomaly?',
  'need help with the rift',
  'selling rare artifacts',
  'looking for a faction',
  'first time in this sector',
  'this server is amazing',
  'brb',
  'back',
  'lag anyone?',
  'how do i get to the station?',
  'thanks for the assist!',
  'wp',
  'rip',
  'what power level are you?',
  'im level 50',
  'anyone trading cores?',
  'looking for medic',
  'assault here',
  'lets go',
  'wait for me',
  'sorry gtg',
  'hello operatives',
  'hi',
  'hey',
  'sup',
  'signing off soon',
  'gl hf',
  'gg wp',
  'rematch?',
  'that was close',
  'almost got them',
  'next run',
  'finally cleared it!',
  'drop rate is terrible',
  'got lucky with the loot',
  'anyone seen the rare spawn?',
  'event incoming',
  'server reset in 10',
  'maintenance soon?',
  'patch notes?',
  'new update is solid',
  'who wants to duel?',
  '1v1 me',
  'no way',
  'haha',
  'wow',
  'what just happened',
  'did you see that',
  'insane damage',
  'nerf plasma rifle',
  'buff shields please',
  'devs pls fix',
  'portal opened in sector 7',
  'boss spawning soon',
  'need tank for raid',
  'healer lfg',
  'dps looking for squad',
  'coords?',
  'check your six',
  'hostile incoming',
  'clear',
  'sector secured',
  'extraction point marked',
  'running low on energy',
  'need ammo',
  'shield down',
  'recharging',
  'enemy spotted',
  'flank left',
  'cover me',
  'nice shot',
  'clutch',
  'mvp right there',
  'what build are you running?',
  'meta loadout?',
  'any tips for newbies?',
  'just hit prestige',
  'grinding for the new gear',
] as const

/** Pool of death reasons (environmental/self deaths) */
export const DEATH_REASONS = [
  'fell from a high place',
  'was slain by Zombie',
  'was killed by Skeleton',
  'drowned',
  'burned to death',
  'was blown up by Creeper',
  'was pricked to death',
  'hit the ground too hard',
  'tried to swim in lava',
  'withered away',
  'was squashed by a falling anvil',
  'was fireballed by Blaze',
  'starved to death',
  'suffocated in a wall',
  'was slain by Spider',
] as const

/** Chat player info from ladder mock */
export interface ChatPlayer {
  username: string
  uuid: string
}

/** Get chat players from ladder mock */
export const CHAT_PLAYERS: ChatPlayer[] = MOCK_PLAYERS.map(p => ({
  username: p.username,
  uuid: p.uuid
}))

/** Player reference for events */
export interface PlayerRef {
  username: string
  uuid: string | null
}

/** Base chat message (type: message) */
export interface ChatMessage {
  type: FeedItemType.Message
  id: string
  status: PlayerStatus | null
  nickname: string
  /** UUID of the player, if known. Used to link to profile. */
  uuid: string | null
  message: string
  timestamp: number
}

/** Death event - player died to environment or mob */
export interface DeathEvent {
  type: FeedItemType.Event
  eventType: GameEventType.Death
  id: string
  player: PlayerRef
  reason: string
  timestamp: number
}

/** Kill event - player killed by another player */
export interface KillEvent {
  type: FeedItemType.Event
  eventType: GameEventType.Kill
  id: string
  killer: PlayerRef
  victim: PlayerRef
  timestamp: number
}

/** Game event union type */
export type GameEvent = DeathEvent | KillEvent

/** Chat feed item - can be a message or an event */
export type ChatFeedItem = ChatMessage | GameEvent

/** Get a random element from an array */
function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

/** Get a weighted random status (or null for no status) */
function getRandomStatus(): PlayerStatus | null {
  const totalWeight = Object.values(STATUS_WEIGHTS).reduce((a, b) => a + b, 0) + NO_STATUS_WEIGHT
  let random = Math.random() * totalWeight
  
  // Check for no status first
  if (random < NO_STATUS_WEIGHT) {
    return null
  }
  random -= NO_STATUS_WEIGHT
  
  // Check each status
  for (const [status, weight] of Object.entries(STATUS_WEIGHTS)) {
    if (random < weight) {
      return status as PlayerStatus
    }
    random -= weight
  }
  
  return null
}

/** Generate a random chat message */
export function generateRandomMessage(): ChatMessage {
  const player = randomFrom(CHAT_PLAYERS)
  return {
    type: FeedItemType.Message,
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    status: getRandomStatus(),
    nickname: player.username,
    uuid: player.uuid,
    message: randomFrom(MESSAGE_POOL),
    timestamp: Date.now(),
  }
}

/** Generate a random death event */
export function generateDeathEvent(): DeathEvent {
  const player = randomFrom(CHAT_PLAYERS)
  return {
    type: FeedItemType.Event,
    eventType: GameEventType.Death,
    id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    player: {
      username: player.username,
      uuid: player.uuid,
    },
    reason: randomFrom(DEATH_REASONS),
    timestamp: Date.now(),
  }
}

/** Generate a random kill event */
export function generateKillEvent(): KillEvent {
  // Get two different players
  const players = [...CHAT_PLAYERS]
  const killerIndex = Math.floor(Math.random() * players.length)
  const killer = players[killerIndex]!
  players.splice(killerIndex, 1)
  const victim = randomFrom(players)

  return {
    type: FeedItemType.Event,
    eventType: GameEventType.Kill,
    id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    killer: {
      username: killer.username,
      uuid: killer.uuid,
    },
    victim: {
      username: victim.username,
      uuid: victim.uuid,
    },
    timestamp: Date.now(),
  }
}

/** Weights for feed item types */
const FEED_ITEM_WEIGHTS = {
  message: 70,
  deathEvent: 15,
  killEvent: 15,
}

/** Generate a random feed item (message or event) */
export function generateRandomFeedItem(): ChatFeedItem {
  const total = FEED_ITEM_WEIGHTS.message + FEED_ITEM_WEIGHTS.deathEvent + FEED_ITEM_WEIGHTS.killEvent
  const rand = Math.random() * total

  if (rand < FEED_ITEM_WEIGHTS.message) {
    return generateRandomMessage()
  } else if (rand < FEED_ITEM_WEIGHTS.message + FEED_ITEM_WEIGHTS.deathEvent) {
    return generateDeathEvent()
  } else {
    return generateKillEvent()
  }
}

/** Get random delay between messages (3-15 seconds) */
export function getRandomDelay(): number {
  return 3000 + Math.random() * 12000 // 3000-15000ms
}

/**
 * Start chat feed stream with callback
 * Returns cleanup function to stop the stream
 *
 * This simulates a WebSocket connection that receives both
 * chat messages and game events from the server.
 */
export function startChatStream(onItem: (item: ChatFeedItem) => void): () => void {
  let active = true

  const run = async () => {
    while (active) {
      await new Promise(resolve => setTimeout(resolve, getRandomDelay()))
      if (active) {
        onItem(generateRandomFeedItem())
      }
    }
  }

  run()

  return () => {
    active = false
  }
}
