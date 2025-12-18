/**
 * Guild mock data
 * Represents guilds table and guild_members join table
 */

/** Guild role enum */
export enum GuildRole {
  Owner = 'owner',
  Officer = 'officer',
  Member = 'member',
}

/** Guild data (guilds table) */
export interface GuildDTO {
  uuid: string
  name: string
  tag: string // Short tag like [DRK]
  description: string
  active: boolean
  createdAt: string
  disbandedAt?: string
}

/** Guild membership (guild_members table with foreign keys) */
export interface GuildMemberDTO {
  id: string
  guildUuid: string
  playerUuid: string
  role: GuildRole
  joinedAt: string
  leftAt?: string // Set when guild disbanded or player left
}

/**
 * Mock guilds - 6 total (3 active, 3 disbanded)
 */
export const MOCK_GUILDS: GuildDTO[] = [
  // Active guilds
  {
    uuid: 'g001-a1b2-c3d4-e5f6-g7h8i9j0k1l2',
    name: 'Dark Legion',
    tag: 'DRK',
    description: 'Elite warriors of the shadow realm. We conquer all.',
    active: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    uuid: 'g002-b2c3-d4e5-f6a7-h8i9j0k1l2m3',
    name: 'Frost Sentinels',
    tag: 'FST',
    description: 'Guardians of the frozen north. Honor and strength.',
    active: true,
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    uuid: 'g003-c3d4-e5f6-a7b8-i9j0k1l2m3n4',
    name: 'Phoenix Rising',
    tag: 'PHX',
    description: 'From the ashes we rise. Reborn stronger every time.',
    active: true,
    createdAt: '2024-03-10T00:00:00Z',
  },
  // Disbanded guilds
  {
    uuid: 'g004-d4e5-f6a7-b8c9-j0k1l2m3n4o5',
    name: 'Shadow Covenant',
    tag: 'SHD',
    description: 'Once the most feared guild. Now a memory.',
    active: false,
    createdAt: '2024-01-05T00:00:00Z',
    disbandedAt: '2024-09-15T00:00:00Z',
  },
  {
    uuid: 'g005-e5f6-a7b8-c9d0-k1l2m3n4o5p6',
    name: 'Iron Vanguard',
    tag: 'IRN',
    description: 'The shield that broke. Internal conflict led to collapse.',
    active: false,
    createdAt: '2024-02-01T00:00:00Z',
    disbandedAt: '2024-08-20T00:00:00Z',
  },
  {
    uuid: 'g006-f6a7-b8c9-d0e1-l2m3n4o5p6q7',
    name: 'Crimson Order',
    tag: 'CRM',
    description: 'Blood brothers united. Disbanded after mass exodus.',
    active: false,
    createdAt: '2024-04-01T00:00:00Z',
    disbandedAt: '2024-10-01T00:00:00Z',
  },
]

/**
 * Mock guild memberships
 * Uses player UUIDs from ladder.ts
 */
