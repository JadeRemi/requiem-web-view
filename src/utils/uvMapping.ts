import { BufferGeometry } from 'three'

/**
 * UV Mapping Utilities for 3D Character Models
 * 
 * COORDINATE SYSTEM (matching legacy):
 * - X axis: Forward/Back (front of character faces +X)
 * - Y axis: Up/Down
 * - Z axis: Left/Right
 * 
 * MODERN THREE.JS BoxGeometry:
 * Face vertex order when viewed from outside:
 *   2 --- 3
 *   |     |
 *   0 --- 1
 * 
 * Vertex positions: 0=bottom-left, 1=bottom-right, 2=top-left, 3=top-right
 * 
 * Face indices in UV attribute buffer:
 *   0-3:   +X (right)
 *   4-7:   -X (left)
 *   8-11:  +Y (top)
 *   12-15: -Y (bottom)
 *   16-19: +Z (front)
 *   20-23: -Z (back)
 */

/** UV face coordinates in texture pixels */
export interface UVFaceCoords {
  x: number
  y: number
  w: number  // Negative = flip horizontally
  h: number  // Negative = flip vertically
}

/** Dimensions for UV calculation */
export interface TextureDimensions {
  width: number
  height: number
}

const DEFAULT_TEXTURE_SIZE: TextureDimensions = { width: 64, height: 64 }

/** Modern BoxGeometry face start indices */
const FACE_START = {
  px: 0,   // +X (right side of cube)
  nx: 4,   // -X (left side)
  py: 8,   // +Y (top)
  ny: 12,  // -Y (bottom)
  pz: 16,  // +Z (front)
  nz: 20,  // -Z (back)
} as const

type FaceName = 'px' | 'nx' | 'py' | 'ny' | 'pz' | 'nz'

/**
 * Apply UV mapping to a single face
 * 
 * @param geometry - BoxGeometry to modify
 * @param face - Face name (px, nx, py, ny, pz, nz)
 * @param coords - Texture coordinates in pixels
 * @param texSize - Texture dimensions
 * @param rotate - Rotation in 90° steps (0-3)
 */
function applyFaceUV(
  geometry: BufferGeometry,
  face: FaceName,
  coords: UVFaceCoords,
  texSize: TextureDimensions,
  rotate = 0
): void {
  const uvAttr = geometry.getAttribute('uv')
  if (!uvAttr) return

  const startIdx = FACE_START[face]

  // Convert pixel coords to UV (0-1 range)
  // UV origin is bottom-left, texture origin is top-left
  const u0 = coords.x / texSize.width
  const u1 = (coords.x + coords.w) / texSize.width
  const v0 = 1 - coords.y / texSize.height           // top of texture region
  const v1 = 1 - (coords.y + coords.h) / texSize.height  // bottom of texture region

  // UV coordinates for each vertex position
  // BoxGeometry vertex order: 0=bottom-left, 1=bottom-right, 2=top-left, 3=top-right
  const baseUVs: [number, number][] = [
    [u0, v1],  // vertex 0: bottom-left
    [u1, v1],  // vertex 1: bottom-right
    [u0, v0],  // vertex 2: top-left
    [u1, v0],  // vertex 3: top-right
  ]

  // Apply rotation (each step = 90° clockwise when viewing face)
  // Rotation shifts which UV coordinate goes to which vertex
  const rotatedUVs = rotateUVs(baseUVs, rotate)

  for (let i = 0; i < 4; i++) {
    const uv = rotatedUVs[i]
    if (uv) {
      uvAttr.setXY(startIdx + i, uv[0], uv[1])
    }
  }

  uvAttr.needsUpdate = true
}

/**
 * Rotate UV array by 90° steps
 */
