import { BufferGeometry } from 'three'

/**
 * UV Mapping Utilities - Exact port from legacy Three.js
 * 
 * Legacy Three.js CubeGeometry face indices:
 *   0 = Front  (+X)
 *   1 = Back   (-X)
 *   2 = Top    (+Y)
 *   3 = Bottom (-Y)
 *   4 = Left   (+Z)
 *   5 = Right  (-Z)
 * 
 * Modern Three.js BoxGeometry UV attribute face order:
 *   0-3:   +X
 *   4-7:   -X
 *   8-11:  +Y
 *   12-15: -Y
 *   16-19: +Z
 *   20-23: -Z
 * 
 * Legacy UV coordinate system: V=0 at top of texture
 * Modern UV coordinate system: V=0 at bottom of texture
 * So we need: modern_v = 1 - legacy_v
 * 
 * Legacy vertex order per face: 0=top-left, 1=bottom-left, 2=bottom-right, 3=top-right
 * Modern vertex order per face: 0=bottom-left, 1=bottom-right, 2=top-left, 3=top-right
 * Mapping: legacy[0,1,2,3] -> modern[2,0,1,3]
 */

/** UV face coordinates in texture pixels */
export interface UVFaceCoords {
  x: number
  y: number
  w: number
  h: number
}

/** Dimensions for UV calculation */
export interface TextureDimensions {
  width: number
  height: number
}

/** Legacy face index to modern UV attribute start index */
const LEGACY_TO_MODERN_FACE: Record<number, number> = {
  0: 0,   // Front (+X) -> +X
  1: 4,   // Back (-X) -> -X
  2: 8,   // Top (+Y) -> +Y
  3: 12,  // Bottom (-Y) -> -Y
  4: 16,  // Left (+Z) -> +Z
  5: 20,  // Right (-Z) -> -Z
}

/**
 * Apply UV mapping to a face - exact port of legacy uvmap function
 * 
 * @param geometry - BoxGeometry to modify
 * @param legacyFace - Legacy face index (0-5)
 * @param x - Texture X in pixels
 * @param y - Texture Y in pixels
 * @param w - Width in pixels (negative = flip)
 * @param h - Height in pixels (negative = flip)
 * @param texWidth - Texture width
 * @param texHeight - Texture height
 * @param rotateBy - Rotation in 90° steps (0-3)
 */
export function uvmap(
  geometry: BufferGeometry,
  legacyFace: number,
  x: number,
  y: number,
  w: number,
  h: number,
  texWidth: number,
  texHeight: number,
  rotateBy = 0
): void {
  const uvAttr = geometry.getAttribute('uv')
  if (!uvAttr) return

  const startIdx = LEGACY_TO_MODERN_FACE[legacyFace]
  if (startIdx === undefined) return

  // Calculate UV coordinates exactly like legacy
  // tileUvWidth = 1 / WIDTH, tileUvHeight = 1 / HEIGHT
  const tileUvWidth = 1 / texWidth
  const tileUvHeight = 1 / texHeight

  // Legacy UV coordinates (V=0 at top)
  // To fix 180° rotation: swap the diagonal - put bottom-right where top-left was, etc.
  // Original: 0=top-left, 1=bottom-left, 2=bottom-right, 3=top-right
  // Rotated 180°: 0=bottom-right, 1=top-right, 2=top-left, 3=bottom-left
  const u0 = x * tileUvWidth
  const u1 = x * tileUvWidth + w * tileUvWidth
  const v0 = y * tileUvHeight
  const v1 = y * tileUvHeight + h * tileUvHeight
  
  const legacyUVs: [number, number][] = [
    [u1, v1],  // 0: was top-left, now bottom-right
    [u1, v0],  // 1: was bottom-left, now top-right
    [u0, v0],  // 2: was bottom-right, now top-left
    [u0, v1],  // 3: was top-right, now bottom-left
  ]

  // Apply rotation (legacy style: vertex (i + rotateBy) % 4 gets UV i)
  const rotatedLegacyUVs: [number, number][] = [
    legacyUVs[(0 - rotateBy + 4) % 4] ?? [0, 0],
    legacyUVs[(1 - rotateBy + 4) % 4] ?? [0, 0],
    legacyUVs[(2 - rotateBy + 4) % 4] ?? [0, 0],
    legacyUVs[(3 - rotateBy + 4) % 4] ?? [0, 0],
  ]

  // Convert to modern UV system (V = 1 - legacy_V)
  // And map legacy vertex order to modern vertex order
  // Legacy: 0=top-left, 1=bottom-left, 2=bottom-right, 3=top-right
  // Modern: 0=bottom-left, 1=bottom-right, 2=top-left, 3=top-right
  // So: modern[0] <- legacy[1], modern[1] <- legacy[2], modern[2] <- legacy[0], modern[3] <- legacy[3]
  const modernUVs: [number, number][] = [
    [rotatedLegacyUVs[1]![0], 1 - rotatedLegacyUVs[1]![1]], // modern 0 <- legacy 1
    [rotatedLegacyUVs[2]![0], 1 - rotatedLegacyUVs[2]![1]], // modern 1 <- legacy 2
    [rotatedLegacyUVs[0]![0], 1 - rotatedLegacyUVs[0]![1]], // modern 2 <- legacy 0
    [rotatedLegacyUVs[3]![0], 1 - rotatedLegacyUVs[3]![1]], // modern 3 <- legacy 3
  ]

  // Apply to UV attribute
  for (let i = 0; i < 4; i++) {
    const uv = modernUVs[i]
    if (uv) {
      uvAttr.setXY(startIdx + i, uv[0], uv[1])
    }
  }

  uvAttr.needsUpdate = true
}

