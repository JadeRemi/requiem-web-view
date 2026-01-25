/**
 * Ayum Class Abilities Mock Data
 * Based on REQ ABILITIES - Class_ Ayum.csv
 * 35 active abilities cast by combining 4 Aspects in different sequences
 */

export type AspectColor = 'green' | 'yellow' | 'red' | 'blue'

export interface AyumAbility {
  id: string
  name: string
  /** 4 Aspect colors that make up the ability combination */
  aspects: [AspectColor, AspectColor, AspectColor, AspectColor]
  /** Number of variations based on first color */
  variationsFirst: number
  /** Number of variations based on last color */
  variationsLast: number
  /** Total number of variations this ability can have */
  totalVariations: number
  /** Numerical stats and values for the ability */
  numerics?: string[]
}

/**
 * All 35 Ayum abilities
 * Order matches rows 56-212 from the CSV
 */
export const AYUM_ABILITIES: AyumAbility[] = [
  {
    id: 'spin-the-wheen',
    name: 'Spin the wheen',
    aspects: ['green', 'yellow', 'red', 'blue'],
    variationsFirst: 4,
    variationsLast: 4,
    totalVariations: 16,
  },
  {
    id: 'lichen-hedge',
    name: 'Lichen hedge',
    aspects: ['green', 'green', 'yellow', 'red'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
  },
  {
    id: 'breakout',
    name: 'Breakout',
    aspects: ['green', 'green', 'yellow', 'blue'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
  },
  {
    id: 'filigree',
    name: 'Filigree',
    aspects: ['green', 'green', 'red', 'blue'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
  },
  {
    id: 'spiral-of-learning',
    name: 'Spiral of learning',
    aspects: ['green', 'green', 'yellow', 'yellow'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
  },
  {
    id: 'haze-dissipation',
    name: 'Haze dissipation',
    aspects: ['green', 'green', 'red', 'red'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
  },
  {
    id: 'echo-cocoon',
    name: 'Echo cocoon',
    aspects: ['green', 'green', 'blue', 'blue'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'Targets an ally or enemy',
      '+8 additional damage to enemy with shield. -15 damage to allies with shield',
      '2 block explosion knockback, 15 base explosion damage. 1.5 seconds explosion cooldown',
      '60 units shield durability. 100 seconds shield duration',
      '20% of damage to shield converted to Ayum healing',
    ],
  },
  {
    id: 'renounced-doll',
    name: 'Renounced doll',
    aspects: ['green', 'green', 'green', 'yellow'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'Targets a block',
      'Damage redirect has 15 block radius. Aggro has 5 block radius',
      '30% of damage to allies is redirected',
      'Doll duration is 2 minutes. Doll starts with 2000 Health',
      '4x cooldown on Doll death and +20 seconds to existing cooldowns',
    ],
  },
  {
    id: 'great-attractor',
    name: 'Great attractor',
    aspects: ['green', 'green', 'green', 'red'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
  },
  {
    id: 'lethargy-construct',
    name: 'Lethargy construct',
    aspects: ['green', 'green', 'green', 'blue'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'Targets a block or existing construct',
      '80 seconds construct duration. Construct has 5 maximum sections. 20 construct Health per section',
      '4x cooldown on saving an ally',
    ],
  },
  {
    id: 'flashback-grace',
    name: 'Flashback grace',
    aspects: ['green', 'green', 'green', 'green'],
    variationsFirst: 1,
    variationsLast: 0,
    totalVariations: 1,
    numerics: [
      'No target',
      'Jump 5 seconds back',
      'Regeneration is increased by 300%',
      '10% of incoming damage is turned into healing, 90% is depleted',
      '1 second base duration, +0.5 second per 10% of missing Health',
    ],
  },
  {
    id: 'serpentine-coil',
    name: 'Serpentine coil',
    aspects: ['yellow', 'yellow', 'green', 'red'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'Targets a block, maximum range is 20 blocks',
      '20 Coil Maximum health',
      '10 damage with lightning',
      '20 maximum chains for a lightning',
      '100% increased damage in water. 200% increased damage to last unit in chain, stacks with water multiplier',
      '1 attack per second. 8 blocks Coil attack range, 6 block chaining range',
      '10 maximum resurrected minions. They last 1 minute',
    ],
  },
  {
    id: 'flashforward',
    name: 'Flashforward',
    aspects: ['yellow', 'yellow', 'green', 'blue'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'No target',
      '-4 seconds to current cooldowns each second over 5 seconds, which grants clean 15 seconds reduction',
      'Lengthy effect lasts 25 seconds, granting 15% reduced new cooldowns and 30% increased length of new buffs',
      '+1 Aspect level',
    ],
  },
  {
    id: 'mark-of-hatred',
    name: 'Mark of hatred',
    aspects: ['yellow', 'yellow', 'red', 'blue'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'Targets enemy unit',
      '+10 damage with each received hit',
      '+110% Loot bonus',
      '40% of taken damage received additionally on end',
      '3% minimum debuff chance',
    ],
  },
  {
    id: 'sly-bladepunch',
    name: 'Sly bladepunch',
    aspects: ['yellow', 'yellow', 'red', 'red'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'No target',
      '30 seconds charge duration',
      '3 seconds stun duration',
      '+800% Crit multiplier with charges active, not stackable',
      '+4 damage per charge. 100 maximum charges',
    ],
  },
  {
    id: 'hailrange',
    name: 'Hailrange',
    aspects: ['yellow', 'yellow', 'blue', 'blue'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
  },
  {
    id: 'bloodworm',
    name: 'Bloodworm',
    aspects: ['yellow', 'yellow', 'yellow', 'green'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
  },
  {
    id: 'flipgrowth',
    name: 'Flipgrowth',
    aspects: ['yellow', 'yellow', 'yellow', 'red'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'No target',
      '15 second overcapping duration',
    ],
  },
  {
    id: 'dowsing',
    name: 'Dowsing',
    aspects: ['yellow', 'yellow', 'yellow', 'blue'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
  },
  {
    id: 'chrysopoetizing',
    name: 'Chrysopoetizing',
    aspects: ['yellow', 'yellow', 'yellow', 'yellow'],
    variationsFirst: 1,
    variationsLast: 0,
    totalVariations: 1,
  },
  {
    id: 'segmented-leaf-plating',
    name: 'Segmented leaf plating',
    aspects: ['red', 'red', 'green', 'yellow'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'No target',
      '+40 bonus durability',
      '+5-20 flask sips',
      '3 random attributes on Leaf armor',
      '+10% Block chance with a shield. 2 block radius for knocking back 4 blocks away. Deals 30 damage on block',
    ],
  },
  {
    id: 'beam-cascade',
    name: 'Beam cascade',
    aspects: ['red', 'red', 'green', 'blue'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'No target',
      '7 block radius. 1.5 second stun',
    ],
  },
  {
    id: 'tectonic-touch',
    name: 'Tectonic touch',
    aspects: ['red', 'red', 'yellow', 'blue'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'No target',
      '7 block primary radius',
      '4 block secondary radius from items',
      '2 block radius explosion dealing 5 damage multiplied by item rarity (25 damage for rarest). Stack of 64 items deals 64 times the damage. 0.2 second delay between explosions chaining',
      'Maximum 30 simultaneous item stack explosions. Maximum 30 consecutive chains',
    ],
  },
  {
    id: 'orbitron-pin',
    name: 'Orbitron pin',
    aspects: ['red', 'red', 'blue', 'blue'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'Targets a block, maximum range is 40 blocks',
      '20 base beam damage',
      '+1 damage per depleted Power',
    ],
  },
  {
    id: 'electrocution-curveball',
    name: 'Electrocution curveball',
    aspects: ['red', 'red', 'red', 'green'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
  },
  {
    id: 'kharnivorization',
    name: 'Kharnivorization',
    aspects: ['red', 'red', 'red', 'yellow'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'Targets an ally',
      'Minion minimum teleport radius is 4 blocks. 5 second cooldown, separate for each minion',
      '50% increased melee damage under effect. +5% Health leech from damage, +10 Healing, +5% Maximum health gain on kill',
      '50% increased Chance luck, 30% increased Loot bonus for minions',
      'On kill stacks grant +2% Speed and +2 Damage, stacks last 20 seconds, 50 stacks limit',
    ],
  },
  {
    id: 'unstable-servitude',
    name: 'Unstable servitude',
    aspects: ['red', 'red', 'red', 'blue'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'No target',
      '1 minute buff duration',
      '+300% minion crit multiplier',
      '+5 Maximum minions',
    ],
  },
  {
    id: 'deflagration',
    name: 'Deflagration',
    aspects: ['red', 'red', 'red', 'red'],
    variationsFirst: 1,
    variationsLast: 0,
    totalVariations: 1,
  },
  {
    id: 'obscuration',
    name: 'Obscuration',
    aspects: ['blue', 'blue', 'green', 'yellow'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'No target',
      '5 maximum affected allies',
    ],
  },
  {
    id: 'chemical-assembly',
    name: 'Chemical assembly',
    aspects: ['blue', 'blue', 'green', 'red'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
  },
  {
    id: 'unshaken-persistence',
    name: 'Unshaken persistence',
    aspects: ['blue', 'blue', 'yellow', 'red'],
    variationsFirst: 3,
    variationsLast: 3,
    totalVariations: 9,
    numerics: [
      'No target',
      '1 stack of effect grants 1% chance to save a consumable, to save flask sips, to save Power',
      '20% chance to apply 2% chance to save a consumable when ally uses a consumable in 10 block radius',
      '15% chance to save durability',
      '40 seconds effect duration. Maximum 5 stacks',
    ],
  },
  {
    id: 'horocube',
    name: 'Horocube',
    aspects: ['blue', 'blue', 'blue', 'green'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'No target',
      'Enemies are slowed 50%',
      'Cube has 8 block edge length and lasts 10 seconds',
    ],
  },
  {
    id: 'natures-will-in-mimicry',
    name: 'Nature\'s will in mimicry',
    aspects: ['blue', 'blue', 'blue', 'yellow'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'Targets a unit',
      '10 second duration of stealing effect on enemy',
      '1 hour duration of stolen ability',
    ],
  },
  {
    id: 'trippelganger',
    name: 'Trippelganger',
    aspects: ['blue', 'blue', 'blue', 'red'],
    variationsFirst: 2,
    variationsLast: 2,
    totalVariations: 4,
    numerics: [
      'No target',
    ],
  },
  {
    id: 'gravechill',
    name: 'Gravechill',
    aspects: ['blue', 'blue', 'blue', 'blue'],
    variationsFirst: 1,
    variationsLast: 0,
    totalVariations: 1,
  },
]

/** Get ability by ID */
export const getAyumAbilityById = (id: string): AyumAbility | undefined =>
  AYUM_ABILITIES.find(a => a.id === id)

/** Get abilities by aspect combination */
export const getAyumAbilitiesByAspects = (
  aspects: [AspectColor, AspectColor, AspectColor, AspectColor]
): AyumAbility[] => {
  return AYUM_ABILITIES.filter(ability => {
    return ability.aspects.every((color, index) => color === aspects[index])
  })
}

/** Get abilities that start with a specific aspect color */
export const getAyumAbilitiesByFirstAspect = (color: AspectColor): AyumAbility[] => {
  return AYUM_ABILITIES.filter(ability => ability.aspects[0] === color)
}

/** Get abilities that end with a specific aspect color */
export const getAyumAbilitiesByLastAspect = (color: AspectColor): AyumAbility[] => {
  return AYUM_ABILITIES.filter(ability => ability.aspects[3] === color)
}
