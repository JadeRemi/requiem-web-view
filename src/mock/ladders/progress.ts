/**
 * Progress Ladder Data
 * Player progression statistics
 */

export interface ProgressLadderEntry {
  uuid: string
  achievements: number
  totalExp: number
  totalGold: number
  totalQuests: number
}

/**
 * Progress Ladder - sorted by total achievements (descending)
 */
export const PROGRESS_LADDER: ProgressLadderEntry[] = [
  { uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', achievements: 61, totalExp: 1256890, totalGold: 189450, totalQuests: 234 },
  { uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', achievements: 52, totalExp: 1024780, totalGold: 156320, totalQuests: 198 },
  { uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', achievements: 48, totalExp: 967230, totalGold: 134560, totalQuests: 187 },
  { uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', achievements: 47, totalExp: 892450, totalGold: 125840, totalQuests: 176 },
  { uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', achievements: 43, totalExp: 845670, totalGold: 112890, totalQuests: 165 },
  { uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', achievements: 39, totalExp: 756230, totalGold: 98720, totalQuests: 154 },
  { uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', achievements: 35, totalExp: 623450, totalGold: 78920, totalQuests: 143 },
  { uuid: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', achievements: 33, totalExp: 534210, totalGold: 78450, totalQuests: 132 },
  { uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', achievements: 31, totalExp: 678450, totalGold: 89670, totalQuests: 121 },
  { uuid: 'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b', achievements: 29, totalExp: 378900, totalGold: 56780, totalQuests: 118 },
  { uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', achievements: 28, totalExp: 534120, totalGold: 67450, totalQuests: 109 },
  { uuid: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', achievements: 27, totalExp: 412340, totalGold: 54320, totalQuests: 98 },
  { uuid: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', achievements: 24, totalExp: 456780, totalGold: 67890, totalQuests: 87 },
  { uuid: 'a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d', achievements: 23, totalExp: 312450, totalGold: 41230, totalQuests: 76 },
  { uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', achievements: 22, totalExp: 412890, totalGold: 54320, totalQuests: 65 },
  { uuid: 'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a', achievements: 21, totalExp: 345670, totalGold: 43210, totalQuests: 54 },
  { uuid: 'b6c7d8e9-f0a1-4b2c-3d4e-5f6a7b8c9d0e', achievements: 20, totalExp: 267890, totalGold: 38900, totalQuests: 48 },
  { uuid: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', achievements: 19, totalExp: 387650, totalGold: 45230, totalQuests: 43 },
  { uuid: 'e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b', achievements: 18, totalExp: 234560, totalGold: 34560, totalQuests: 38 },
  { uuid: 'b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e', achievements: 17, totalExp: 267890, totalGold: 35670, totalQuests: 34 },
  { uuid: 'f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c', achievements: 16, totalExp: 198450, totalGold: 28900, totalQuests: 31 },
  { uuid: 'f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c', achievements: 15, totalExp: 198760, totalGold: 28940, totalQuests: 28 },
  { uuid: 'e9f0a1b2-c3d4-4e5f-6a7b-8c9d0e1f2a3b', achievements: 15, totalExp: 167890, totalGold: 24560, totalQuests: 25 },
  { uuid: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', achievements: 14, totalExp: 187650, totalGold: 29870, totalQuests: 22 },
  { uuid: 'a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d', achievements: 13, totalExp: 145670, totalGold: 21340, totalQuests: 19 },
  { uuid: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', achievements: 12, totalExp: 234560, totalGold: 32450, totalQuests: 17 },
  { uuid: 'c7d8e9f0-a1b2-4c3d-4e5f-6a7b8c9d0e1f', achievements: 12, totalExp: 134560, totalGold: 19870, totalQuests: 15 },
  { uuid: 'd2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a', achievements: 11, totalExp: 156780, totalGold: 23450, totalQuests: 13 },
  { uuid: 'f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', achievements: 11, totalExp: 123450, totalGold: 18340, totalQuests: 11 },
  { uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', achievements: 10, totalExp: 109870, totalGold: 14560, totalQuests: 9 },
  { uuid: 'd8e9f0a1-b2c3-4d4e-5f6a-7b8c9d0e1f2a', achievements: 9, totalExp: 112340, totalGold: 15670, totalQuests: 8 },
  { uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', achievements: 8, totalExp: 98760, totalGold: 12890, totalQuests: 7 },
  { uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1c', achievements: 8, totalExp: 54320, totalGold: 7890, totalQuests: 6 },
  { uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', achievements: 7, totalExp: 87650, totalGold: 10890, totalQuests: 5 },
  { uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', achievements: 6, totalExp: 76540, totalGold: 9870, totalQuests: 4 },
  { uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e', achievements: 6, totalExp: 32100, totalGold: 5670, totalQuests: 4 },
  { uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0b', achievements: 5, totalExp: 65430, totalGold: 8560, totalQuests: 3 },
  { uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2d', achievements: 4, totalExp: 43210, totalGold: 6780, totalQuests: 2 },
  { uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4f', achievements: 3, totalExp: 21890, totalGold: 4560, totalQuests: 1 },
  { uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5a', achievements: 2, totalExp: 12340, totalGold: 3450, totalQuests: 1 },
]
