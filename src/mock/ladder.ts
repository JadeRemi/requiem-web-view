import type { PlayerDTO } from '../types/api'

/**
 * Mock ladder data for development
 * Uses `satisfies` for type checking and `as const` for immutability
 */
export const MOCK_PLAYERS = [
  {
    id: 'p001',
    username: 'ShadowKnight',
    score: 28450,
    rank: 1,
    gamesPlayed: 342,
    winRate: 0.78,
    lastActive: '2025-12-04T10:30:00Z',
  },
  {
    id: 'p002',
    username: 'CrimsonBlade',
    score: 26890,
    rank: 2,
    gamesPlayed: 289,
    winRate: 0.72,
    lastActive: '2025-12-04T09:15:00Z',
  },
  {
    id: 'p003',
    username: 'NightHunter',
    score: 24120,
    rank: 3,
    gamesPlayed: 412,
    winRate: 0.65,
    lastActive: '2025-12-03T22:45:00Z',
  },
  {
    id: 'p004',
    username: 'IronWolf',
    score: 22780,
    rank: 4,
    gamesPlayed: 198,
    winRate: 0.81,
    lastActive: '2025-12-04T11:00:00Z',
  },
  {
    id: 'p005',
    username: 'StormRider',
    score: 21340,
    rank: 5,
    gamesPlayed: 267,
    winRate: 0.69,
    lastActive: '2025-12-04T08:20:00Z',
  },
  {
    id: 'p006',
    username: 'FrostMage',
    score: 19870,
    rank: 6,
    gamesPlayed: 445,
    winRate: 0.58,
    lastActive: '2025-12-03T18:30:00Z',
  },
  {
    id: 'p007',
    username: 'ThunderStrike',
    score: 18920,
    rank: 7,
    gamesPlayed: 321,
    winRate: 0.61,
    lastActive: '2025-12-04T07:45:00Z',
  },
  {
    id: 'p008',
    username: 'VoidWalker',
    score: 17450,
    rank: 8,
    gamesPlayed: 156,
    winRate: 0.74,
    lastActive: '2025-12-03T20:10:00Z',
  },
  {
    id: 'p009',
    username: 'SilverArrow',
    score: 16280,
    rank: 9,
    gamesPlayed: 389,
    winRate: 0.55,
    lastActive: '2025-12-04T06:30:00Z',
  },
  {
    id: 'p010',
    username: 'DarkPhoenix',
    score: 15120,
    rank: 10,
    gamesPlayed: 234,
    winRate: 0.63,
    lastActive: '2025-12-03T15:00:00Z',
  },
] as const satisfies readonly PlayerDTO[]

