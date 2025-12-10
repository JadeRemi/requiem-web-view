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
} as const

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
  /** BlueMap world map URL */
  BLUEMAP: 'https://bluecolored.de/bluemap/#hermitcraft9:-1771:0:1512:1500:0:0:0:0:perspective',
} as const
