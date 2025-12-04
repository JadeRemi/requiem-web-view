import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Group,
  BoxGeometry,
  MeshStandardMaterial,
  NearestFilter,
  Texture,
  DoubleSide,
  FrontSide,
} from 'three'
import type { MinecraftCharacterProps } from '../types/skin'
import {
  applyCubeUV,
  getHeadUV,
  getHelmetUV,
  getBodyUV,
  getRightArmUV,
  getLeftArmUV,
  getRightLegUV,
  getLeftLegUV,
  getCapeUV,
} from '../utils/uvMapping'
import { ANIMATION } from '../config'

/**
 * Scale factor: converts Minecraft pixels to Three.js units
 * 1 Minecraft pixel = 1/8 Three.js unit
 */
const SCALE = 1 / 8

interface BodyPartMeshProps {
  geometry: BoxGeometry
  texture: Texture | null
  transparent?: boolean
  position?: [number, number, number]
}

function BodyPartMesh({ geometry, texture, transparent = false, position }: BodyPartMeshProps) {
  const material = useMemo(() => {
    const mat = new MeshStandardMaterial({
      map: texture,
      transparent,
      alphaTest: transparent ? 0.1 : 0,
      side: transparent ? DoubleSide : FrontSide,
    })
    if (texture) {
      texture.magFilter = NearestFilter
      texture.minFilter = NearestFilter
      texture.needsUpdate = true
    }
    return mat
  }, [texture, transparent])

  useEffect(() => {
    if (texture && material.map) {
      material.map.needsUpdate = true
      material.needsUpdate = true
    }
  }, [texture, material])

  return <mesh geometry={geometry} material={material} position={position} />
}

/**
 * MinecraftCharacter Component
 * 
 * Renders a 3D Minecraft character model with proper UV mapping.
 * 
 * Coordinate System (matching legacy code):
 * - X axis: forward/back (front of character faces +X)
 * - Y axis: up/down
 * - Z axis: left/right
 * 
 * Body part order in legacy CubeGeometry: (depth, height, width) = (x, y, z)
 */