/**
 * Apply HEAD UV mapping (8x8x8 cube)
 */
export function applyHeadUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 8 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)      // Front
  uvmap(geometry, 1, 24 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)     // Back
  uvmap(geometry, 2, 8 * scale, 0 * scale, 8 * scale, 8 * scale, texSize, texSize, 1)   // Top
  uvmap(geometry, 3, 16 * scale, 0 * scale, 8 * scale, 8 * scale, texSize, texSize, 3)  // Bottom
  uvmap(geometry, 4, 0 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)      // Left
  uvmap(geometry, 5, 16 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)     // Right
}

/**
 * Apply HELMET/HAT UV mapping (overlay layer)
 */
export function applyHelmetUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 40 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)     // Front
  uvmap(geometry, 1, 56 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)     // Back
  uvmap(geometry, 2, 40 * scale, 0 * scale, 8 * scale, 8 * scale, texSize, texSize, 1)  // Top
  uvmap(geometry, 3, 48 * scale, 0 * scale, 8 * scale, 8 * scale, texSize, texSize, 3)  // Bottom
  uvmap(geometry, 4, 32 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)     // Left
  uvmap(geometry, 5, 48 * scale, 8 * scale, 8 * scale, 8 * scale, texSize, texSize)     // Right
}

/**
 * Apply BODY UV mapping (4x12x8)
 */
export function applyBodyUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 20 * scale, 20 * scale, 8 * scale, 12 * scale, texSize, texSize)    // Front
  uvmap(geometry, 1, 32 * scale, 20 * scale, 8 * scale, 12 * scale, texSize, texSize)    // Back
  uvmap(geometry, 2, 20 * scale, 16 * scale, 8 * scale, 4 * scale, texSize, texSize, 1)  // Top
  uvmap(geometry, 3, 28 * scale, 16 * scale, 8 * scale, 4 * scale, texSize, texSize, 3)  // Bottom
  uvmap(geometry, 4, 16 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)    // Left
  uvmap(geometry, 5, 28 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)    // Right
}

/**
 * Apply RIGHT ARM UV mapping (4x12x4)
 */
export function applyRightArmUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 44 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)    // Front
  uvmap(geometry, 1, 52 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)    // Back
  uvmap(geometry, 2, 44 * scale, 16 * scale, 4 * scale, 4 * scale, texSize, texSize, 1)  // Top
  uvmap(geometry, 3, 48 * scale, 20 * scale, 4 * scale, -4 * scale, texSize, texSize, 3) // Bottom
  uvmap(geometry, 4, 40 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)    // Left
  uvmap(geometry, 5, 48 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)    // Right
}

/**
 * Apply LEFT ARM UV mapping (4x12x4) - mirrored
 */
