import type { Texture } from 'three'

export interface SkinViewerConfig {
  /** Enable auto-rotation */
  autoRotate: boolean
  /** Enable idle animation */
  animate: boolean
  /** Enable running animation */
  running: boolean
  /** Show cape */
  showCape: boolean
  /** Freeze Y-axis camera movement */
  freezeCameraY: boolean
}

export interface SkinViewerProps {
  /** URL of the skin texture (64x32 or 64x64 PNG) */
  skinUrl?: string
  /** URL of the cape texture */
  capeUrl?: string
  /** Viewer configuration */
  config?: Partial<SkinViewerConfig>
  /** Container width */
  width?: number
  /** Container height */
  height?: number
}

export interface MinecraftCharacterProps {
  /** Skin texture */
  skinTexture: Texture | null
  /** Cape texture */
  capeTexture: Texture | null
  /** Enable idle animation */
  animate: boolean
  /** Enable running animation */
  running: boolean
  /** Show cape mesh */
  showCape: boolean
}

export interface BodyPartProps {
  /** Skin texture for the body part */
  texture: Texture | null
  /** Whether to use transparent material */
  transparent?: boolean
}

/** UV face mapping coordinates */
export interface UVFaceCoords {
  /** X offset in texture pixels */
  x: number
  /** Y offset in texture pixels */
  y: number
  /** Width in texture pixels */
  w: number
  /** Height in texture pixels */
  h: number
}

/** UV mapping for a cube (6 faces) */
export interface CubeUVMap {
  /** Right face (+X) */
  right: UVFaceCoords
  /** Left face (-X) */
  left: UVFaceCoords
  /** Top face (+Y) */
  top: UVFaceCoords
  /** Bottom face (-Y) */
  bottom: UVFaceCoords
  /** Front face (+Z) */
  front: UVFaceCoords
  /** Back face (-Z) */
  back: UVFaceCoords
}

/** Skin texture dimensions */
export interface SkinDimensions {
  width: number
  height: number
}

export const DEFAULT_SKIN_DIMENSIONS: SkinDimensions = {
  width: 64,
  height: 64,
}

export const LEGACY_SKIN_DIMENSIONS: SkinDimensions = {
  width: 64,
  height: 32,
}

export const DEFAULT_CONFIG: SkinViewerConfig = {
  autoRotate: false,
  animate: true,
  running: false,
  showCape: true,
  freezeCameraY: true,
}

