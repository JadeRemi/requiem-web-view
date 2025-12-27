/**
 * Global Project Configuration
 * All project-wide constants and configuration values
 */

/** 
 * Default skin hash (base64 encoded JSON with texture URL)
 * This is PJesus's skin from the example
 */
export const DEFAULT_SKIN_HASH = 'eyJ0aW1lc3RhbXAiOjE1MDQ4NjI0NzMyMDksInByb2ZpbGVJZCI6IjQ4ZGZiYmJmZGUwOTRjOGVhZTlhNTVkZWQ0M2IxMDA5IiwicHJvZmlsZU5hbWUiOiJQSmVzdXMiLCJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjg0MWUyNDliOGJjNTMyYTRiNWViNTM5YTE2ZmQ1YmYxMGE5ZGQyMWY1ZWExOGM3ZjhlMzIzOGVjNGZkZmIifX19'

/** Default skin hashes for preset characters */
export const PRESET_SKINS = {
  /** Steve - default male skin */
  STEVE: '8667ba71-b85a-4004-af54-457a9734eed7',
  /** Alex - default female skin */
  ALEX: '6ab43178-89fd-4905-97f6-0f67d9d76fd9',
  /** PJesus - example skin */
  PJESUS: '48dfbbbf-de09-4c8e-ae9a-55ded43b1009',
} as const

/** Minecraft texture server base URL */
export const MINECRAFT_TEXTURE_BASE = 'http://textures.minecraft.net/texture/'

/** Crafatar API base URL (proxy for CORS) */
export const CRAFATAR_BASE = 'https://crafatar.com'

/** Application routes */
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  LADDER: '/ladder',
  MAP: '/map',
  WIKI: '/wiki',
  WIKI_CLASSES: '/wiki/classes',
  WIKI_ITEMS: '/wiki/items',
  WIKI_ENEMIES: '/wiki/enemies',
  WIKI_ATTRIBUTES: '/wiki/attributes',
  WIKI_ACHIEVEMENTS: '/wiki/achievements',
  WIKI_TERMS: '/wiki/terms',
  WIKI_CARDS: '/wiki/cards',
  WIKI_COMMANDS: '/wiki/commands',
  WIKI_RECIPES: '/wiki/recipes',
  RULES: '/rules',
  GUIDES: '/guides',
  GUILDS: '/guilds',
  CHANGELOG: '/changelog',
  JOIN_TEAM: '/join-team',
  ABOUT: '/about',
  FAQ: '/faq',
  LOGIN: '/login',
  SETTINGS: '/settings',
  STORE: '/store',
  GALLERY: '/gallery',
} as const

/** Site name for page titles */
export const SITE_NAME = 'Requiem'

/** Page titles for browser tab */
export const PAGE_TITLES: Record<string, string> = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.PROFILE]: 'Player Profile',
  [ROUTES.LADDER]: 'Leaderboard',
  [ROUTES.MAP]: 'World Map',
  [ROUTES.WIKI]: 'Wiki',
  [ROUTES.WIKI_CLASSES]: 'Wiki - Classes',
  [ROUTES.WIKI_ITEMS]: 'Wiki - Items',
  [ROUTES.WIKI_ENEMIES]: 'Wiki - Enemies',
  [ROUTES.WIKI_ATTRIBUTES]: 'Wiki - Attributes',
  [ROUTES.WIKI_ACHIEVEMENTS]: 'Wiki - Achievements',
  [ROUTES.WIKI_TERMS]: 'Wiki - Terms',
  [ROUTES.WIKI_CARDS]: 'Wiki - Cards',
  [ROUTES.WIKI_COMMANDS]: 'Wiki - Commands',
  [ROUTES.WIKI_RECIPES]: 'Wiki - Recipes',
  [ROUTES.RULES]: 'Rules',
  [ROUTES.GUIDES]: 'Guides',
  [ROUTES.GUILDS]: 'Guilds',
  [ROUTES.CHANGELOG]: 'Changelog',
  [ROUTES.JOIN_TEAM]: 'Join the Team',
  [ROUTES.ABOUT]: 'About',
  [ROUTES.FAQ]: 'FAQ',
  [ROUTES.LOGIN]: 'Login',
  [ROUTES.SETTINGS]: 'Settings',
  [ROUTES.STORE]: 'Store',
  [ROUTES.GALLERY]: 'Gallery',
}

/** Skin viewer default settings */
export const SKIN_VIEWER_DEFAULTS = {
  /** Default animation state */
  ANIMATE: true,
  /** Default auto-rotate state */
  AUTO_ROTATE: true,
  /** Default running animation state */
  RUNNING: false,
  /** Default cape visibility */
  SHOW_CAPE: true,
  /** Camera field of view */
  CAMERA_FOV: 35,
  /** Camera min distance */
  CAMERA_MIN_DISTANCE: 4,
  /** Camera max distance */
  CAMERA_MAX_DISTANCE: 15,
} as const

