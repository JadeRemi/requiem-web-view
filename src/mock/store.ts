export type PrivilegeType = 'subscription' | 'one-time'

export interface StorePrivilege {
  id: string
  name: string
  description: string[]
  type: PrivilegeType
  price: number
}

export const STORE_PRIVILEGES: StorePrivilege[] = [
  {
    id: 'dynmap-enhanced',
    name: 'Enhanced Dynmap',
    description: [
      'Reveals whole web dynmap',
      'Adds more detailed markers to web dynmap',
      'Can fasttravel to key milestones from menu (requires visiting to unlock)',
    ],
    type: 'subscription',
    price: 150,
  },
  {
    id: 'web-panel-extended',
    name: 'Extended Web Panel',
    description: [
      'Web map has additional static information',
      'Includes bestiary, drop rates and conditions',
      'Ability descriptions and cards',
    ],
    type: 'subscription',
    price: 100,
  },
  {
    id: 'temporal-voting',
    name: 'Temporal Region Voting',
    description: [
      'Voting for preset option combination for the next Temporal region',
    ],
    type: 'subscription',
    price: 75,
  },
  {
    id: 'temporal-extended',
    name: 'Extended Temporal Access',
    description: [
      '5 temporal regions instead of 3',
      'Access to day before yesterday & day after tomorrow',
      'Lose outdated region 1 cycle later, gain new region 1 cycle earlier',
    ],
    type: 'subscription',
    price: 200,
  },
  {
    id: 'daily-lootbox',
    name: 'Daily Lootbox',
    description: [
      'Grants a daily lootbox each day',
      'Unclaimed lootboxes disappear',
    ],
    type: 'subscription',
    price: 120,
  },
  {
    id: 'custom-nickname',
    name: 'Custom Nickname',
    description: [
      'Custom nickname in chat and tab menu',
    ],
    type: 'one-time',
    price: 50,
  },
  {
    id: 'boosters',
    name: 'Short-term Boosters',
    description: [
      'EXP gain boost',
      'Move speed boost',
      'Reputation gain boost',
      'Item drop chance boost',
    ],
    type: 'one-time',
    price: 30,
  },
  {
    id: 'logs',
    name: 'Activity Logs',
    description: [
      'Includes recent damage dealt/received',
      'Recent activity events tracking',
    ],
    type: 'subscription',
    price: 80,
  },
  {
    id: 'inspect',
    name: 'Player Inspect',
    description: [
      'View inventory, abilities, and ability-related menus of selected player',
      'View apartments and pets',
      'Spectate players in the world',
      'View their HUD information',
    ],
    type: 'subscription',
    price: 175,
  },
  {
    id: 'create-guild',
    name: 'Create Guild',
    description: [
      'Create and manage a guild',
      'Guild stash for items and figurines',
    ],
    type: 'one-time',
    price: 250,
  },
  {
    id: 'hide-inventory',
    name: 'Hide Inventory',
    description: [
      'Hide inventory from other players',
      'Viewers see blocking placeholder in each slot',
      'Weapon hidden in death messages',
      'Does not affect linking hand in chat and trading',
    ],
    type: 'subscription',
    price: 90,
  },
  {
    id: 'vault-slot',
    name: 'Vault Tab Slot',
    description: [
      'Adds 1 vault tab slot',
    ],
    type: 'one-time',
    price: 60,
  },
  {
    id: 'class-slot',
    name: 'Active Class Slot',
    description: [
      'Adds 1 active class slot in class selection menu',
    ],
    type: 'one-time',
    price: 100,
  },
  {
    id: 'guild-vault-slot',
    name: 'Guild Vault Tab Slot',
    description: [
      'Adds 1 guild vault tab slot',
    ],
    type: 'one-time',
    price: 80,
  },
  {
    id: 'achievement-slot',
    name: 'Focused Achievement Slot',
    description: [
      'Adds 1 slot for focused achievement',
      'Progress through multiple achievements simultaneously',
      'Upgradable',
    ],
    type: 'one-time',
    price: 70,
  },
  {
    id: 'safe-exit-token',
    name: 'Safe Exit Token',
    description: [
      'Grants 1 token of safe exit from PvP',
      'Consumed to prevent instant death when leaving during battle',
    ],
    type: 'one-time',
    price: 40,
  },
  {
    id: 'spectator-worlds',
    name: 'Spectator World Access',
    description: [
      'Spectator access to location asset world',
      'Access to texturepack testing world',
    ],
    type: 'subscription',
    price: 50,
  },
  {
    id: 'class-eternal',
    name: 'Eternal Class',
    description: [
      'Access to Eternal class',
    ],
    type: 'subscription',
    price: 300,
  },
  {
    id: 'class-architect',
    name: 'Architect Class',
    description: [
      'Access to Architect class',
    ],
    type: 'subscription',
    price: 300,
  },
  {
    id: 'cosmetics',
    name: 'Skin Gallery & Cosmetics',
    description: [
      'Access to skin gallery to pick one',
      'Access to cosmetic menu',
      'Hide armor pieces from displaying',
    ],
    type: 'subscription',
    price: 125,
  },
  {
    id: 'teleport',
    name: 'Teleport Commands',
    description: [
      'Use /tpcall to request teleport to any player',
      'Use /tp to teleport to party members without asking',
      'Both teleports share a long cooldown',
    ],
    type: 'subscription',
    price: 100,
  },
  {
    id: 'chat-alerts',
    name: 'Chat Alerts',
    description: [
      'Toggle in-chat alerts on events happening in the world',
    ],
    type: 'subscription',
    price: 40,
  },
  {
    id: 'backup',
    name: 'Individual Backup',
    description: [
      'Creates a separate individual backup every day',
      'Includes all stats, inventory and progress',
      'Used for restoration in case of emergency',
    ],
    type: 'subscription',
    price: 150,
  },
  {
    id: 'premium-queue',
    name: 'Premium Queue',
    description: [
      'Premium queue when joining server',
      'Priority access to separate worlds and events',
    ],
    type: 'subscription',
    price: 85,
  },
  {
    id: 'danger-indicator',
    name: 'Danger Indicator',
    description: [
      'Visual marker over each enemy\'s head',
      'Shows how dangerous they are for you personally (e.g. "63%")',
    ],
    type: 'subscription',
    price: 110,
  },
]

