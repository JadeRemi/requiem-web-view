/**
 * Recipe mock data
 * Each recipe has a 3x3 grid of ingredients and a result
 */

import type { ItemTooltipData } from '../types/item'

export interface RecipeIngredient {
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
  /** Y-axis position offset */
  offsetY?: number
  /** X-axis position offset */
  offsetX?: number
  /** Tooltip data */
  tooltip: ItemTooltipData
}

export interface Recipe {
  id: string
  name: string
  /** 3x3 grid of ingredient IDs (null = empty slot) */
  grid: (string | null)[][]
  /** Result ingredient ID */
  resultId: string
  /** All ingredients used in this recipe (including result) */
  ingredients: Record<string, RecipeIngredient>
}

// Shared ingredients that can be reused across recipes
const SHARED_INGREDIENTS: Record<string, RecipeIngredient> = {
  stick: {
    id: 'stick',
    name: 'Resonant Rod',
    path: '/models/recipes/stick.glb',
    scale: 1.8,
    rotationX: 0.3,
    rotationY: 0,
    rotationZ: 0.5,
    tooltip: {
      name: 'Resonant Rod',
      nameColor: 'gray',
      rarity: 1,
      type: 'material',
      lines: [
        [{ text: 'A simple crafting component', color: 'gray' }],
        [{ text: 'infused with faint energy.', color: 'gray' }],
      ],
    },
  },
  redstone: {
    id: 'redstone',
    name: 'Crimson Dust',
    path: '/models/recipes/redstone.glb',
    scale: 2.2,
    rotationX: 0.2,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Crimson Dust',
      nameColor: 'red',
      rarity: 2,
      type: 'material',
      lines: [
        [{ text: 'Conductive crystalline powder', color: 'gray' }],
        [{ text: 'that hums with latent power.', color: 'gray' }],
      ],
    },
  },
  quartz: {
    id: 'quartz',
    name: 'Void Shard',
    path: '/models/recipes/quartz.glb',
    scale: 2.0,
    rotationX: 0.3,
    rotationY: 0.2,
    rotationZ: 0.1,
    tooltip: {
      name: 'Void Shard',
      nameColor: 'white',
      rarity: 3,
      type: 'material',
      lines: [
        [{ text: 'A crystalline fragment from', color: 'gray' }],
        [{ text: 'the boundary between dimensions.', color: 'gray' }],
      ],
    },
  },
  star: {
    id: 'star',
    name: 'Stellar Core',
    path: '/models/recipes/star.glb',
    scale: 2.0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Stellar Core',
      nameColor: 'yellow',
      rarity: 5,
      type: 'material',
      lines: [
        [{ text: 'The compressed heart of a', color: 'gray' }],
        [{ text: 'dying star. Radiates warmth.', color: 'gray' }],
      ],
    },
  },
  bottle: {
    id: 'bottle',
    name: 'Containment Vessel',
    path: '/models/recipes/bottle.glb',
    scale: 2.2,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Containment Vessel',
      nameColor: 'aqua',
      rarity: 1,
      type: 'material',
      lines: [
        [{ text: 'An empty vessel designed to', color: 'gray' }],
        [{ text: 'hold volatile substances.', color: 'gray' }],
      ],
    },
  },
  honey: {
    id: 'honey',
    name: 'Amber Essence',
    path: '/models/recipes/honey.glb',
    scale: 2.0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Amber Essence',
      nameColor: 'gold',
      rarity: 2,
      type: 'material',
      lines: [
        [{ text: 'Viscous golden liquid with', color: 'gray' }],
        [{ text: 'restorative properties.', color: 'gray' }],
      ],
    },
  },
  berry: {
    id: 'berry',
    name: 'Crimson Berry',
    path: '/models/recipes/berry.glb',
    scale: 2.5,
    rotationX: 0.2,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Crimson Berry',
      nameColor: 'red',
      rarity: 1,
      type: 'material',
      lines: [
        [{ text: 'A small fruit that grows in', color: 'gray' }],
        [{ text: 'the shadowed undergrowth.', color: 'gray' }],
      ],
    },
  },
  wart: {
    id: 'wart',
    name: 'Xenoflora Spore',
    path: '/models/recipes/wart.glb',
    scale: 2.0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Xenoflora Spore',
      nameColor: 'dark_red',
      rarity: 2,
      type: 'material',
      lines: [
        [{ text: 'Bioluminescent fungal matter', color: 'gray' }],
        [{ text: 'harvested from deep space.', color: 'gray' }],
      ],
    },
  },
  book: {
    id: 'book',
    name: 'Tome of Knowledge',
    path: '/models/recipes/book.glb',
    scale: 2.0,
    rotationX: 0.3,
    rotationY: 0.2,
    rotationZ: 0.1,
    tooltip: {
      name: 'Tome of Knowledge',
      nameColor: 'light_purple',
      rarity: 3,
      type: 'material',
      lines: [
        [{ text: 'Ancient writings bound in', color: 'gray' }],
        [{ text: 'weathered leather.', color: 'gray' }],
      ],
    },
  },
  carrot: {
    id: 'carrot',
    name: 'Golden Root',
    path: '/models/recipes/carrot.glb',
    scale: 2.2,
    rotationX: 0.3,
    rotationY: 0,
    rotationZ: 0.2,
    tooltip: {
      name: 'Golden Root',
      nameColor: 'gold',
      rarity: 2,
      type: 'material',
      lines: [
        [{ text: 'A root vegetable imbued with', color: 'gray' }],
        [{ text: 'growth energy from the sun.', color: 'gray' }],
      ],
    },
  },
  resin: {
    id: 'resin',
    name: 'Hardite Resin',
    path: '/models/recipes/resin.glb',
    scale: 2.5,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Hardite Resin',
      nameColor: 'yellow',
      rarity: 2,
      type: 'material',
      lines: [
        [{ text: 'Solidified tree sap that', color: 'gray' }],
        [{ text: 'hardens on contact with air.', color: 'gray' }],
      ],
    },
  },
  bucket: {
    id: 'bucket',
    name: 'Containment Pail',
    path: '/models/recipes/bucket.glb',
    scale: 1.8,
    rotationX: 0.2,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Containment Pail',
      nameColor: 'gray',
      rarity: 1,
      type: 'material',
      lines: [
        [{ text: 'A sturdy metal container', color: 'gray' }],
        [{ text: 'for transporting liquids.', color: 'gray' }],
      ],
    },
  },
}