function rotateUVs(uvs: [number, number][], steps: number): [number, number][] {
  if (steps === 0) return uvs
  
  const s = ((steps % 4) + 4) % 4  // Normalize to 0-3
  
  // Rotation maps: which vertex gets which UV after rotation
  // For clockwise rotation when viewing face from outside
  const rotationMaps: [number, number, number, number][] = [
    [0, 1, 2, 3],  // 0: No rotation
    [1, 3, 0, 2],  // 1: 90° CW
    [3, 2, 1, 0],  // 2: 180°
    [2, 0, 3, 1],  // 3: 270° CW (90° CCW)
  ]

  const map = rotationMaps[s]
  if (!map) return uvs

  const fallback: [number, number] = [0, 0]
  return [
    uvs[map[0]] ?? fallback,
    uvs[map[1]] ?? fallback,
    uvs[map[2]] ?? fallback,
    uvs[map[3]] ?? fallback,
  ]
}

/**
 * Skin texture layout reference:
 * 
 * HEAD (0-31, 0-15):
 *        8   16  24
 *     +---+---+
 *     | T |Bot|        y: 0-7
 * +---+---+---+---+
 * | L | F | R | Bk|    y: 8-15
 * +---+---+---+---+
 * 0   8   16  24  32
 * 
 * T=Top, Bot=Bottom, L=Left, F=Front, R=Right, Bk=Back
 */

export interface CubeUVConfig {
  /** +X face (front in character space) */
  front: UVFaceCoords
  /** -X face (back) */
  back: UVFaceCoords
  /** +Y face (top) */
  top: UVFaceCoords
  /** -Y face (bottom) */
  bottom: UVFaceCoords
  /** +Z face (right side of character) */
  right: UVFaceCoords
  /** -Z face (left side of character) */
  left: UVFaceCoords
}

export interface CubeRotations {
  front?: number
  back?: number
  top?: number
  bottom?: number
  right?: number
  left?: number
}

/**
 * Apply UV mapping to all faces of a BoxGeometry
 * Uses character-space naming: front/back/top/bottom/left/right
 * 
 * Character coordinate system:
 * - Front of character faces +X
 * - Top of character is +Y
 * - Right side of character is +Z
 */
export function applyCubeUVs(
  geometry: BufferGeometry,
  uvs: CubeUVConfig,
  texSize: TextureDimensions = DEFAULT_TEXTURE_SIZE,
  rotations: CubeRotations = {}
): void {
  // Map character space to BoxGeometry faces
  // Character front (+X) = BoxGeometry +X face
  applyFaceUV(geometry, 'px', uvs.front, texSize, rotations.front ?? 0)
  applyFaceUV(geometry, 'nx', uvs.back, texSize, rotations.back ?? 0)
  applyFaceUV(geometry, 'py', uvs.top, texSize, rotations.top ?? 0)
  applyFaceUV(geometry, 'ny', uvs.bottom, texSize, rotations.bottom ?? 0)
  applyFaceUV(geometry, 'pz', uvs.right, texSize, rotations.right ?? 0)
  applyFaceUV(geometry, 'nz', uvs.left, texSize, rotations.left ?? 0)
}

/*
 * ===========================================
 * PRESET UV CONFIGURATIONS
 * ===========================================
 */

/** Head UV mapping (8x8x8) */
export function getHeadUVConfig(): CubeUVConfig {
  return {
    front: { x: 8, y: 8, w: 8, h: 8 },
    back: { x: 24, y: 8, w: 8, h: 8 },
    top: { x: 8, y: 0, w: 8, h: 8 },
    bottom: { x: 16, y: 0, w: 8, h: 8 },
    left: { x: 0, y: 8, w: 8, h: 8 },
    right: { x: 16, y: 8, w: 8, h: 8 },
  }
}

/** Helmet/overlay UV mapping - offset by 32px */
export function getHelmetUVConfig(): CubeUVConfig {
  return {
    front: { x: 40, y: 8, w: 8, h: 8 },
    back: { x: 56, y: 8, w: 8, h: 8 },
    top: { x: 40, y: 0, w: 8, h: 8 },
    bottom: { x: 48, y: 0, w: 8, h: 8 },
    left: { x: 32, y: 8, w: 8, h: 8 },
    right: { x: 48, y: 8, w: 8, h: 8 },
  }
}

