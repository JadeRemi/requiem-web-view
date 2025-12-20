import { ItemTooltipData } from '../types/item'

/**
 * Mock item data for testing ItemTooltip component
 */

export const MOCK_DRAGON_HELMET: ItemTooltipData = {
  name: 'Godly Strong Dragon Helmet',
  nameColor: 'gold',
  rarity: 'legendary',
  type: 'helmet',
  lines: [
    // Strength stat
    [
      { text: 'Strength: ', color: 'gray' },
      { text: '+32', color: 'red' },
      { text: ' ', color: 'white' },
      { text: '(Godly +7)', color: 'blue' },
    ],
    // Crit Damage stat
    [
      { text: 'Crit Damage: ', color: 'gray' },
      { text: '+6', color: 'red' },
      { text: ' ', color: 'white' },
      { text: '(Godly +6%)', color: 'blue' },
    ],
    // Empty line
    [],
    // Health stat
    [
      { text: 'Health: ', color: 'gray' },
      { text: '+145 HP', color: 'green' },
    ],
    // Defense stat
    [
      { text: 'Defense: ', color: 'gray' },
      { text: '+125', color: 'green' },
    ],
    // Intelligence stat
    [
      { text: 'Intelligence: ', color: 'gray' },
      { text: '+4', color: 'green' },
      { text: ' ', color: 'white' },
      { text: '(Godly +4)', color: 'blue' },
    ],
    // Empty line
    [],
    // Enchantment name
    [
      { text: 'Growth V', color: 'blue' },
    ],
    // Enchantment effect 1
    [
      { text: 'Grants ', color: 'gray' },
      { text: '+75', color: 'green' },
      { text: ' ', color: 'white' },
      { text: '\u2764 Health', color: 'red' },
    ],
    // Enchantment effect 2
    [
      { text: 'Grants ', color: 'gray' },
      { text: '+15', color: 'green' },
      { text: ' ', color: 'white' },
      { text: '\u2748 Defense', color: 'green' },
    ],
    // Empty line
    [],
    // Full Set Bonus title
    [
      { text: 'Full Set Bonus: Strong Blood', color: 'gold' },
    ],
    // Bonus description 1
    [
      { text: 'Improves ', color: 'gray' },
      { text: 'Aspect of the End', color: 'blue' },
    ],
    // Bonus effect
    [
      { text: '\u22D7 ', color: 'gray' },
      { text: '+75 Damage', color: 'red' },
    ],
    // Empty line
    [],
    // Ability title
    [
      { text: 'Instant Transmission:', color: 'gray' },
    ],
    // Ability effect 1
    [
      { text: '\u22D7 ', color: 'gray' },
      { text: '+2', color: 'green' },
      { text: ' teleport range', color: 'gray' },
    ],
    // Ability effect 2
    [
      { text: '\u22D7 ', color: 'gray' },
      { text: '+3', color: 'green' },
      { text: ' seconds', color: 'gray' },
    ],
    // Ability effect 3
    [
      { text: '\u22D7 ', color: 'gray' },
      { text: '+5', color: 'red' },
      { text: ' ', color: 'white' },
      { text: '\u2741 Strength', color: 'red' },
    ],
  ],
} as const satisfies ItemTooltipData

export const MOCK_SHADOW_DAGGER: ItemTooltipData = {
  name: 'Shadow Assassin Dagger',
  nameColor: 'dark_purple',
  rarity: 'epic',
  type: 'sword',
  lines: [
    [
      { text: 'Damage: ', color: 'gray' },
      { text: '+285', color: 'red' },
    ],
    [
      { text: 'Strength: ', color: 'gray' },
      { text: '+145', color: 'red' },
    ],
    [
      { text: 'Crit Chance: ', color: 'gray' },
      { text: '+12%', color: 'red' },
    ],
    [
      { text: 'Crit Damage: ', color: 'gray' },
      { text: '+85%', color: 'red' },
    ],
    [],
    [
      { text: 'Ability: Shadow Strike', color: 'gold' },
    ],
    [
      { text: 'Teleport behind your target and', color: 'gray' },
    ],
    [
      { text: 'deal ', color: 'gray' },
      { text: '500%', color: 'red' },
      { text: ' damage. ', color: 'gray' },
      { text: '5s cooldown', color: 'dark_gray' },
    ],
  ],
} as const satisfies ItemTooltipData

export const MOCK_HEALING_POTION: ItemTooltipData = {
  name: 'Splash Potion of Healing III',
  nameColor: 'light_purple',
  rarity: 'rare',
  type: 'consumable',
  lines: [
    [
      { text: 'Instantly heals ', color: 'gray' },
      { text: '350 \u2764', color: 'red' },
    ],
    [],
    [
      { text: 'Splash radius: ', color: 'gray' },
      { text: '4 blocks', color: 'green' },
    ],
    [
      { text: 'Affects: ', color: 'gray' },
      { text: 'All players', color: 'aqua' },
    ],
  ],
} as const satisfies ItemTooltipData

/** All mock items for easy access */
export const MOCK_ITEMS = [
  MOCK_DRAGON_HELMET,
  MOCK_SHADOW_DAGGER,
  MOCK_HEALING_POTION,
] as const