export const MOCK_GUILD_MEMBERS: GuildMemberDTO[] = [
  // Dark Legion - Active
  { id: 'gm001', guildUuid: 'g001-a1b2-c3d4-e5f6-g7h8i9j0k1l2', playerUuid: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', role: GuildRole.Owner, joinedAt: '2024-01-15T00:00:00Z' }, // ShadowKnight
  { id: 'gm002', guildUuid: 'g001-a1b2-c3d4-e5f6-g7h8i9j0k1l2', playerUuid: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', role: GuildRole.Officer, joinedAt: '2024-01-20T00:00:00Z' }, // CrimsonBlade
  { id: 'gm003', guildUuid: 'g001-a1b2-c3d4-e5f6-g7h8i9j0k1l2', playerUuid: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', role: GuildRole.Member, joinedAt: '2024-02-01T00:00:00Z' }, // NightHunter
  { id: 'gm004', guildUuid: 'g001-a1b2-c3d4-e5f6-g7h8i9j0k1l2', playerUuid: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', role: GuildRole.Member, joinedAt: '2024-03-15T00:00:00Z' }, // IronWolf
  { id: 'gm005', guildUuid: 'g001-a1b2-c3d4-e5f6-g7h8i9j0k1l2', playerUuid: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', role: GuildRole.Member, joinedAt: '2024-06-01T00:00:00Z' }, // StormRider

  // Frost Sentinels - Active
  { id: 'gm006', guildUuid: 'g002-b2c3-d4e5-f6a7-h8i9j0k1l2m3', playerUuid: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', role: GuildRole.Owner, joinedAt: '2024-02-20T00:00:00Z' }, // FrostMage
  { id: 'gm007', guildUuid: 'g002-b2c3-d4e5-f6a7-h8i9j0k1l2m3', playerUuid: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', role: GuildRole.Officer, joinedAt: '2024-02-25T00:00:00Z' }, // ThunderStrike
  { id: 'gm008', guildUuid: 'g002-b2c3-d4e5-f6a7-h8i9j0k1l2m3', playerUuid: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', role: GuildRole.Member, joinedAt: '2024-03-10T00:00:00Z' }, // VoidWalker
  { id: 'gm009', guildUuid: 'g002-b2c3-d4e5-f6a7-h8i9j0k1l2m3', playerUuid: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', role: GuildRole.Member, joinedAt: '2024-04-01T00:00:00Z' }, // SilverArrow

  // Phoenix Rising - Active
  { id: 'gm010', guildUuid: 'g003-c3d4-e5f6-a7b8-i9j0k1l2m3n4', playerUuid: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', role: GuildRole.Owner, joinedAt: '2024-03-10T00:00:00Z' }, // DarkPhoenix
  { id: 'gm011', guildUuid: 'g003-c3d4-e5f6-a7b8-i9j0k1l2m3n4', playerUuid: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', role: GuildRole.Officer, joinedAt: '2024-03-15T00:00:00Z' }, // BrunoBeats
  { id: 'gm012', guildUuid: 'g003-c3d4-e5f6-a7b8-i9j0k1l2m3n4', playerUuid: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', role: GuildRole.Member, joinedAt: '2024-04-20T00:00:00Z' }, // CraftMaster

  // Shadow Covenant - Disbanded
  { id: 'gm013', guildUuid: 'g004-d4e5-f6a7-b8c9-j0k1l2m3n4o5', playerUuid: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', role: GuildRole.Owner, joinedAt: '2024-01-05T00:00:00Z', leftAt: '2024-09-15T00:00:00Z' }, // TomorrowKing
  { id: 'gm014', guildUuid: 'g004-d4e5-f6a7-b8c9-j0k1l2m3n4o5', playerUuid: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', role: GuildRole.Officer, joinedAt: '2024-01-10T00:00:00Z', leftAt: '2024-09-15T00:00:00Z' }, // SpiritHunter
  { id: 'gm015', guildUuid: 'g004-d4e5-f6a7-b8c9-j0k1l2m3n4o5', playerUuid: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', role: GuildRole.Member, joinedAt: '2024-02-15T00:00:00Z', leftAt: '2024-09-15T00:00:00Z' }, // AquaWarrior
  { id: 'gm016', guildUuid: 'g004-d4e5-f6a7-b8c9-j0k1l2m3n4o5', playerUuid: 'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a', role: GuildRole.Member, joinedAt: '2024-05-01T00:00:00Z', leftAt: '2024-09-15T00:00:00Z' }, // KatStrike

  // Iron Vanguard - Disbanded
  { id: 'gm017', guildUuid: 'g005-e5f6-a7b8-c9d0-k1l2m3n4o5p6', playerUuid: 'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b', role: GuildRole.Owner, joinedAt: '2024-02-01T00:00:00Z', leftAt: '2024-08-20T00:00:00Z' }, // Philosopher
  { id: 'gm018', guildUuid: 'g005-e5f6-a7b8-c9d0-k1l2m3n4o5p6', playerUuid: 'f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c', role: GuildRole.Officer, joinedAt: '2024-02-10T00:00:00Z', leftAt: '2024-08-20T00:00:00Z' }, // ValenShadow
  { id: 'gm019', guildUuid: 'g005-e5f6-a7b8-c9d0-k1l2m3n4o5p6', playerUuid: 'a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d', role: GuildRole.Member, joinedAt: '2024-03-01T00:00:00Z', leftAt: '2024-08-20T00:00:00Z' }, // PurpleHaze

  // Crimson Order - Disbanded
  { id: 'gm020', guildUuid: 'g006-f6a7-b8c9-d0e1-l2m3n4o5p6q7', playerUuid: 'b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e', role: GuildRole.Owner, joinedAt: '2024-04-01T00:00:00Z', leftAt: '2024-10-01T00:00:00Z' }, // DinoRaider
  { id: 'gm021', guildUuid: 'g006-f6a7-b8c9-d0e1-l2m3n4o5p6q7', playerUuid: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', role: GuildRole.Officer, joinedAt: '2024-04-10T00:00:00Z', leftAt: '2024-10-01T00:00:00Z' }, // CryptLord
  { id: 'gm022', guildUuid: 'g006-f6a7-b8c9-d0e1-l2m3n4o5p6q7', playerUuid: 'd2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a', role: GuildRole.Member, joinedAt: '2024-05-15T00:00:00Z', leftAt: '2024-10-01T00:00:00Z' }, // JustBadGuy
]

/**
 * Find guild by UUID
 */
export function findGuildByUuid(guildUuid: string): GuildDTO | undefined {
  return MOCK_GUILDS.find((g) => g.uuid === guildUuid)
}

/**
 * Find player's current guild membership (active guild only)
 */
export function findPlayerGuildMembership(playerUuid: string): GuildMemberDTO | undefined {
  const membership = MOCK_GUILD_MEMBERS.find(
    (m) => m.playerUuid === playerUuid && !m.leftAt
  )
  if (!membership) return undefined

  // Check if guild is active
  const guild = findGuildByUuid(membership.guildUuid)
  if (!guild || !guild.active) return undefined

  return membership
}

/**
 * Find player's guild (active only)
 */
export function findPlayerGuild(playerUuid: string): GuildDTO | undefined {
  const membership = findPlayerGuildMembership(playerUuid)
  if (!membership) return undefined
  return findGuildByUuid(membership.guildUuid)
}

/**
 * Get all members of a guild
 */
export function getGuildMembers(guildUuid: string): GuildMemberDTO[] {
  return MOCK_GUILD_MEMBERS.filter((m) => m.guildUuid === guildUuid)
}

/**
 * Get active guilds
 */
export function getActiveGuilds(): GuildDTO[] {
  return MOCK_GUILDS.filter((g) => g.active)
}

/**
 * Get disbanded guilds
 */
export function getDisbandedGuilds(): GuildDTO[] {
  return MOCK_GUILDS.filter((g) => !g.active)
}

/**
 * Get guild role display name
 */
export function getGuildRoleLabel(role: GuildRole): string {
  const labels: Record<GuildRole, string> = {
    [GuildRole.Owner]: 'Guild Master',
    [GuildRole.Officer]: 'Officer',
    [GuildRole.Member]: 'Member',
  }
  return labels[role]
}
