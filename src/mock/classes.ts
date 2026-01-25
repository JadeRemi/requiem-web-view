/**
 * Player class mock data
 * Configuration for class display in Wiki
 * Data extracted from REQ ABILITIES - Classes.csv
 */

export type ClassDifficulty = 'Easy' | 'Mid' | 'Hard'

export interface PlayerClass {
  id: string
  name: string
  /** Short description derived from main ability mechanics */
  description: string
  difficulty: ClassDifficulty
  /** Path to figurine model */
  modelPath: string
  /** Scale multiplier for the model */
  scale: number
}

/**
 * All player classes from the game
 * Order matches the CSV spreadsheet
 */
export const PLAYER_CLASSES: PlayerClass[] = [
  // Row 1-10
  {
    id: 'seeker',
    name: 'Seeker',
    description: 'A treasure hunter who rolls loot chances twice and can steal gold and items from other players. Killing a Seeker during their glowing bounty period rewards the killer with all accumulated stolen gold.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'ventriloquist',
    name: 'Ventriloquist',
    description: 'A summoner who shares positive effects with minions and cleanses them of debuffs. Limited to melee damage only, but can raise Driven minions from slain enemies.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'artificer',
    name: 'Artificer',
    description: 'A crafting specialist who can bypass locked recipes if they already own the item. Creates Observers, Sketches to copy equipment, and Concentrators to upgrade weapons.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'custodian',
    name: 'Custodian',
    description: 'An invincible protector bound to a powerful Familiar. The Custodian cannot deal damage directly but commands a Wither skeleton with 10x equipment damage. If the Familiar dies, so does the Custodian.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'prowler',
    name: 'Prowler',
    description: 'The default starting class that cannot be removed or traded. Drops equipment and loses levels on death. Figurines found always contain Prowler abilities with randomized values.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'warped',
    name: 'Warped',
    description: 'A corruption spreader who infects equipment with the Warp modifier, slowly destroying item stats. Completely Warpproof themselves, with a chance to corrupt chests and other players\' gear.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'inspirer',
    name: 'Inspirer',
    description: 'A support class that Guards nearby allies, sharing regeneration stats and granting bonus HP over time. Cannot kill enemies directly, leaving them at 1 HP instead.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'shellguard',
    name: 'Shellguard',
    description: 'An adaptive tank that gains Scales when hit repeatedly by the same damage type, reducing incoming damage up to 100%. Trades mobility for 100% accuracy and infinite buff durations.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'devourer',
    name: 'Devourer',
    description: 'A vampiric predator who must drink Blood from gibbed enemies to survive. Burns in sunlight, cannot eat normal food, and loses health and power without regular feeding.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'herbalist',
    name: 'Herbalist',
    description: 'A nature-attuned class that consumes plants to maintain Satiation, gaining speed bonuses. Can turn invisible when not in combat and deals bonus damage from stealth.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  // Row 11-20
  {
    id: 'mechanite',
    name: 'Mechanite',
    description: 'A robotic class equipped with permanent Mechanical armor upgradable with Mecha Shards. The only class able to install Casings, special inventory items that provide unique bonuses.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'jaeger',
    name: 'Jaeger',
    description: 'A ranged specialist with 50% increased ranged accuracy but 80% reduced melee accuracy. Excels at long-distance combat with damage scaling based on target distance and level.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'scourger',
    name: 'Scourger',
    description: 'A self-harming berserker who spends life instead of power for abilities. Regenerates 2% max life per second and reflects damage to attackers. Unarmed attacks deal 500% of current health.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'pretorian',
    name: 'Pretorian',
    description: 'A totem-wielding warrior with an Ancestor totem that creates a protective aura. Deals no damage and takes 10x damage when away from the placed totem.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'twin',
    name: 'Twin',
    description: 'A duelist accompanied by a Reflection clone that shares equipment and stats. Both share a combined health pool, dying simultaneously. The Reflection mirrors combat actions.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'darer',
    name: 'Darer',
    description: 'A high-risk gambler who cannot deal or take normal damage. Instead, all damage rolls for instant death based on the damage ratio to max HP. Immune to Colossal damage.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'voidborn',
    name: 'Voidborn',
    description: 'A shapeshifter who replicates the appearance of nearby players after one minute. Keeps the disguise indefinitely and drops their own figurine with full inventory on death.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'grained',
    name: 'Grained',
    description: 'A fragile survivor with permanently 1 maximum health that cannot be overcapped. Must rely entirely on avoidance and other defensive mechanics to survive.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'fallen',
    name: 'Fallen',
    description: 'A cursed class where abilities start as powerful debuffs until max level, when they transform into positive effects. Modified figurines gain additional max levels on death.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'purist',
    name: 'Purist',
    description: 'A time-limited class with a 10-minute survival timer extended by killing enemies. Has no attack cooldown, double diagonal speed, and enters berserk mode when healing past 50% HP.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  // Row 21-30
  {
    id: 'tinkerer',
    name: 'Tinkerer',
    description: 'A drone commander who crafts and controls up to 4 Swarmers. These flying minions attack automatically and create chain explosions when destroyed.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'martyr',
    name: 'Martyr',
    description: 'A self-sacrificing tank who cannot heal but gains Suffering tokens when hit. Upon fatal damage, enters Lethal Rapture instead of dying, consuming tokens to heal and buff afterwards.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'sworn',
    name: 'Sworn',
    description: 'A restricted monk with most inventory slots locked by Fetters. Unlocks armor slots at specific levels and gains bonuses per remaining Fetter.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'unity',
    name: 'Unity',
    description: 'A collective class where all Unity players share health and power pools. If one dies, all die. Connected Unity players receive powerful stat bonuses and damage immunity.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'rider',
    name: 'Rider',
    description: 'A mounted cavalry class that cannot dismount. Shares health with the mount, which gains damage and size per level. Mount and rider have independent defensive stats.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'gilt',
    name: 'Gilt',
    description: 'A wealth-based class where gold serves as maximum health. Must deal 1000x current health in damage before gold can drop from enemies. The only source of gold coins in the game.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'blaster',
    name: 'Blaster',
    description: 'An explosive mining specialist focused on ore extraction and area damage. Creates chain explosions and excels at resource gathering in underground environments.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'pinned',
    name: 'Pinned',
    description: 'An immobile sniper who cannot move normally but teleports via thrown Dart projectiles. Movement speed bonuses apply to Dart cooldown reduction instead.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'bloomwane',
    name: 'Bloomwane',
    description: 'A decaying artist whose items are time-bound and disappear. Starts with 1000 health that can only decrease, never heal. Themed around creativity and painting.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'gazer',
    name: 'Gazer',
    description: 'An astrologer signed by a constellation that determines ability upgrades. Wears mysterious Starmor with hidden stats and gains bonuses from stargazing at high altitudes.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  // Row 31-40
  {
    id: 'maven',
    name: 'Maven',
    description: 'A skill-based learner who permanently gains Intelligence from killing stronger enemies. Each Intelligence point grants power, damage, and crit bonuses.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'meatheap',
    name: 'Meatheap',
    description: 'A non-humanoid slime monster with no levels, armor, or abilities. Grows in Mass by killing, increasing size, health, and damage. Extremely vulnerable to fire.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'bulwark',
    name: 'Bulwark',
    description: 'A shield specialist with a permanent blank shield that absorbs stats from other shields. Cannot use weapons but has 100% crit chance.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'elixist',
    name: 'Elixist',
    description: 'A flask-dependent alchemist with abilities focused on potion bonuses and brewing speed. Can consume flasks for permanent effects.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'webber',
    name: 'Webber',
    description: 'An invisible spectator-like class that claims chunks through Domination. Cannot be damaged directly, gains bonuses from claimed territory, and uses Weight instead of health.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'foreseer',
    name: 'Foreseer',
    description: 'A time traveler who can visit past and future temporal zones using Seer tokens. Explores predetermined seeds and encounters Remnants of recorded players.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'albino',
    name: 'Albino',
    description: 'A cold-themed class that builds Temperature in freezing conditions to spawn an Astral body. Controls the illusion clone while the original body remains vulnerable.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'reject',
    name: 'Reject / Malice',
    description: 'A debuffer who applies Rejection to enemies, giving them negative versions of your positive stats. Aura and hit-based application with scaling effectiveness.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'hive',
    name: 'Hive',
    description: 'A non-humanoid swarm class composed of insects. Uses collective behavior and area control mechanics.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'experimenter',
    name: 'Experimenter',
    description: 'A unique class where players choose their own 10 abilities from an Orphaned pool. The only source of Anomalous quality items with unusual stats.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  // Row 41-51
  {
    id: 'eternal',
    name: 'Eternal',
    description: 'A donate-only spectator class with permanent godmode and flight. Cannot interact with gameplay, pick items, or deal damage. Used for observation only.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'esper',
    name: 'Esper',
    description: 'A psychic accompanied by a floating Palm that defends and attacks automatically. Uses Psyche as resource, with defensive stats converting to Psyche conservation. Touch damage bypasses armor.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'stomper',
    name: 'Stomper',
    description: 'A movement-based class that creates damaging Stomps with each step. Takes damage when stationary and cannot use right-click actions. Speed increases Stomp damage.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'starcore',
    name: 'Starcore',
    description: 'A fire-immune class that burns constantly with 100% Burn chance. Maintains Temperature that affects Burn damage, becoming Faded and powerless if it reaches zero.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'hewer',
    name: 'Hewer',
    description: 'A delayed damage class with Suppress that records incoming damage over time. Survives if recorded damage stays below max health when Suppress ends. All attacks have splash damage.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'A support class that creates unique Perpetual consumables via crafting. Can share these items with others but cannot use their own creations.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'cadaver',
    name: 'Cadaver',
    description: 'An undead class with negative Health that dies at zero. Incoming damage pushes health further negative, with recouping regeneration trying to return to -100 baseline.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'fused',
    name: 'Fused',
    description: 'A power-focused class where max health equals max power. Gains permanent max power from kills but loses it from hits. Cannot exceed base movement speed.',
    difficulty: 'Hard',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'architect',
    name: 'Architect',
    description: 'A donate-only creative mode class locked to Workshop world. Has building capabilities but cannot interact with normal gameplay.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'archivist',
    name: 'Archivist',
    description: 'A tome-wielding scholar who collects Pages to fill their Chronicle. Pages grant specific conditional stat bonuses. Burn damage can corrupt the Tome.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'mummy',
    name: 'Mummy',
    description: 'An embalmed class that converts armor into Wrappings at special stations. Cannot heal normally but gains durability in dark underground areas. Survives fatal damage while Wrappings have durability.',
    difficulty: 'Mid',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'ayum',
    name: 'Ayum',
    description: 'A unique master who manually casts 35 active abilities by combining 4 Aspects in different sequences. Each combination of colored Aspects creates different spell effects, with 200 possible outcomes.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'escapee',
    name: 'Escapee',
    description: 'A headless fugitive constantly chased by an unkillable mechanical spider called Skullower. Must maintain constant movement as the Skullower instantly kills on contact.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'sealanthe',
    name: 'Sealanthe',
    description: 'A talisman master who places ofuda Seals on block surfaces as traps and buffs. Cannot use weapons but creates circuit-based drawings that trigger various effects.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'savant',
    name: 'Savant',
    description: 'A gifted observer with 100% chance to proc offensive mechanics. Can only gain experience from rare Sparknodes scattered across the world. Abilities reroll on every level up.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
  {
    id: 'phalanx',
    name: 'Phalanx',
    description: 'A disciplined soldier themed around army tactics and brutal warfare. Wields roman shield and spear in heavy armor.',
    difficulty: 'Easy',
    modelPath: '/models/items/figurine.glb',
    scale: 1.0,
  },
]

/** Get N random preview classes (shuffled based on current date for variety) */
export const getPreviewClasses = (count: number = 3): PlayerClass[] => {
  const today = new Date().toDateString()
  let seed = 0
  for (let i = 0; i < today.length; i++) {
    seed = ((seed << 5) - seed) + today.charCodeAt(i)
    seed = seed & seed
  }

  const shuffled = [...PLAYER_CLASSES].sort((a, b) => {
    const hashA = ((seed << 5) - seed) + a.id.charCodeAt(0)
    const hashB = ((seed << 5) - seed) + b.id.charCodeAt(0)
    return hashA - hashB
  })

  return shuffled.slice(0, count)
}

/** Get class by ID */
export const getClassById = (id: string): PlayerClass | undefined =>
  PLAYER_CLASSES.find(c => c.id === id)

/** Get a random class based on a seed (for consistent player-class assignment) */
export const getRandomClassForPlayer = (uuid: string): PlayerClass => {
  // Simple hash from UUID to get consistent random class per player
  let hash = 0
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  const index = Math.abs(hash) % PLAYER_CLASSES.length
  return PLAYER_CLASSES[index]!
}
