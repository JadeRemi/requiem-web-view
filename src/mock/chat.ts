/**
 * Chat mock data for game chat widget
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

export interface ChatMessage {
  id: string
  status: PlayerStatus | null
  nickname: string
  /** UUID of the player, if known. Used to link to profile. */
  uuid: string | null
  message: string
  timestamp: number
}

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
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    status: getRandomStatus(),
    nickname: player.username,
    uuid: player.uuid,
    message: randomFrom(MESSAGE_POOL),
    timestamp: Date.now(),
  }
}

/** Get random delay between messages (3-15 seconds) */
export function getRandomDelay(): number {
  return 3000 + Math.random() * 12000 // 3000-15000ms
}

/**
 * Start chat message stream with callback
 * Returns cleanup function to stop the stream
 */
export function startChatStream(onMessage: (msg: ChatMessage) => void): () => void {
  let active = true
  
  const run = async () => {
    while (active) {
      await new Promise(resolve => setTimeout(resolve, getRandomDelay()))
      if (active) {
        onMessage(generateRandomMessage())
      }
    }
  }
  
  run()
  
  return () => {
    active = false
  }
}
