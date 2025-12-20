/**
 * Player class mock data
 * Configuration for class display in Wiki
 */

export interface PlayerClass {
  id: string
  name: string
  description: string
  /** Path to figurine model */
  modelPath: string
  /** Scale multiplier for the model */
  scale: number
}

export const PLAYER_CLASSES: PlayerClass[] = [
  {
    id: 'jaeger',
    name: 'Jaeger',
    description: 'A swift hunter specializing in ranged combat and tracking prey across the realm.',
    modelPath: '/models/items/figurine.glb',
    scale: 0.5,
  },
  {
    id: 'ventriloquist',
    name: 'Ventriloquist',
    description: 'A mysterious manipulator who controls puppets and illusions to confuse enemies.',
    modelPath: '/models/items/figurine.glb',
    scale: 0.5,
  },
  {
    id: 'shellguard',
    name: 'Shellguard',
    description: 'A heavily armored defender who protects allies and absorbs damage on the front lines.',
    modelPath: '/models/items/figurine.glb',
    scale: 0.5,
  },
]