/** Body UV mapping (4x12x8) */
export function getBodyUVConfig(): CubeUVConfig {
  return {
    front: { x: 20, y: 20, w: 8, h: 12 },
    back: { x: 32, y: 20, w: 8, h: 12 },
    top: { x: 20, y: 16, w: 8, h: 4 },
    bottom: { x: 28, y: 16, w: 8, h: 4 },
    left: { x: 16, y: 20, w: 4, h: 12 },
    right: { x: 28, y: 20, w: 4, h: 12 },
  }
}

/** Right arm UV mapping (4x12x4) */
export function getRightArmUVConfig(): CubeUVConfig {
  return {
    front: { x: 44, y: 20, w: 4, h: 12 },
    back: { x: 52, y: 20, w: 4, h: 12 },
    top: { x: 44, y: 16, w: 4, h: 4 },
    bottom: { x: 48, y: 16, w: 4, h: 4 },
    left: { x: 40, y: 20, w: 4, h: 12 },
    right: { x: 48, y: 20, w: 4, h: 12 },
  }
}

/** Left arm UV mapping (4x12x4) - uses 64x64 skin region */
export function getLeftArmUVConfig(): CubeUVConfig {
  return {
    front: { x: 36, y: 52, w: 4, h: 12 },
    back: { x: 44, y: 52, w: 4, h: 12 },
    top: { x: 36, y: 48, w: 4, h: 4 },
    bottom: { x: 40, y: 48, w: 4, h: 4 },
    left: { x: 32, y: 52, w: 4, h: 12 },
    right: { x: 40, y: 52, w: 4, h: 12 },
  }
}

/** Right leg UV mapping (4x12x4) */
export function getRightLegUVConfig(): CubeUVConfig {
  return {
    front: { x: 4, y: 20, w: 4, h: 12 },
    back: { x: 12, y: 20, w: 4, h: 12 },
    top: { x: 4, y: 16, w: 4, h: 4 },
    bottom: { x: 8, y: 16, w: 4, h: 4 },
    left: { x: 0, y: 20, w: 4, h: 12 },
    right: { x: 8, y: 20, w: 4, h: 12 },
  }
}

/** Left leg UV mapping (4x12x4) - uses 64x64 skin region */
export function getLeftLegUVConfig(): CubeUVConfig {
  return {
    front: { x: 20, y: 52, w: 4, h: 12 },
    back: { x: 28, y: 52, w: 4, h: 12 },
    top: { x: 20, y: 48, w: 4, h: 4 },
    bottom: { x: 24, y: 48, w: 4, h: 4 },
    left: { x: 16, y: 52, w: 4, h: 12 },
    right: { x: 24, y: 52, w: 4, h: 12 },
  }
}

/** Cape UV mapping (1x16x10) */
export function getCapeUVConfig(): CubeUVConfig {
  return {
    front: { x: 1, y: 1, w: 10, h: 16 },
    back: { x: 12, y: 1, w: 10, h: 16 },
    top: { x: 1, y: 0, w: 10, h: 1 },
    bottom: { x: 11, y: 0, w: 10, h: 1 },
    left: { x: 0, y: 1, w: 1, h: 16 },
    right: { x: 11, y: 1, w: 1, h: 16 },
  }
}

// Legacy compatibility exports
export const applyFullCubeUV = applyCubeUVs
export const getHeadUVs = () => {
  const c = getHeadUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}
export const getHelmetUVs = () => {
  const c = getHelmetUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}
export const getBodyUVs = () => {
  const c = getBodyUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}
export const getRightArmUVs = () => {
  const c = getRightArmUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}
export const getLeftArmUVs = () => {
  const c = getLeftArmUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}
export const getRightLegUVs = () => {
  const c = getRightLegUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}
export const getLeftLegUVs = () => {
  const c = getLeftLegUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}
export const getCapeUVs = () => {
  const c = getCapeUVConfig()
  return [c.front, c.back, c.top, c.bottom, c.left, c.right] as const
}

// Rotation presets
export const getHeadRotations = () => ({ top: 0, bottom: 2 })
export const getBodyRotations = () => ({ top: 0, bottom: 2 })
export const getRightArmRotations = () => ({ top: 0, bottom: 2 })
export const getRightLegRotations = () => ({ top: 0, bottom: 2 })
export const getCapeRotations = () => ({})
