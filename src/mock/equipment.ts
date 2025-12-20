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
      name: 'Berserker\'s Cleaver',
      nameColor: 'gold',
      rarity: 'legendary',
      type: 'sword',
      lines: [
        [{ text: '+45 Attack Damage', color: 'red' }],
        [{ text: '+15% Attack Speed', color: 'green' }],
        [],
        [{ text: 'Ability: ', color: 'gold' }, { text: 'Cleave', color: 'yellow' }],
        [{ text: 'Your attacks deal ', color: 'gray' }, { text: '30%', color: 'white' }, { text: ' damage to', color: 'gray' }],
        [{ text: 'nearby enemies.', color: 'gray' }],
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
      name: 'Windstrider Bow',
      nameColor: 'aqua',
      rarity: 'rare',
      type: 'bow',
      lines: [
        [{ text: '+32 Ranged Damage', color: 'red' }],
        [{ text: '+20% Critical Chance', color: 'blue' }],
        [],
        [{ text: 'Ability: ', color: 'gold' }, { text: 'Wind Shot', color: 'yellow' }],
        [{ text: 'Arrows travel ', color: 'gray' }, { text: '50%', color: 'white' }, { text: ' faster and', color: 'gray' }],
        [{ text: 'pierce through enemies.', color: 'gray' }],
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
      name: 'Voidtouched Mace',
      nameColor: 'dark_purple',
      rarity: 'epic',
      type: 'sword',
      lines: [
        [{ text: '+38 Attack Damage', color: 'red' }],
        [{ text: '+25 Magic Damage', color: 'light_purple' }],
        [],
        [{ text: 'Ability: ', color: 'gold' }, { text: 'Void Strike', color: 'yellow' }],
        [{ text: 'Every 4th hit deals ', color: 'gray' }, { text: '200%', color: 'white' }],
        [{ text: 'damage and heals you.', color: 'gray' }],
        [],
        [{ text: 'CORRUPTED', color: 'dark_purple', bold: true }],
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
      name: 'Arcane Focus',
      nameColor: 'blue',
      rarity: 'uncommon',
      type: 'staff',
      lines: [
        [{ text: '+18 Magic Damage', color: 'light_purple' }],
        [{ text: '+10% Mana Regen', color: 'aqua' }],
        [],
        [{ text: 'Ability: ', color: 'gold' }, { text: 'Channel', color: 'yellow' }],
        [{ text: 'Hold to charge a powerful', color: 'gray' }],
        [{ text: 'magic blast.', color: 'gray' }],
      ],
    },
  },
]
