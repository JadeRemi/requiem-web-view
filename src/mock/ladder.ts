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
    killRate: 0.78,
    firstJoined: '2024-03-15T00:00:00Z',
    lastActive: '2025-12-04T10:30:00Z',
  },
  {
    id: 'p002',
    username: 'CrimsonBlade',
    score: 26890,
    rank: 2,
    killRate: 0.72,
    firstJoined: '2024-05-22T00:00:00Z',
    lastActive: '2025-12-04T09:15:00Z',
  },
  {
    id: 'p003',
    username: 'NightHunter',
    score: 24120,
    rank: 3,
    killRate: 0.65,
    firstJoined: '2024-01-08T00:00:00Z',
    lastActive: '2025-12-03T22:45:00Z',
  },
  {
    id: 'p004',
    username: 'IronWolf',
    score: 22780,
    rank: 4,
    killRate: 0.81,
    firstJoined: '2024-07-30T00:00:00Z',
    lastActive: '2025-12-04T11:00:00Z',
  },
  {
    id: 'p005',
    username: 'StormRider',
    score: 21340,
    rank: 5,
    killRate: 0.69,
    firstJoined: '2024-02-14T00:00:00Z',
    lastActive: '2025-12-04T08:20:00Z',
  },
  {
    id: 'p006',
    username: 'FrostMage',
    score: 19870,
    rank: 6,
    killRate: 0.58,
    firstJoined: '2023-11-20T00:00:00Z',
    lastActive: '2025-12-03T18:30:00Z',
  },
  {
    id: 'p007',
    username: 'ThunderStrike',
    score: 18920,
    rank: 7,
    killRate: 0.61,
    firstJoined: '2024-04-05T00:00:00Z',
    lastActive: '2025-12-04T07:45:00Z',
  },
  {
    id: 'p008',
    username: 'VoidWalker',
    score: 17450,
    rank: 8,
    killRate: 0.74,
    firstJoined: '2024-09-12T00:00:00Z',
    lastActive: '2025-12-03T20:10:00Z',
  },
  {
    id: 'p009',
    username: 'SilverArrow',
    score: 16280,
    rank: 9,
    killRate: 0.55,
    firstJoined: '2024-06-18T00:00:00Z',
    lastActive: '2025-12-04T06:30:00Z',
  },
  {
    id: 'p010',
    username: 'DarkPhoenix',
    score: 15120,
    rank: 10,
    killRate: 0.63,
    firstJoined: '2024-08-25T00:00:00Z',
    lastActive: '2025-12-03T15:00:00Z',
  },
] as const satisfies readonly PlayerDTO[]

