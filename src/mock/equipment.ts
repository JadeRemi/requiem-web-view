/**
 * Equipment model mock data
 * Temporary data for GLB model previews
 */

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
}

export const EQUIPMENT_MODELS = [
  {
    id: 'axe',
    name: 'Axe',
    path: '/models/items/axe.glb',
    scale: 1.25,
    rotationX: 0.3,
    rotationY: 0,
    rotationZ: 0.2,
  },
  // {
  //   id: 'bore',
  //   name: 'Bore',
  //   path: '/models/items/bore.glb',
  //   scale: 2.0,
  //   rotationX: 0.2,
  //   rotationY: 0,
  //   rotationZ: 0.1,
  // },
  {
    id: 'bow',
    name: 'Bow',
    path: '/models/items/bow.glb',
    scale: 1.9,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0.3,
    offsetY: -0.4,
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
  },
  {
    id: 'staff',
    name: 'Staff',
    path: '/models/items/staff.glb',
    scale: 1.0,
    rotationX: 0.1,
    rotationY: 0,
    rotationZ: 0.4,
  },
  // {
  //   id: 'figurine',
  //   name: 'Figurine',
  //   path: '/models/items/figurine.glb',
  //   scale: 0.5,
  //   rotationX: 0,
  //   rotationY: 0,
  //   rotationZ: 0,
  // },
] as const satisfies readonly EquipmentModel[]
