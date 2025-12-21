/**
 * Equipment model mock data
 * Temporary data for GLB model previews
 */

import type { ItemTooltipData } from '../types/item'

export interface EquipmentModel {
  id: string
  name: string
  /** Path relative to public/ */
  path: string
  /** Scale multiplier for the model */
  scale: number
  /** X-axis rotation angle in radians */
  rotationX: number
  /** Y-axis rotation angle in radians */
  rotationY: number
  /** Z-axis rotation angle in radians */
  rotationZ: number
  /** Y-axis position offset (negative = lower) */
  offsetY?: number
  /** Whether this item has warped/corrupted visual effect */
  warped?: boolean
  /** Tooltip data for item display */
  tooltip?: ItemTooltipData
}

export const EQUIPMENT_MODELS: EquipmentModel[] = [
  {
    id: 'axe',
    name: 'Axe',
    path: '/models/items/axe.glb',
    scale: 1.25,
    rotationX: 0.3,
    rotationY: 0,
    rotationZ: 0.2,
    tooltip: {
      name: 'Soulreaver Hatchet',
      nameColor: 'gold',
      rarity: 5,
      type: 'sword',
      lines: [
        [{ text: 'Damage: ', color: 'gray' }, { text: '+42', color: 'red' }],
        [{ text: 'Attack speed: ', color: 'gray' }, { text: '+18%', color: 'green' }],
        [{ text: 'Crit chance: ', color: 'gray' }, { text: '+12%', color: 'blue' }],
        [{ text: 'Health steal: ', color: 'gray' }, { text: '+8%', color: 'light_purple' }],
        [],
        [{ text: 'Passive: ', color: 'gold' }, { text: 'Reaping Strike', color: 'yellow' }],
        [{ text: 'Health on kill: ', color: 'gray' }, { text: '+15', color: 'white' }],
      ],
    },
  },
  {
    id: 'bow',
    name: 'Bow',
    path: '/models/items/bow.glb',
    scale: 1.9,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0.3,
    offsetY: -0.4,
    tooltip: {
      name: 'Galeforce Recurve',
      nameColor: 'aqua',
      rarity: 3,
      type: 'bow',
      lines: [
        [{ text: 'Damage: ', color: 'gray' }, { text: '+28', color: 'red' }],
        [{ text: 'Crit chance: ', color: 'gray' }, { text: '+15%', color: 'blue' }],
        [{ text: 'Crit damage: ', color: 'gray' }, { text: '+22%', color: 'dark_aqua' }],
        [{ text: 'Move speed: ', color: 'gray' }, { text: '+10%', color: 'green' }],
        [{ text: 'Pierce chance: ', color: 'gray' }, { text: '+5%', color: 'yellow' }],
        [],
        [{ text: 'Passive: ', color: 'gold' }, { text: 'Tailwind', color: 'yellow' }],
        [{ text: 'Accuracy bonus: ', color: 'gray' }, { text: 'while moving', color: 'white' }],
      ],
    },
  },
  {
    id: 'mace',
    name: 'Mace',
    path: '/models/items/mace.glb',
    scale: 1.4,
    rotationX: 0.3,
    rotationY: 0,
    rotationZ: 0.15,
    warped: true,
    tooltip: {
      name: 'Nullspace Crusher',
      nameColor: 'dark_purple',
      rarity: 4,
      type: 'sword',
      lines: [
        [{ text: 'Damage: ', color: 'gray' }, { text: '+35', color: 'red' }],
        [{ text: 'Piercing damage: ', color: 'gray' }, { text: '+20', color: 'light_purple' }],
        [{ text: 'Stun chance: ', color: 'gray' }, { text: '+15%', color: 'blue' }],
        [{ text: 'Knockback chance: ', color: 'gray' }, { text: '+8%', color: 'aqua' }],
        [{ text: 'Absorption: ', color: 'gray' }, { text: '+12', color: 'yellow' }],
        [],
        [{ text: 'Passive: ', color: 'gold' }, { text: 'Void Pulse', color: 'yellow' }],
        [{ text: 'Stun proc: ', color: 'gray' }, { text: 'every 4th hit', color: 'white' }],
        [],
        [{ text: 'WARPED', color: 'dark_purple', bold: true }],
      ],
    },
  },
  {
    id: 'staff',
    name: 'Staff',
    path: '/models/items/staff.glb',
    scale: 1.0,
    rotationX: 0.1,
    rotationY: 0,
    rotationZ: 0.4,
    tooltip: {
      name: 'Conduit of Renewal',
      nameColor: 'blue',
      rarity: 2,
      type: 'staff',
      lines: [
        [{ text: 'Damage: ', color: 'gray' }, { text: '+18', color: 'red' }],
        [{ text: 'Power regen: ', color: 'gray' }, { text: '+25%', color: 'aqua' }],
        [{ text: 'Effect area: ', color: 'gray' }, { text: '+10%', color: 'green' }],
        [{ text: 'Healing: ', color: 'gray' }, { text: '+8%', color: 'light_purple' }],
        [],
        [{ text: 'Passive: ', color: 'gold' }, { text: 'Resonance', color: 'yellow' }],
        [{ text: 'Power cost reduction: ', color: 'gray' }, { text: '12%', color: 'white' }],
      ],
    },
  },
]
