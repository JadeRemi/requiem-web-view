import { MOCK_PLAYERS } from './ladder'

/**
 * Purchase item types
 */
export type PurchaseItemCode =
  | 'coins-30'
  | 'coins-100'
  | 'coins-300'
  | 'class-architect'
  | 'class-eternal'
  | 'dynmap-enhanced'
  | 'vault-slot'
  | 'class-slot'
  | 'custom-nickname'
  | 'boosters'
  | 'daily-lootbox'

/**
 * Human-readable names for purchase items
 */
export const PURCHASE_ITEM_NAMES: Record<PurchaseItemCode, string> = {
  'coins-30': '+30 Qreds',
  'coins-100': '+100 Qreds',
  'coins-300': '+300 Qreds',
  'class-architect': 'Architect Class',
  'class-eternal': 'Eternal Class',
  'dynmap-enhanced': 'Enhanced Dynmap',
  'vault-slot': 'Vault Tab Slot',
  'class-slot': 'Active Class Slot',
  'custom-nickname': 'Custom Nickname',
  'boosters': 'Short-term Boosters',
  'daily-lootbox': 'Daily Lootbox',
}

/**
 * Purchase entry - can be anonymous or have user info
 */
export interface PurchaseEntry {
  id: string
  itemCode: PurchaseItemCode
  timestamp: string
  /** If null, the purchase is anonymous */
  uuid: string | null
}

/**
 * Mock purchase data - 60 entries
 * Some are anonymous (uuid: null), some have real player data
 */