export function MinecraftCharacter({
  skinTexture,
  capeTexture,
  animate,
  running,
  showCape,
}: MinecraftCharacterProps) {
  const playerGroupRef = useRef<Group>(null)
  const headRef = useRef<Group>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)
  const leftLegRef = useRef<Group>(null)
  const rightLegRef = useRef<Group>(null)
  const capeRef = useRef<Group>(null)

  // Create geometries with UV mapping
  // Legacy format: CubeGeometry(depth, height, width) where depth is X-axis
  // Modern Three.js BoxGeometry(width, height, depth) where width is X-axis
  // We need to match legacy orientation where X is forward
  const geometries = useMemo(() => {
    // Head (8x8x8) - same all dimensions
    const headGeo = new BoxGeometry(8, 8, 8)
    applyCubeUV(headGeo, getHeadUV())

    // Helmet overlay (slightly larger)
    const helmetGeo = new BoxGeometry(9, 9, 9)
    applyCubeUV(helmetGeo, getHelmetUV())

    // Body: legacy was CubeGeometry(4, 12, 8) = (depth=4, height=12, width=8)
    // Modern BoxGeometry(width, height, depth) so we need (8, 12, 4)
    // But to match legacy orientation where front faces X+, we use (4, 12, 8)
    const bodyGeo = new BoxGeometry(4, 12, 8)
    applyCubeUV(bodyGeo, getBodyUV())

    // Right arm: legacy CubeGeometry(4, 12, 4)
    // Pivot shifted to top for rotation
    const rightArmGeo = new BoxGeometry(4, 12, 4)
    rightArmGeo.translate(0, -6, 0) // Shift pivot to top
    applyCubeUV(rightArmGeo, getRightArmUV())

    // Left arm: legacy CubeGeometry(4, 12, 4)
    const leftArmGeo = new BoxGeometry(4, 12, 4)
    leftArmGeo.translate(0, -6, 0)
    applyCubeUV(leftArmGeo, getLeftArmUV())

    // Right leg: legacy CubeGeometry(4, 12, 4)
    const rightLegGeo = new BoxGeometry(4, 12, 4)
    rightLegGeo.translate(0, -6, 0)
    applyCubeUV(rightLegGeo, getRightLegUV())

    // Left leg: legacy CubeGeometry(4, 12, 4)
    const leftLegGeo = new BoxGeometry(4, 12, 4)
    leftLegGeo.translate(0, -6, 0)
    applyCubeUV(leftLegGeo, getLeftLegUV())

    // Cape: legacy CubeGeometry(1, 16, 10) = (depth=1, height=16, width=10)
    const capeGeo = new BoxGeometry(1, 16, 10)
    capeGeo.translate(0, -8, 0)
    applyCubeUV(capeGeo, getCapeUV(), { width: 64, height: 32 })

    return {
      head: headGeo,
      helmet: helmetGeo,
      body: bodyGeo,
      rightArm: rightArmGeo,
      leftArm: leftArmGeo,
      rightLeg: rightLegGeo,
      leftLeg: leftLegGeo,
      cape: capeGeo,
    }
  }, [])

  // Animation loop
  useFrame((state) => {
    if (!animate) return

    const time = state.clock.elapsedTime

    // Head bob animation
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * ANIMATION.HEAD_BOB_SPEED) / 5
      headRef.current.rotation.x = Math.sin(time) / 6
    }

    if (running) {
      // Running animation (matching legacy rotation.z for arm/leg swing)
      const runTime = time * ANIMATION.RUN_SPEED

      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = ANIMATION.ARM_SWING_RUN * Math.cos(0.6662 * runTime + Math.PI)
        rightArmRef.current.rotation.z = Math.cos(0.2812 * runTime) - 1
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = ANIMATION.ARM_SWING_RUN * Math.cos(0.6662 * runTime)
        leftArmRef.current.rotation.z = Math.cos(0.2312 * runTime) + 1
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = ANIMATION.LEG_SWING_RUN * Math.cos(0.6662 * runTime)
      }
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = ANIMATION.LEG_SWING_RUN * Math.cos(0.6662 * runTime + Math.PI)
      }
      if (playerGroupRef.current) {
        playerGroupRef.current.position.y = Math.cos(0.6662 * runTime * 2)
      }
      if (capeRef.current) {
        capeRef.current.rotation.x = 0.1 * Math.sin(0.6662 * runTime * 2) + Math.PI / 2.5
      }
    } else {
      // Idle animation (matching legacy)
      const idleTime = time * ANIMATION.IDLE_SPEED

      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -Math.sin(idleTime) * ANIMATION.ARM_SWING_IDLE
        leftArmRef.current.rotation.z = (Math.cos(idleTime) + Math.PI / 2) / 30
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = Math.sin(idleTime) * ANIMATION.ARM_SWING_IDLE
        rightArmRef.current.rotation.z = -(Math.cos(idleTime) + Math.PI / 2) / 30
      }
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(idleTime) * ANIMATION.LEG_SWING_IDLE
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = -Math.sin(idleTime) * ANIMATION.LEG_SWING_IDLE
      }
      if (playerGroupRef.current) {
        playerGroupRef.current.position.y = 0
      }
      if (capeRef.current) {
        capeRef.current.rotation.x = Math.sin(time * 2) / 15 + Math.PI / 15
      }
    }
  })

  // Cape material
  const capeMaterial = useMemo(() => {
    const mat = new MeshStandardMaterial({
      map: capeTexture,
      side: DoubleSide,
    })
    if (capeTexture) {
      capeTexture.magFilter = NearestFilter
      capeTexture.minFilter = NearestFilter
    }
    return mat
  }, [capeTexture])

  // Positions matching legacy code:
  // Legacy body positions used Z for left/right offset
  // playerModel.position.y = 6 (overall lift)
  // headgroup.position.y = 8 (relative to body center)
  // leftleg.position.z = -2, rightleg.position.z = 2
  // leftarm.position.z = -6, rightarm.position.z = 6
  // leftarm.position.y = 4, rightarm.position.y = 4 (shoulder height from body center)

  return (
    <group ref={playerGroupRef} scale={[SCALE, SCALE, SCALE]}>
      {/* 
        Model hierarchy matching legacy:
        - playerModel.position.y = 6 (lifts entire model)
        - headgroup.position.y = 8 (head sits on top of body)
        - body is at origin of playerModel (center y=0 of upperbody)
        
        Total head Y from ground: 6 + 8 + 2(head offset) = 16 (but scaled)
        
        Body center is at y=6 from ground in legacy.
        Head group at y=8 relative to body = y=14 from ground.
        Legs pivot at y=-6 relative to body = y=0 from ground.
      */}
      
      {/* Head group - position.y = 8 in legacy (relative to upperbody which is at model y=0) */}
      <group ref={headRef} position={[0, 10, 0]}>
        <BodyPartMesh geometry={geometries.head} texture={skinTexture} />
        <BodyPartMesh geometry={geometries.helmet} texture={skinTexture} transparent />
      </group>

      {/* Body - at center of upperbody, model lifts it by 6 */}
      <group position={[0, 0, 0]}>
        <BodyPartMesh geometry={geometries.body} texture={skinTexture} />
      </group>

      {/* Right arm: legacy position.z = 6, position.y = 4 */}
      <group ref={rightArmRef} position={[0, 4, 6]}>
        <BodyPartMesh geometry={geometries.rightArm} texture={skinTexture} />
      </group>

      {/* Left arm: legacy position.z = -6, position.y = 4 */}
      <group ref={leftArmRef} position={[0, 4, -6]}>
        <BodyPartMesh geometry={geometries.leftArm} texture={skinTexture} />
      </group>

      {/* Right leg: legacy position.z = 2, position.y = -6 */}
      <group ref={rightLegRef} position={[0, -6, 2]}>
        <BodyPartMesh geometry={geometries.rightLeg} texture={skinTexture} />
      </group>

      {/* Left leg: legacy position.z = -2, position.y = -6 */}
      <group ref={leftLegRef} position={[0, -6, -2]}>
        <BodyPartMesh geometry={geometries.leftLeg} texture={skinTexture} />
      </group>

      {/* Cape: legacy capeOrigo.position.x = -2, position.y = 6 with rotation.y = PI */}
      {showCape && capeTexture && (
        <group 
          ref={capeRef} 
          position={[-2, 6, 0]} 
          rotation={[Math.PI / 15, Math.PI, 0]}
        >
          <mesh geometry={geometries.cape} material={capeMaterial} />
        </group>
      )}
    </group>
  )
}
