/**
 * Career positions mock data
 */

import type { IconName } from '../components/Icon'

export interface CareerPosition {
  id: string
  title: string
  icon: IconName
  description: string
}

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: 'architect',
    title: 'Architect',
    icon: 'building',
    description: 'Responsible for creating new locations, decorating, landscaping, getting the right block palette, and designing the right proportions for interiors and exteriors. You will shape the physical world players explore.',
  },
  {
    id: 'designer',
    title: 'Designer',
    icon: 'palette',
    description: 'Works with the resource pack — drawing textures, modeling 3D assets, simple scripting, and creating animations. You will define the visual identity of items, creatures, and environments.',
  },
  {
    id: 'technician',
    title: 'Technician',
    icon: 'beaker',
    description: 'Responsible for coding, refining logic, inventing creative new mechanics, creating addons, planning formulas, and predicting progression curves. You will build the systems that make the game work.',
  },
  {
    id: 'tester',
    title: 'Tester',
    icon: 'puzzle',
    description: 'Plays the game to the maximum, seeking paths others avoid or ignore. Your role is to break the system on purpose — finding exploits, edge cases, and unintuitive interactions before players do.',
  },
]
