/**
 * Changelog mock data
 * Simulates API response for patch notes
 *
 * API Design Notes:
 * -----------------
 * Backend stores changelog as markdown files (e.g., patches/v1.2.0.md)
 * REST endpoint: GET /api/changelog returns array of PatchDTO
 * Each patch has:
 *   - version: semantic version string
 *   - date: ISO date string
 *   - title: optional patch title/name
 *   - content: markdown string (the raw .md file content)
 *
 * Markdown conventions:
 *   - ## for section headers (e.g., ## Balance Changes)
 *   - **text** for bold/emphasis
 *   - - for bullet points (max 2 levels of nesting)
 *   - No complex markdown (tables, code blocks, etc.)
 *
 * Discord Integration:
 *   - Backend can post content to Discord webhook
 *   - Same markdown works in Discord with minor formatting
 */

/** Patch data from API */
export interface PatchDTO {
  version: string
  date: string // ISO date
  title?: string // Optional patch name
  content: string // Markdown content
}

/** Response from changelog API */
export interface ChangelogResponse {
  patches: PatchDTO[]
  lastVisit?: string // ISO date of user's last visit (if logged in)
}

/**
 * Mock patch notes content
 * In production, these would be stored as .md files on backend
 */
const PATCH_2_4_0 = `- **Plasma Rifle** base damage increased from 145 to 162, making it more viable in mid-range encounters where sustained fire is crucial for taking down heavily armored targets
- **Ion Cannon** charge time: 2.4s → 2.1s
- **Neutron Blade** critical multiplier has been adjusted from 2.2x to 2.5x to reward skillful melee gameplay and make it a competitive choice against ranged alternatives in close quarters combat
- **Graviton Launcher** projectile speed: 850 → 920 m/s
- **Exosuit Mk.IV** shield capacity: 340 → 380
- **Stealth Module** energy drain: 12/s → 9/s
- **Titanium Plating** damage reduction: 18% → 21%
- **Sentinel Drone** HP reduced to 2,150 (was 2,400) — players were finding these encounters too time-consuming without sufficient reward, this change should improve the flow of gameplay in sectors where multiple drones spawn
- **Mech Overseer** attack cooldown: 3.2s → 3.6s
- **Void Stalker** detection range: 45m → 38m`

const PATCH_2_3_2 = `- Fixed reactor core overload causing client crash
- Resolved inventory sync issues in co-op mode
- Quantum teleporter no longer clips through walls
- Memory usage reduced by ~180MB on average
- Shader compilation time: 4.2s → 2.8s
- Network tick rate: 60Hz → 128Hz for PvP zones`

const PATCH_2_3_1 = `- **Cryo Grenade** freeze duration: 3.5s → 2.8s
- **EMP Burst** cooldown: 45s → 52s
- **Nanite Swarm** healing: 85/tick → 72/tick
- **Overcharge** energy cost: 120 → 145
- Fixed achievement "First Contact" not triggering
- Corrected damage formula for armor penetration
- Resolved UI scaling on ultrawide displays`

const PATCH_2_3_0 = `- **Sector 7-G**: New endgame zone with 4 elite encounters
- **Cybernetic Implants**: 12 new augmentation slots
- **Warframe Omega**: Tier 5 exosuit with unique abilities
- Added combo meter for melee attacks (up to 5x multiplier)
- Headshot damage bonus: 1.5x → 1.75x
- Shield break stagger duration: 0.8s → 1.2s
- Scrap conversion rate: 100:1 → 85:1
- Blueprint drop chance: 2.4% → 3.1%
- Daily mission rewards increased by 15%`

const PATCH_2_2_1 = `- Server stability improvements for NA-East
- Fixed guild vault item duplication exploit
- Corrected XP calculation for group content`

const PATCH_2_2_0 = `- **Territory Wars**: Capture sectors for guild-wide bonuses
- **Guild Armory**: Shared equipment storage (500 slots)
- **Contribution Tracking**: Weekly leaderboards with rewards
- **Chrono Phantom**: New teleporting assassin enemy
- **Siege Walker**: New heavy artillery mech
- **Swarm Queen**: New enemy that spawns drone clusters
- Auto-loot range: 5m → 8m
- Inventory sorting now remembers preferences
- Added DPS meter toggle in HUD settings`

const PATCH_2_1_0 = `- Login queue capacity: 50k → 200k concurrent
- Character creation race condition fixed
- Tutorial skip option added
- Initial server infrastructure deployed across 12 regions`

/**
 * Mock changelog data
 * Sorted by date descending (newest first)
 */
export const MOCK_PATCHES: PatchDTO[] = [
  {
    version: '2.4.0',
    date: '2025-12-15T00:00:00Z',
    title: 'Arsenal Rebalance',
    content: PATCH_2_4_0,
  },
  {
    version: '2.3.2',
    date: '2025-12-10T00:00:00Z',
    content: PATCH_2_3_2,
  },
  {
    version: '2.3.1',
    date: '2025-12-05T00:00:00Z',
    content: PATCH_2_3_1,
  },
  {
    version: '2.3.0',
    date: '2025-12-01T00:00:00Z',
    title: 'Sector 7-G',
    content: PATCH_2_3_0,
  },
  {
    version: '2.2.1',
    date: '2025-11-20T00:00:00Z',
    content: PATCH_2_2_1,
  },
  {
    version: '2.2.0',
    date: '2025-11-01T00:00:00Z',
    title: 'Guild Systems',
    content: PATCH_2_2_0,
  },
  {
    version: '2.1.0',
    date: '2025-10-20T00:00:00Z',
    title: 'Launch',
    content: PATCH_2_1_0,
  },
]

/**
 * Mock last visit dates per player UUID
 * In production, this would be stored in user profile on backend
 */
export const MOCK_LAST_VISITS: Record<string, string> = {
  // ShadowKnight - visited before 1.2.0
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d': '2025-11-28T00:00:00Z',
  // CrimsonBlade - visited before 1.1.0
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e': '2025-10-25T00:00:00Z',
  // Default for other players
  default: '2025-12-01T00:00:00Z',
}

/**
 * Get last visit date for a player
 */
export function getLastVisit(playerUuid: string): string {
  return MOCK_LAST_VISITS[playerUuid] ?? MOCK_LAST_VISITS['default']!
}

/**
 * Get patches since a given date
 */
export function getPatchesSinceDate(date: string): PatchDTO[] {
  const sinceDate = new Date(date)
  return MOCK_PATCHES.filter((patch) => new Date(patch.date) > sinceDate)
}

/**
 * Mock API response
 */
export function fetchChangelog(playerUuid?: string): ChangelogResponse {
  const response: ChangelogResponse = {
    patches: MOCK_PATCHES,
  }
  if (playerUuid) {
    response.lastVisit = getLastVisit(playerUuid)
  }
  return response
}
