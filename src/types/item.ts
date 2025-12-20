/**
 * Minecraft Item Tooltip Types
 * For displaying item descriptions with colored text segments
 */

/** Minecraft color codes for text */
export type MCColor =
  | 'black'
  | 'dark_blue'
  | 'dark_green'
  | 'dark_aqua'
  | 'dark_red'
  | 'dark_purple'
  | 'gold'
  | 'gray'
  | 'dark_gray'
  | 'blue'
  | 'green'
  | 'aqua'
  | 'red'
  | 'light_purple'
  | 'yellow'
  | 'white'

/** A text segment with a color */
export interface TextSegment {
  text: string
  color: MCColor
  bold?: boolean
}

/** A single line in an item tooltip */
export type TooltipLine = TextSegment[]

/** Item rarity levels */
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'

/** Item type (armor slot, weapon, etc.) */
export type ItemType =
  | 'helmet'
  | 'chestplate'
  | 'leggings'
  | 'boots'
  | 'sword'
  | 'bow'
  | 'staff'
  | 'accessory'
  | 'consumable'
  | 'material'

/** Complete item tooltip data */
export interface ItemTooltipData {
  /** Item display name (first line) */
  name: string
  /** Color for the item name */
  nameColor: MCColor
  /** Item rarity */
  rarity: ItemRarity
  /** Item type */
  type: ItemType
  /** Lines of tooltip content (stats, abilities, lore, etc.) */
  lines: TooltipLine[]
}

/** Map MC color names to CSS class names */
export const MC_COLOR_CLASS_MAP: Record<MCColor, string> = {
  black: 'mc-black',
  dark_blue: 'mc-dark-blue',
  dark_green: 'mc-dark-green',
  dark_aqua: 'mc-dark-aqua',
  dark_red: 'mc-dark-red',
  dark_purple: 'mc-dark-purple',
  gold: 'mc-gold',
  gray: 'mc-gray',
  dark_gray: 'mc-dark-gray',
  blue: 'mc-blue',
  green: 'mc-green',
  aqua: 'mc-aqua',
  red: 'mc-red',
  light_purple: 'mc-light-purple',
  yellow: 'mc-yellow',
  white: 'mc-white',
}

/** Map rarity to display text and color */
export const RARITY_CONFIG: Record<ItemRarity, { label: string; color: MCColor }> = {
  common: { label: 'COMMON', color: 'white' },
  uncommon: { label: 'UNCOMMON', color: 'yellow' },
  rare: { label: 'RARE', color: 'aqua' },
  epic: { label: 'EPIC', color: 'dark_purple' },
  legendary: { label: 'LEGENDARY', color: 'gold' },
  mythic: { label: 'MYTHIC', color: 'light_purple' },
}

/** Map item type to display text */
export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  helmet: 'HELMET',
  chestplate: 'CHESTPLATE',
  leggings: 'LEGGINGS',
  boots: 'BOOTS',
  sword: 'SWORD',
  bow: 'BOW',
  staff: 'STAFF',
  accessory: 'ACCESSORY',
  consumable: 'CONSUMABLE',
  material: 'MATERIAL',
}