export const MOCK_PURCHASES: PurchaseEntry[] = [
  { id: 'pur001', itemCode: 'coins-100', timestamp: '2025-12-21T10:30:00Z', uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
  { id: 'pur002', itemCode: 'class-architect', timestamp: '2025-12-21T10:15:00Z', uuid: null },
  { id: 'pur003', itemCode: 'coins-30', timestamp: '2025-12-21T10:00:00Z', uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e' },
  { id: 'pur004', itemCode: 'vault-slot', timestamp: '2025-12-21T09:45:00Z', uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f' },
  { id: 'pur005', itemCode: 'coins-300', timestamp: '2025-12-21T09:30:00Z', uuid: null },
  { id: 'pur006', itemCode: 'class-eternal', timestamp: '2025-12-21T09:15:00Z', uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a' },
  { id: 'pur007', itemCode: 'boosters', timestamp: '2025-12-21T09:00:00Z', uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b' },
  { id: 'pur008', itemCode: 'coins-100', timestamp: '2025-12-21T08:45:00Z', uuid: null },
  { id: 'pur009', itemCode: 'dynmap-enhanced', timestamp: '2025-12-21T08:30:00Z', uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c' },
  { id: 'pur010', itemCode: 'coins-30', timestamp: '2025-12-21T08:15:00Z', uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d' },
  { id: 'pur011', itemCode: 'custom-nickname', timestamp: '2025-12-21T08:00:00Z', uuid: null },
  { id: 'pur012', itemCode: 'coins-100', timestamp: '2025-12-21T07:45:00Z', uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e' },
  { id: 'pur013', itemCode: 'class-slot', timestamp: '2025-12-21T07:30:00Z', uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f' },
  { id: 'pur014', itemCode: 'coins-300', timestamp: '2025-12-21T07:15:00Z', uuid: null },
  { id: 'pur015', itemCode: 'daily-lootbox', timestamp: '2025-12-21T07:00:00Z', uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a' },
  { id: 'pur016', itemCode: 'coins-30', timestamp: '2025-12-20T23:30:00Z', uuid: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b' },
  { id: 'pur017', itemCode: 'class-architect', timestamp: '2025-12-20T22:45:00Z', uuid: null },
  { id: 'pur018', itemCode: 'coins-100', timestamp: '2025-12-20T22:00:00Z', uuid: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c' },
  { id: 'pur019', itemCode: 'vault-slot', timestamp: '2025-12-20T21:15:00Z', uuid: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d' },
  { id: 'pur020', itemCode: 'coins-30', timestamp: '2025-12-20T20:30:00Z', uuid: null },
  { id: 'pur021', itemCode: 'class-eternal', timestamp: '2025-12-20T19:45:00Z', uuid: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e' },
  { id: 'pur022', itemCode: 'boosters', timestamp: '2025-12-20T19:00:00Z', uuid: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f' },
  { id: 'pur023', itemCode: 'coins-300', timestamp: '2025-12-20T18:15:00Z', uuid: null },
  { id: 'pur024', itemCode: 'dynmap-enhanced', timestamp: '2025-12-20T17:30:00Z', uuid: 'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a' },
  { id: 'pur025', itemCode: 'coins-100', timestamp: '2025-12-20T16:45:00Z', uuid: 'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b' },
  { id: 'pur026', itemCode: 'custom-nickname', timestamp: '2025-12-20T16:00:00Z', uuid: null },
  { id: 'pur027', itemCode: 'coins-30', timestamp: '2025-12-20T15:15:00Z', uuid: 'f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c' },
  { id: 'pur028', itemCode: 'class-slot', timestamp: '2025-12-20T14:30:00Z', uuid: 'a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d' },
  { id: 'pur029', itemCode: 'coins-100', timestamp: '2025-12-20T13:45:00Z', uuid: null },
  { id: 'pur030', itemCode: 'daily-lootbox', timestamp: '2025-12-20T13:00:00Z', uuid: 'b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e' },
  { id: 'pur031', itemCode: 'coins-300', timestamp: '2025-12-20T12:15:00Z', uuid: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f' },
  { id: 'pur032', itemCode: 'class-architect', timestamp: '2025-12-20T11:30:00Z', uuid: null },
  { id: 'pur033', itemCode: 'coins-30', timestamp: '2025-12-20T10:45:00Z', uuid: 'd2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a' },
  { id: 'pur034', itemCode: 'vault-slot', timestamp: '2025-12-20T10:00:00Z', uuid: 'e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b' },
  { id: 'pur035', itemCode: 'coins-100', timestamp: '2025-12-20T09:15:00Z', uuid: null },
  { id: 'pur036', itemCode: 'class-eternal', timestamp: '2025-12-20T08:30:00Z', uuid: 'f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c' },
  { id: 'pur037', itemCode: 'boosters', timestamp: '2025-12-20T07:45:00Z', uuid: 'a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d' },
  { id: 'pur038', itemCode: 'coins-300', timestamp: '2025-12-20T07:00:00Z', uuid: null },
  { id: 'pur039', itemCode: 'dynmap-enhanced', timestamp: '2025-12-20T06:15:00Z', uuid: 'b6c7d8e9-f0a1-4b2c-3d4e-5f6a7b8c9d0e' },
  { id: 'pur040', itemCode: 'coins-30', timestamp: '2025-12-19T23:30:00Z', uuid: 'c7d8e9f0-a1b2-4c3d-4e5f-6a7b8c9d0e1f' },
  { id: 'pur041', itemCode: 'custom-nickname', timestamp: '2025-12-19T22:45:00Z', uuid: null },
  { id: 'pur042', itemCode: 'coins-100', timestamp: '2025-12-19T22:00:00Z', uuid: 'd8e9f0a1-b2c3-4d4e-5f6a-7b8c9d0e1f2a' },
  { id: 'pur043', itemCode: 'class-slot', timestamp: '2025-12-19T21:15:00Z', uuid: 'e9f0a1b2-c3d4-4e5f-6a7b-8c9d0e1f2a3b' },
  { id: 'pur044', itemCode: 'coins-30', timestamp: '2025-12-19T20:30:00Z', uuid: null },
  { id: 'pur045', itemCode: 'daily-lootbox', timestamp: '2025-12-19T19:45:00Z', uuid: 'f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c' },
  { id: 'pur046', itemCode: 'coins-300', timestamp: '2025-12-19T19:00:00Z', uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d' },
  { id: 'pur047', itemCode: 'class-architect', timestamp: '2025-12-19T18:15:00Z', uuid: null },
  { id: 'pur048', itemCode: 'coins-100', timestamp: '2025-12-19T17:30:00Z', uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e' },
  { id: 'pur049', itemCode: 'vault-slot', timestamp: '2025-12-19T16:45:00Z', uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f' },
  { id: 'pur050', itemCode: 'coins-30', timestamp: '2025-12-19T16:00:00Z', uuid: null },
  { id: 'pur051', itemCode: 'class-eternal', timestamp: '2025-12-19T15:15:00Z', uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a' },
  { id: 'pur052', itemCode: 'boosters', timestamp: '2025-12-19T14:30:00Z', uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0b' },
  { id: 'pur053', itemCode: 'coins-100', timestamp: '2025-12-19T13:45:00Z', uuid: null },
  { id: 'pur054', itemCode: 'dynmap-enhanced', timestamp: '2025-12-19T13:00:00Z', uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1c' },
  { id: 'pur055', itemCode: 'coins-300', timestamp: '2025-12-19T12:15:00Z', uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2d' },
  { id: 'pur056', itemCode: 'custom-nickname', timestamp: '2025-12-19T11:30:00Z', uuid: null },
  { id: 'pur057', itemCode: 'coins-30', timestamp: '2025-12-19T10:45:00Z', uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e' },
  { id: 'pur058', itemCode: 'class-slot', timestamp: '2025-12-19T10:00:00Z', uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4f' },
  { id: 'pur059', itemCode: 'coins-100', timestamp: '2025-12-19T09:15:00Z', uuid: null },
  { id: 'pur060', itemCode: 'daily-lootbox', timestamp: '2025-12-19T08:30:00Z', uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5a' },
]

/**
 * Get player info by UUID from mock data
 */
export function getPlayerByUuid(uuid: string) {
  return MOCK_PLAYERS.find(p => p.uuid === uuid)
}