/** Minecraft model dimensions (in pixels, 1 unit = 1 pixel) */
export const MODEL_DIMENSIONS = {
  /** Head size */
  HEAD: { width: 8, height: 8, depth: 8 },
  /** Helmet overlay slightly larger */
  HELMET: { width: 9, height: 9, depth: 9 },
  /** Body/torso size */
  BODY: { width: 8, height: 12, depth: 4 },
  /** Arm size (both left and right) */
  ARM: { width: 4, height: 12, depth: 4 },
  /** Leg size (both left and right) */
  LEG: { width: 4, height: 12, depth: 4 },
  /** Cape size */
  CAPE: { width: 10, height: 16, depth: 1 },
} as const

/** Skin texture dimensions */
export const TEXTURE_DIMENSIONS = {
  /** Modern skin format */
  MODERN: { width: 64, height: 64 },
  /** Legacy skin format */
  LEGACY: { width: 64, height: 32 },
  /** Cape texture dimensions */
  CAPE: { width: 64, height: 32 },
} as const

/** Animation timing constants */
export const ANIMATION = {
  /** Idle animation speed multiplier */
  IDLE_SPEED: 3,
  /** Running animation speed multiplier */
  RUN_SPEED: 10,
  /** Head bob speed */
  HEAD_BOB_SPEED: 1.5,
  /** Arm swing amplitude (idle) */
  ARM_SWING_IDLE: 0.5,
  /** Arm swing amplitude (running) */
  ARM_SWING_RUN: 2,
  /** Leg swing amplitude (idle) */
  LEG_SWING_IDLE: 0.33,
  /** Leg swing amplitude (running) */
  LEG_SWING_RUN: 1.4,
} as const

/** Skin loading queue configuration */
export const SKIN_QUEUE = {
  /** Delay between skin loads in milliseconds (rate limit protection) */
  LOAD_DELAY_MS: 500,
  /** Maximum concurrent skin loads */
  MAX_CONCURRENT: 1,
} as const

/** Face preview dimensions (from skin texture) */
export const FACE_TEXTURE = {
  /** Face base layer position in 64x64 skin */
  BASE: { x: 8, y: 8, size: 8 },
  /** Face overlay/mask layer position */
  OVERLAY: { x: 40, y: 8, size: 8 },
} as const

/** Game stats configuration */
export const GAME_STATS = {
  /** Total number of achievements available in the game */
  TOTAL_ACHIEVEMENTS: 100,
} as const

/** External URLs */
export const EXTERNAL_URLS = {
  /** BlueMap world map URLs for different cycles */
  BLUEMAP_NETHER: 'https://bluecolored.de/bluemap/#nether_seethrough',
  BLUEMAP_CURRENT: 'https://bluecolored.de/bluemap/#hermitcraft10',
  BLUEMAP_PREVIOUS: 'https://bluecolored.de/bluemap/#hermitcraft9',
} as const

/** Social sharing configuration */
export const SHARE_CONFIG = {
  /** Website URL to share */
  WEBSITE_URL: 'https://requiem.com',
  /** Default share text */
  SHARE_TEXT: 'Check out Requiem — a custom RPG Minecraft server with unique gameplay mechanics, custom enemies, and an immersive experience!',
  /** Discord invite link */
  DISCORD_INVITE: 'https://discord.com/invite/J5XRqYX',
} as const

/** OpenGraph meta configuration */
export const OG_CONFIG = {
  TITLE: 'Requiem — Custom RPG Minecraft Server',
  DESCRIPTION: 'A custom RPG server featuring unique gameplay mechanics, custom enemies, and an immersive experience. Join the adventure!',
  IMAGE: '/preview.png',
  SITE_NAME: 'Requiem',
  TYPE: 'website',
} as const

/** Map rotation configuration */
export const MAP_ROTATION = {
  /** Cycle duration in days */
  CYCLE_DAYS: 7,
  /** First cycle start date (Monday of the first week) */
  FIRST_CYCLE_START: '2019-03-04T00:00:00Z',
} as const

/** Cycle rules configuration */
export const CYCLE_RULES = {
  next: {
    pvp: false,
    destruction: false,
    preserveInventory: true,
  },
  current: {
    pvp: true,
    destruction: false,
    preserveInventory: false,
  },
  previous: {
    pvp: true,
    destruction: true,
    preserveInventory: false,
  },
} as const

/** Currency configuration */
export const CURRENCY = {
  /** Display name for the currency */
  NAME: 'Qreds',
  /** Mock user balance */
  MOCK_BALANCE: 350,
  /** Coin GIF display settings */
  COIN_GIF: {
    scale: 0.7,
    opacity: 0.45,
  },
} as const

/** Store configuration */
export const STORE = {
  /** Available purchase options (coin amounts) */
  PURCHASE_OPTIONS: [30, 100, 300] as const,
} as const

/** Server version configuration */
export const SERVER_VERSION = {
  /** Minimum supported Minecraft version */
  MIN: '1.16.5',
  /** Maximum supported Minecraft version */
  MAX: '1.21.5',
} as const

/** Server capacity configuration */
export const SERVER_CAPACITY = {
  /** Maximum number of players */
  MAX_PLAYERS: 100,
} as const