// Recipe result items
const RESULT_ITEMS: Record<string, RecipeIngredient> = {
  starlight_elixir: {
    id: 'starlight_elixir',
    name: 'Starlight Elixir',
    path: '/models/recipes/bottle.glb',
    scale: 2.4,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Starlight Elixir',
      nameColor: 'light_purple',
      rarity: 5,
      type: 'consumable',
      lines: [
        [{ text: 'Restoration: ', color: 'gray' }, { text: '+100 HP', color: 'red' }],
        [{ text: 'Duration: ', color: 'gray' }, { text: '30s', color: 'aqua' }],
        [],
        [{ text: 'Effect: ', color: 'gold' }, { text: 'Starfire Aura', color: 'yellow' }],
        [{ text: 'Grants immunity to fire and', color: 'gray' }],
        [{ text: 'emits damaging light pulses.', color: 'gray' }],
      ],
    },
  },
  void_crystal: {
    id: 'void_crystal',
    name: 'Void Crystal',
    path: '/models/recipes/quartz.glb',
    scale: 2.5,
    rotationX: 0.2,
    rotationY: 0.3,
    rotationZ: 0.1,
    tooltip: {
      name: 'Void Crystal',
      nameColor: 'dark_purple',
      rarity: 4,
      type: 'material',
      lines: [
        [{ text: 'Power: ', color: 'gray' }, { text: '+25 Void Damage', color: 'light_purple' }],
        [{ text: 'Resonance: ', color: 'gray' }, { text: '+15%', color: 'aqua' }],
        [],
        [{ text: 'A crystallized fragment of', color: 'gray' }],
        [{ text: 'pure dimensional energy.', color: 'gray' }],
        [],
        [{ text: 'WARPED', color: 'dark_purple', bold: true }],
      ],
    },
  },
  renewal_brew: {
    id: 'renewal_brew',
    name: 'Renewal Brew',
    path: '/models/recipes/bucket.glb',
    scale: 2.0,
    rotationX: 0.2,
    rotationY: 0,
    rotationZ: 0,
    tooltip: {
      name: 'Renewal Brew',
      nameColor: 'green',
      rarity: 3,
      type: 'consumable',
      lines: [
        [{ text: 'Restoration: ', color: 'gray' }, { text: '+50 HP', color: 'red' }],
        [{ text: 'Regen: ', color: 'gray' }, { text: '+5 HP/s for 10s', color: 'green' }],
        [],
        [{ text: 'Effect: ', color: 'gold' }, { text: 'Nature\'s Blessing', color: 'yellow' }],
        [{ text: 'Removes poison and grants', color: 'gray' }],
        [{ text: 'brief immunity to toxins.', color: 'gray' }],
      ],
    },
  },
}

export const RECIPES: Recipe[] = [
  {
    id: 'starlight_elixir',
    name: 'Starlight Elixir',
    grid: [
      ['redstone', 'star', 'redstone'],
      ['quartz', 'bottle', 'quartz'],
      [null, 'honey', null],
    ],
    resultId: 'starlight_elixir',
    ingredients: {
      redstone: SHARED_INGREDIENTS.redstone!,
      star: SHARED_INGREDIENTS.star!,
      quartz: SHARED_INGREDIENTS.quartz!,
      bottle: SHARED_INGREDIENTS.bottle!,
      honey: SHARED_INGREDIENTS.honey!,
      starlight_elixir: RESULT_ITEMS.starlight_elixir!,
    },
  },
  {
    id: 'void_crystal',
    name: 'Void Crystal',
    grid: [
      [null, 'wart', null],
      ['quartz', 'resin', 'quartz'],
      ['redstone', 'quartz', 'redstone'],
    ],
    resultId: 'void_crystal',
    ingredients: {
      wart: SHARED_INGREDIENTS.wart!,
      quartz: SHARED_INGREDIENTS.quartz!,
      resin: SHARED_INGREDIENTS.resin!,
      redstone: SHARED_INGREDIENTS.redstone!,
      void_crystal: RESULT_ITEMS.void_crystal!,
    },
  },
  {
    id: 'renewal_brew',
    name: 'Renewal Brew',
    grid: [
      ['berry', 'carrot', 'berry'],
      [null, 'bucket', null],
      ['honey', 'book', 'honey'],
    ],
    resultId: 'renewal_brew',
    ingredients: {
      berry: SHARED_INGREDIENTS.berry!,
      carrot: SHARED_INGREDIENTS.carrot!,
      bucket: SHARED_INGREDIENTS.bucket!,
      honey: SHARED_INGREDIENTS.honey!,
      book: SHARED_INGREDIENTS.book!,
      renewal_brew: RESULT_ITEMS.renewal_brew!,
    },
  },
]
