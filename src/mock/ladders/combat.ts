/**
 * Combat Ladder Data
 * Player PvP and PvE combat statistics
 */

export interface CombatLadderEntry {
  uuid: string
  pvpKills: number
  pveKills: number
  duelRank: number
  murderRank: number
  dps: number
  deaths: number
}

/**
 * Combat Ladder - sorted by combined combat score (pvpKills * 10 + pveKills)
 */
export const COMBAT_LADDER: CombatLadderEntry[] = [
  { uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', pvpKills: 1248, pveKills: 8742, duelRank: 2, murderRank: 1, dps: 2847, deaths: 352 },
  { uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', pvpKills: 1156, pveKills: 5123, duelRank: 1, murderRank: 4, dps: 3124, deaths: 267 },
  { uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', pvpKills: 687, pveKills: 15234, duelRank: 8, murderRank: 6, dps: 1987, deaths: 498 },
  { uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', pvpKills: 876, pveKills: 12456, duelRank: 5, murderRank: 3, dps: 2234, deaths: 472 },
  { uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', pvpKills: 1089, pveKills: 7234, duelRank: 3, murderRank: 2, dps: 2654, deaths: 423 },
  { uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', pvpKills: 612, pveKills: 11234, duelRank: 9, murderRank: 5, dps: 2123, deaths: 734 },
  { uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', pvpKills: 934, pveKills: 9876, duelRank: 4, murderRank: 7, dps: 2456, deaths: 419 },
  { uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', pvpKills: 978, pveKills: 4567, duelRank: 6, murderRank: 8, dps: 2789, deaths: 343 },
  { uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', pvpKills: 823, pveKills: 6789, duelRank: 7, murderRank: 9, dps: 2345, deaths: 526 },
  { uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', pvpKills: 745, pveKills: 8234, duelRank: 10, murderRank: 10, dps: 2678, deaths: 856 },
  { uuid: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', pvpKills: 423, pveKills: 6234, duelRank: 15, murderRank: 11, dps: 1845, deaths: 512 },
  { uuid: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', pvpKills: 289, pveKills: 7123, duelRank: 19, murderRank: 12, dps: 1678, deaths: 634 },
  { uuid: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', pvpKills: 345, pveKills: 9234, duelRank: 17, murderRank: 14, dps: 1534, deaths: 723 },
  { uuid: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', pvpKills: 567, pveKills: 5432, duelRank: 12, murderRank: 13, dps: 2012, deaths: 489 },
  { uuid: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', pvpKills: 612, pveKills: 4567, duelRank: 11, murderRank: 15, dps: 2234, deaths: 398 },
  { uuid: 'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b', pvpKills: 456, pveKills: 6789, duelRank: 14, murderRank: 17, dps: 1923, deaths: 534 },
  { uuid: 'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a', pvpKills: 234, pveKills: 5678, duelRank: 20, murderRank: 16, dps: 1756, deaths: 567 },
  { uuid: 'a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d', pvpKills: 523, pveKills: 3987, duelRank: 13, murderRank: 19, dps: 1867, deaths: 412 },
  { uuid: 'f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c', pvpKills: 178, pveKills: 4321, duelRank: 21, murderRank: 18, dps: 1423, deaths: 845 },
  { uuid: 'b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e', pvpKills: 312, pveKills: 5234, duelRank: 18, murderRank: 20, dps: 1654, deaths: 456 },
  { uuid: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', pvpKills: 389, pveKills: 3456, duelRank: 16, murderRank: 21, dps: 1712, deaths: 523 },
  { uuid: 'd2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a', pvpKills: 156, pveKills: 2987, duelRank: 25, murderRank: 22, dps: 1234, deaths: 678 },
  { uuid: 'e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b', pvpKills: 445, pveKills: 4123, duelRank: 22, murderRank: 23, dps: 1567, deaths: 534 },
  { uuid: 'f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c', pvpKills: 378, pveKills: 3567, duelRank: 23, murderRank: 24, dps: 1489, deaths: 445 },
  { uuid: 'b6c7d8e9-f0a1-4b2c-3d4e-5f6a7b8c9d0e', pvpKills: 567, pveKills: 2890, duelRank: 20, murderRank: 26, dps: 1678, deaths: 623 },
  { uuid: 'a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d', pvpKills: 234, pveKills: 2456, duelRank: 26, murderRank: 25, dps: 1345, deaths: 567 },
  { uuid: 'c7d8e9f0-a1b2-4c3d-4e5f-6a7b8c9d0e1f', pvpKills: 289, pveKills: 3234, duelRank: 24, murderRank: 27, dps: 1423, deaths: 412 },
  { uuid: 'd8e9f0a1-b2c3-4d4e-5f6a-7b8c9d0e1f2a', pvpKills: 178, pveKills: 2123, duelRank: 28, murderRank: 28, dps: 1234, deaths: 534 },
  { uuid: 'e9f0a1b2-c3d4-4e5f-6a7b-8c9d0e1f2a3b', pvpKills: 345, pveKills: 1987, duelRank: 21, murderRank: 29, dps: 1567, deaths: 389 },
  { uuid: 'f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', pvpKills: 212, pveKills: 2345, duelRank: 27, murderRank: 30, dps: 1345, deaths: 467 },
  { uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', pvpKills: 156, pveKills: 1756, duelRank: 29, murderRank: 31, dps: 1123, deaths: 523 },
  { uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', pvpKills: 289, pveKills: 1567, duelRank: 32, murderRank: 32, dps: 1289, deaths: 378 },
  { uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', pvpKills: 134, pveKills: 1345, duelRank: 30, murderRank: 33, dps: 1067, deaths: 456 },
  { uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', pvpKills: 178, pveKills: 1234, duelRank: 31, murderRank: 34, dps: 1189, deaths: 345 },
  { uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0b', pvpKills: 98, pveKills: 1123, duelRank: 35, murderRank: 35, dps: 978, deaths: 567 },
  { uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1c', pvpKills: 156, pveKills: 987, duelRank: 32, murderRank: 36, dps: 1056, deaths: 312 },
  { uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2d', pvpKills: 112, pveKills: 1056, duelRank: 34, murderRank: 37, dps: 934, deaths: 423 },
  { uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e', pvpKills: 145, pveKills: 876, duelRank: 33, murderRank: 38, dps: 1012, deaths: 289 },
  { uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4f', pvpKills: 78, pveKills: 756, duelRank: 36, murderRank: 39, dps: 867, deaths: 345 },
  { uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5a', pvpKills: 56, pveKills: 645, duelRank: 37, murderRank: 40, dps: 789, deaths: 267 },
]
