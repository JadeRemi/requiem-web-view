import { BufferGeometry } from 'three'
import type { UVFaceCoords, SkinDimensions } from '../types/skin'

/**
 * Standard Minecraft skin texture dimensions
 */
const TEXTURE_WIDTH = 64
const TEXTURE_HEIGHT = 64

/**
 * Face indices for BoxGeometry in Three.js
 * Each face has 2 triangles, so 6 vertices per face
 */
const FACE_ORDER = {
  right: 0,  // +X
  left: 1,   // -X
  top: 2,    // +Y
  bottom: 3, // -Y
  front: 4,  // +Z
  back: 5,   // -Z
} as const

type FaceName = keyof typeof FACE_ORDER

/**
 * Apply UV mapping to a specific face of a BoxGeometry
 */
export function applyUVToFace(
  geometry: BufferGeometry,
  face: FaceName,
  coords: UVFaceCoords,
  dimensions: SkinDimensions = { width: TEXTURE_WIDTH, height: TEXTURE_HEIGHT },
  flipX = false,
  flipY = false
): void {
  const uvAttribute = geometry.getAttribute('uv')
  if (!uvAttribute) return

  const faceIndex = FACE_ORDER[face]
  const startVertex = faceIndex * 4

  // Convert pixel coordinates to UV coordinates (0-1 range)
  // UV origin is bottom-left, texture origin is top-left
  let u0 = coords.x / dimensions.width
  let u1 = (coords.x + coords.w) / dimensions.width
  let v0 = 1 - coords.y / dimensions.height
  let v1 = 1 - (coords.y + coords.h) / dimensions.height

  if (flipX) {
    const temp = u0
    u0 = u1
    u1 = temp
  }

  if (flipY) {
    const temp = v0
    v0 = v1
    v1 = temp
  }

  // BoxGeometry face vertex order: top-left, bottom-left, top-right, bottom-right
  const uvs: [number, number][] = [
    [u0, v0], // top-left
    [u0, v1], // bottom-left
    [u1, v0], // top-right
    [u1, v1], // bottom-right
  ]

  for (let i = 0; i < 4; i++) {
    uvAttribute.setXY(startVertex + i, uvs[i][0], uvs[i][1])
  }

  uvAttribute.needsUpdate = true
}

/**
 * Apply full cube UV mapping using Minecraft skin layout
 */
export function applyCubeUV(
  geometry: BufferGeometry,
  uvMap: Record<FaceName, UVFaceCoords>,
  dimensions?: SkinDimensions
): void {
  const faces: FaceName[] = ['right', 'left', 'top', 'bottom', 'front', 'back']
  
  for (const face of faces) {
    applyUVToFace(geometry, face, uvMap[face], dimensions)
  }
}

/**
 * Create UV coordinates for Minecraft head (8x8x8)
 */
export function getHeadUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 0, y: 8, w: 8, h: 8 },
    left: { x: 16, y: 8, w: 8, h: 8 },
    top: { x: 8, y: 0, w: 8, h: 8 },
    bottom: { x: 16, y: 0, w: 8, h: 8 },
    front: { x: 8, y: 8, w: 8, h: 8 },
    back: { x: 24, y: 8, w: 8, h: 8 },
  }
}

/**
 * Create UV coordinates for Minecraft head overlay/helmet (8x8x8)
 */
export function getHelmetUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 32, y: 8, w: 8, h: 8 },
    left: { x: 48, y: 8, w: 8, h: 8 },
    top: { x: 40, y: 0, w: 8, h: 8 },
    bottom: { x: 48, y: 0, w: 8, h: 8 },
    front: { x: 40, y: 8, w: 8, h: 8 },
    back: { x: 56, y: 8, w: 8, h: 8 },
  }
}

/**
 * Create UV coordinates for Minecraft body (8x12x4)
 */
export function getBodyUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 16, y: 20, w: 4, h: 12 },
    left: { x: 28, y: 20, w: 4, h: 12 },
    top: { x: 20, y: 16, w: 8, h: 4 },
    bottom: { x: 28, y: 16, w: 8, h: 4 },
    front: { x: 20, y: 20, w: 8, h: 12 },
    back: { x: 32, y: 20, w: 8, h: 12 },
  }
}

/**
 * Create UV coordinates for Minecraft right arm (4x12x4)
 */
export function getRightArmUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 40, y: 20, w: 4, h: 12 },
    left: { x: 48, y: 20, w: 4, h: 12 },
    top: { x: 44, y: 16, w: 4, h: 4 },
    bottom: { x: 48, y: 16, w: 4, h: 4 },
    front: { x: 44, y: 20, w: 4, h: 12 },
    back: { x: 52, y: 20, w: 4, h: 12 },
  }
}

/**
 * Create UV coordinates for Minecraft left arm (4x12x4)
 * For 64x64 skins, left arm has its own UV area
 */
export function getLeftArmUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 32, y: 52, w: 4, h: 12 },
    left: { x: 40, y: 52, w: 4, h: 12 },
    top: { x: 36, y: 48, w: 4, h: 4 },
    bottom: { x: 40, y: 48, w: 4, h: 4 },
    front: { x: 36, y: 52, w: 4, h: 12 },
    back: { x: 44, y: 52, w: 4, h: 12 },
  }
}

/**
 * Create UV coordinates for Minecraft right leg (4x12x4)
 */
export function getRightLegUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 0, y: 20, w: 4, h: 12 },
    left: { x: 8, y: 20, w: 4, h: 12 },
    top: { x: 4, y: 16, w: 4, h: 4 },
    bottom: { x: 8, y: 16, w: 4, h: 4 },
    front: { x: 4, y: 20, w: 4, h: 12 },
    back: { x: 12, y: 20, w: 4, h: 12 },
  }
}

/**
 * Create UV coordinates for Minecraft left leg (4x12x4)
 * For 64x64 skins, left leg has its own UV area
 */
export function getLeftLegUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 16, y: 52, w: 4, h: 12 },
    left: { x: 24, y: 52, w: 4, h: 12 },
    top: { x: 20, y: 48, w: 4, h: 4 },
    bottom: { x: 24, y: 48, w: 4, h: 4 },
    front: { x: 20, y: 52, w: 4, h: 12 },
    back: { x: 28, y: 52, w: 4, h: 12 },
  }
}

/**
 * Create UV coordinates for cape (10x16x1)
 */
export function getCapeUV(): Record<FaceName, UVFaceCoords> {
  return {
    right: { x: 0, y: 1, w: 1, h: 16 },
    left: { x: 11, y: 1, w: 1, h: 16 },
    top: { x: 1, y: 0, w: 10, h: 1 },
    bottom: { x: 11, y: 0, w: 10, h: 1 },
    front: { x: 1, y: 1, w: 10, h: 16 },
    back: { x: 12, y: 1, w: 10, h: 16 },
  }
}