export function applyLeftArmUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 48 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)   // Front (mirrored)
  uvmap(geometry, 1, 56 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)   // Back (mirrored)
  uvmap(geometry, 2, 48 * scale, 16 * scale, -4 * scale, 4 * scale, texSize, texSize, 1) // Top
  uvmap(geometry, 3, 52 * scale, 20 * scale, -4 * scale, -4 * scale, texSize, texSize, 3)// Bottom
  uvmap(geometry, 4, 52 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)   // Left (mirrored)
  uvmap(geometry, 5, 44 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)   // Right (mirrored)
}

/**
 * Apply RIGHT LEG UV mapping (4x12x4)
 */
export function applyRightLegUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 4 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)     // Front
  uvmap(geometry, 1, 12 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)    // Back
  uvmap(geometry, 2, 8 * scale, 16 * scale, -4 * scale, 4 * scale, texSize, texSize, 3)  // Top
  uvmap(geometry, 3, 12 * scale, 16 * scale, -4 * scale, 4 * scale, texSize, texSize, 1) // Bottom
  uvmap(geometry, 4, 0 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)     // Left
  uvmap(geometry, 5, 8 * scale, 20 * scale, 4 * scale, 12 * scale, texSize, texSize)     // Right
}

/**
 * Apply LEFT LEG UV mapping (4x12x4) - mirrored
 */
export function applyLeftLegUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 8 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)    // Front (mirrored)
  uvmap(geometry, 1, 16 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)   // Back (mirrored)
  uvmap(geometry, 2, 4 * scale, 16 * scale, 4 * scale, 4 * scale, texSize, texSize, 3)   // Top
  uvmap(geometry, 3, 8 * scale, 16 * scale, 4 * scale, 4 * scale, texSize, texSize, 1)   // Bottom
  uvmap(geometry, 4, 12 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)   // Left (mirrored)
  uvmap(geometry, 5, 4 * scale, 20 * scale, -4 * scale, 12 * scale, texSize, texSize)    // Right (mirrored)
}

/**
 * Apply CAPE UV mapping (1x16x10)
 */
export function applyCapeUVs(geometry: BufferGeometry, texSize = 64): void {
  const scale = texSize / 64
  uvmap(geometry, 0, 1 * scale, 1 * scale, 10 * scale, 16 * scale, texSize, 32)    // Front
  uvmap(geometry, 1, 12 * scale, 1 * scale, 10 * scale, 16 * scale, texSize, 32)   // Back
  uvmap(geometry, 2, 1 * scale, 0 * scale, 10 * scale, 1 * scale, texSize, 32)     // Top
  uvmap(geometry, 3, 11 * scale, 0 * scale, 10 * scale, 1 * scale, texSize, 32, 1) // Bottom
  uvmap(geometry, 4, 0 * scale, 1 * scale, 1 * scale, 16 * scale, texSize, 32)     // Left
  uvmap(geometry, 5, 11 * scale, 1 * scale, 1 * scale, 16 * scale, texSize, 32)    // Right
}

// Legacy export aliases for compatibility
export interface CubeUVConfig {
  front: UVFaceCoords
  back: UVFaceCoords
  top: UVFaceCoords
  bottom: UVFaceCoords
  right: UVFaceCoords
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

export function applyCubeUVs(
  geometry: BufferGeometry,
  uvs: CubeUVConfig,
  texSize: TextureDimensions = { width: 64, height: 64 },
  rotations: CubeRotations = {}
): void {
  uvmap(geometry, 0, uvs.front.x, uvs.front.y, uvs.front.w, uvs.front.h, texSize.width, texSize.height, rotations.front ?? 0)
  uvmap(geometry, 1, uvs.back.x, uvs.back.y, uvs.back.w, uvs.back.h, texSize.width, texSize.height, rotations.back ?? 0)
  uvmap(geometry, 2, uvs.top.x, uvs.top.y, uvs.top.w, uvs.top.h, texSize.width, texSize.height, rotations.top ?? 0)
  uvmap(geometry, 3, uvs.bottom.x, uvs.bottom.y, uvs.bottom.w, uvs.bottom.h, texSize.width, texSize.height, rotations.bottom ?? 0)
  uvmap(geometry, 4, uvs.left.x, uvs.left.y, uvs.left.w, uvs.left.h, texSize.width, texSize.height, rotations.left ?? 0)
  uvmap(geometry, 5, uvs.right.x, uvs.right.y, uvs.right.w, uvs.right.h, texSize.width, texSize.height, rotations.right ?? 0)
}
