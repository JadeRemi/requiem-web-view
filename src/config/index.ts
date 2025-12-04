/**
 * Global Project Configuration
 * All project-wide constants and configuration values
 */

/** Default skin hashes for preset characters */
export const PRESET_SKINS = {
  /** Steve - default male skin */
  STEVE: '8667ba71-b85a-4004-af54-457a9734eed7',
  /** Alex - default female skin */
  ALEX: '6ab43178-89fd-4905-97f6-0f67d9d76fd9',
} as const

/** Minecraft texture server base URL */
export const MINECRAFT_TEXTURE_BASE = 'http://textures.minecraft.net/texture/'

/** Crafatar API base URL (proxy for CORS) */
export const CRAFATAR_BASE = 'https://crafatar.com'

/** Application routes */
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
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
  CAMERA_FOV: 45,
  /** Camera min distance */
  CAMERA_MIN_DISTANCE: 2,
  /** Camera max distance */
  CAMERA_MAX_DISTANCE: 10,
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

