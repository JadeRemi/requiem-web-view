/**
 * Player class mock data
 * Configuration for class display in Wiki
 */

export type ClassDifficulty = 'Easy' | 'Mid' | 'Hard'

export interface PlayerClass {
  id: string
  name: string
  description: string
  difficulty: ClassDifficulty
  /** Path to figurine model */
  modelPath: string
  /** Scale multiplier for the model */
  scale: number
}

export interface ClassAbility {
  id: string
  classId: string
  /** Ability name, use "—" if missing */
  name: string
  /** Multi-line description with bullet points */
  description: string
  /** True if this is the main class ability (marked with ❂ in source) */
  isMainAbility: boolean
  /** Level at which this ability unlocks (1-10) */
  level: number
}

export const PLAYER_CLASSES: PlayerClass[] = [
  {
    id: 'jaeger',
    name: 'Jaeger',
    description: 'A swift hunter specializing in ranged combat and tracking prey across the realm. Masters of the bow and crossbow, Jaegers excel at picking off enemies from a distance before they can close the gap.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'ventriloquist',
    name: 'Ventriloquist',
    description: 'A mysterious manipulator who controls puppets and illusions to confuse enemies. Their decoys draw aggro while the Ventriloquist strikes from the shadows with devastating precision.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'shellguard',
    name: 'Shellguard',
    description: 'A heavily armored defender who protects allies and absorbs damage on the front lines. Their massive shields can block even the most powerful attacks while teammates deal damage safely.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'martyr',
    name: 'Martyr',
    description: 'A self-sacrificing healer who channels their own life force to mend allies. The more damage they take, the more powerful their healing becomes, making them invaluable in prolonged battles.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'seeker',
    name: 'Seeker',
    description: 'A relentless tracker who marks targets and hunts them across any distance. Once a Seeker locks onto prey, escape becomes nearly impossible as they gain bonuses the longer the chase continues.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'webber',
    name: 'Webber',
    description: 'A cunning trapper who weaves sticky webs to control the battlefield. Enemies caught in their snares become easy prey, slowed and vulnerable to coordinated team attacks.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
]

/** Classes featured on the main wiki page preview */
export const PREVIEW_CLASS_IDS = ['jaeger', 'ventriloquist', 'shellguard'] as const

/**
 * Class abilities data
 * Structure based on CSV schema:
 * - Main ability (level 1) marked with ❂ symbol in source
 * - Abilities without names use "—" as fallback
 * - Descriptions can be multi-line with bullet points
 */
export const CLASS_ABILITIES: ClassAbility[] = [
  // Example: Seeker abilities (from CSV)
  {
    id: 'seeker-1',
    classId: 'seeker',
    name: 'Golden flair',
    description: `- Loot chances roll twice
- 10% chance when opening a chest to roll additionally to fill empty slots
- Damaging a player steals 1% of their gold for each 10% of their lost max health
- Damaging a player has a 20% chance to drop a random item from their inventory (if stack > 1, if received damage > 1)
- 5% chance to keep gold
- 5% chance to keep Collectible cards
- Killing a player highlights seeker on the web map and applies glowing effect for 1 day. Player killing seeker during this period receives all the gold previously deleted from seeker's victims.`,
    isMainAbility: true,
    level: 1,
  },
  {
    id: 'seeker-2',
    classId: 'seeker',
    name: 'Avidity vision',
    description: `- All dropped items and chests gain glowing effect
- All players leave trails each 3 seconds visible for 1 minute`,
    isMainAbility: false,
    level: 2,
  },
  {
    id: 'seeker-3',
    classId: 'seeker',
    name: 'Proficient hunting',
    description: `- Killing a player has 70% chance to steal their random ability (if enemy level >= seeker level, if ability non-native)
- Unlocks inventory for stolen abilities, allows to replace any ability. Max 27 slots, replacing the oldest.`,
    isMainAbility: false,
    level: 3,
  },
  {
    id: 'seeker-4',
    classId: 'seeker',
    name: 'Carved perpetuation',
    description: '- Killing a player has 30% chance to drop their Figurine. Either inventory or level + skills are saved.',
    isMainAbility: false,
    level: 4,
  },
  // Example: Martyr abilities (from CSV)
  {
    id: 'martyr-1',
    classId: 'martyr',
    name: "Razor's Edge",
    description: `- Cannot receive healing from any source.
- Constantly taunts surrounding mobs.
- On receiving a hit (including hits negated by Block or Phase Shields), gains a Suffering token (stacking buff) for 30 seconds. Suffering has unlimited stacking.

Does not die when taking a fatal hit, instead gaining Lethal Rapture modifier.
When Lethal Rapture activates:
- All DoT effects and debuffs are dispelled, Martyr gains 3 Suffering tokens per DoT/Debuff. Cannot gain DoT effects and debuffs for the duration of Lethal Rapture.
- Dies from any HP-depleting hit.
- Gains 3 Phase Shields.
- Taunting disabled.
- Cannot gain Suffering tokens for the duration of Lethal Rapture.

Lethal Rapture lasts for 10 seconds. When it expires:
- All stacked Suffering tokens are consumed.
- Martyr recovers 5% of maximum HP per token. This effect can overheal, temporarily granting extra health.
- Martyr receives a small buff to a random stat for every token for 1 minute.
- All currently active Phase Shields are dispelled. Healing is reduced by 10% of maximum HP for each dispelled Phase Shield.`,
    isMainAbility: true,
    level: 1,
  },
  {
    id: 'martyr-2',
    classId: 'martyr',
    name: 'Unbound Virtue',
    description: `- All damage to party members within 10 blocks is redirected to Martyr.
- All DoT effects and debuffs are dispelled on party members and transferred onto the Martyr.
- When Lethal Rapture expires, healing effects and buffs are also propagated to all party members.
- Does not affect other Martyrs in the party.
- Does not work during the effect of Lethal Rapture.`,
    isMainAbility: false,
    level: 2,
  },
  {
    id: 'martyr-3',
    classId: 'martyr',
    name: 'Mortal Ward',
    description: `Grants additional effects when Lethal Rapture activates:
- Gains 2 extra Phase Shields
- Gains 33% Evasion chance and 33% Block chance`,
    isMainAbility: false,
    level: 3,
  },
  {
    id: 'martyr-4',
    classId: 'martyr',
    name: 'Righteous Penance',
    description: `- Receive 10% of damage dealt to enemies.
- Additionally receive 15% of damage dealt by other sources to the target which got attacked by Martyr in the last 5 seconds.`,
    isMainAbility: false,
    level: 4,
  },
  // Example: Webber abilities (from CSV)
  {
    id: 'webber-1',
    classId: 'webber',
    name: 'Spider engine',
    description: `- Is invisible, can move through air unaffected by gravity. Movement snaps to block grid, only allowing movement between air block centers. Cannot pass through solid blocks. Can move in 6 possible directions.
- In invincible and cannot take damage directly. Ignored by monsters. Gameplay is similar to spectator gamemode.
- Cannot pick items directly. Can directly drop them. Cannot proc abilities or benefit from armor stats.
- Has Stabilization scale, 0% to 100%.
- Main gameplay mechanic is chunk control called Domination. When on full Stabilization, entering a new chunk starts claiming it. Chunk borders are highlighted. Claiming a chunk is only possible when there are no enemies present in the chunk. Claiming a chunk depletes Stabilization to 0%. Has a menu displaying map layout of claimed chunks. Claiming may take around 1-5 minutes. Before claiming you have to consume all dropped items, get rid of all the mobs and entities.
- Enemies in a claimed chunk you are in take Periodical damage. Item drops and experience from them are automatically received by you.
- Claiming chunks resembles mechanics from Sokoban, Tron and SAMP. Abilities reference Andrew Lloyd Webber.
- Is sensitive to Positive and Negative events in current chunk. Positive events include ally healing or enemy taking damage not from you. Negative events include ally taking damage or enemy spawning. Negative event has 20% chance to deplete 1% of Stabilization. Positive event has 20% chance to restore 1% Stabilization.
- Starts game with 50% Stabilization. When on 0% Stabilization, takes damage from Negative events in unclaimed chunks.
- Negative events in claimed chunks which were not recently visited starts unclaiming them.
- Can open containers in claimed chunks. Cannot use most consumables, weapons or flasks.
- Gains a bonus from amount of claimed chunks.
- Health is replaced with Weight measured in Bytes, same ones as obtained from Datamining. Damage from Negative events is dealt towards Weight instead. Items not picked up in claimed chunks are consumed as Bytes. Higher weight increases chunk claim speed.
- Gameplay usually relies on being in a party with a non-Webber player.`,
    isMainAbility: true,
    level: 1,
  },
]

/** Get abilities for a specific class */
export const getClassAbilities = (classId: string): ClassAbility[] =>
  CLASS_ABILITIES.filter(ability => ability.classId === classId)

/** Get main ability for a class */
export const getMainAbility = (classId: string): ClassAbility | undefined =>
  CLASS_ABILITIES.find(ability => ability.classId === classId && ability.isMainAbility)

/** Get preview classes for main wiki page */
export const getPreviewClasses = (): PlayerClass[] =>
  PLAYER_CLASSES.filter(c => PREVIEW_CLASS_IDS.includes(c.id as typeof PREVIEW_CLASS_IDS[number]))
