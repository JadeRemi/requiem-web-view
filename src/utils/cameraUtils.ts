import type { Camera } from 'three'

/**
 * Camera position utilities for 3D model viewing
 */

/** Default camera distance from model */
export const DEFAULT_CAMERA_DISTANCE = 4

/**
 * Calculate camera position to view model from front
 * Models are authored facing -Z, so camera should be at -Z to see the front
 *
 * @param targetY - Y position the camera should look at
 * @param distance - Distance from target (default: 4)
 * @returns Camera position as [x, y, z] tuple
 */
export function getFrontViewCameraPosition(
  targetY: number,
  distance: number = DEFAULT_CAMERA_DISTANCE
): [number, number, number] {
  return [0, targetY, -distance]
}

/**
 * Calculate camera position to view model from back
 * Camera at +Z sees the back of models (they face -Z)
 *
 * @param targetY - Y position the camera should look at
 * @param distance - Distance from target (default: 4)
 * @returns Camera position as [x, y, z] tuple
 */
export function getBackViewCameraPosition(
  targetY: number,
  distance: number = DEFAULT_CAMERA_DISTANCE
): [number, number, number] {
  return [0, targetY, distance]
}

/**
 * Apply front view position to camera
 *
 * @param camera - Three.js camera
 * @param targetY - Y position to look at
 * @param distance - Distance from target
 */
export function applyCameraFrontView(
  camera: Camera,
  targetY: number,
  distance: number = DEFAULT_CAMERA_DISTANCE
): void {
  const [x, y, z] = getFrontViewCameraPosition(targetY, distance)
  camera.position.set(x, y, z)
  camera.lookAt(0, targetY, 0)
}
