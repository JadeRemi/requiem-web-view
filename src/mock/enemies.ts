/**
 * Enemy model mock data
 * Configuration for GLB model previews in Wiki carousel
 */

export interface EnemyModel {
  id: string
  name: string
  /** Path relative to public/ */
  path: string
  /** Scale multiplier for the model */
  scale: number
  /** Y-axis position offset (negative = lower) */
  offsetY?: number
}

export const ENEMY_MODELS: EnemyModel[] = [
  {
    id: 'caco',
    name: 'Caco',
    path: '/models/enemies/caco.glb',
    scale: 1.0,
    offsetY: 0,
  },
  {
    id: 'faun',
    name: 'Faun',
    path: '/models/enemies/faun.glb',
    scale: 1.0,
    offsetY: 1,
  },
  {
    id: 'muskrat',
    name: 'Muskrat',
    path: '/models/enemies/muskrat.glb',
    scale: 1.0,
    offsetY: 0,
  },
  {
    id: 'rat',
    name: 'Rat',
    path: '/models/enemies/rat.glb',
    scale: 1.0,
    offsetY: 0,
  },
  {
    id: 'redstone',
    name: 'Red Golem',
    path: '/models/enemies/redstone.glb',
    scale: 1.0,
    offsetY: 3,
  },
  {
    id: 'spider',
    name: 'Spider',
    path: '/models/enemies/spider.glb',
    scale: 1.0,
    offsetY: 0,
  },
  {
    id: 'warden',
    name: 'Warden',
    path: '/models/enemies/warden.glb',
    scale: 1.0,
    offsetY: 1.5,
  },
  {
    id: 'wasp',
    name: 'Wasp',
    path: '/models/enemies/wasp.glb',
    scale: 1.0,
    offsetY: 0,
  },
  {
    id: 'zombie',
    name: 'Zombie',
    path: '/models/enemies/zombie.glb',
    scale: 1.0,
    offsetY: 1,
  },
]
