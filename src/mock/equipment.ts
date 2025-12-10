/**
 * Equipment model mock data
 * Temporary data for GLB model previews
 */

export interface EquipmentModel {
  id: string
  name: string
  /** Path relative to src/models/ */
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
}

export const EQUIPMENT_MODELS = [
  {
    id: 'axe',
    name: 'Axe',
    path: '/models/axe.glb',
    scale: 1.25, // 2x smaller (was 2.5)
    rotationX: 0.3,
    rotationY: 0,
    rotationZ: 0.2,
  },
  // {
  //   id: 'bore',
  //   name: 'Bore',
  //   path: '/models/bore.glb',
  //   scale: 2.0,
  //   rotationX: 0.2,
  //   rotationY: 0,
  //   rotationZ: 0.1,
  // },
  {
    id: 'bow',
    name: 'Bow',
    path: '/models/bow.glb',
    scale: 1.9, // 1.2x smaller (was 2.5)
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0.3,
    offsetY: -0.4, // Display lower
  },
  {
    id: 'mace',
    name: 'Mace',
    path: '/models/mace.glb',
    scale: 1.4, // 2x smaller (was 2.5)
    rotationX: 0.3,
    rotationY: 0,
    rotationZ: 0.15,
  },
  {
    id: 'staff',
    name: 'Staff',
    path: '/models/staff.glb',
    scale: 1.0, // 2x smaller (was 2.0)
    rotationX: 0.1,
    rotationY: 0,
    rotationZ: 0.4,
  },
  // {
  //   id: 'figurine',
  //   name: 'Figurine',
  //   path: '/models/figurine.glb',
  //   scale: 0.5, // 3x smaller (was 1.5)
  //   rotationX: 0,
  //   rotationY: 0,
  //   rotationZ: 0,
  // },
] as const satisfies readonly EquipmentModel[]

