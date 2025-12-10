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
  Color,
} from 'three'
import type { MinecraftCharacterProps } from '../types/skin'
import {
  applyHeadUVs,
  applyHelmetUVs,
  applyBodyUVs,
  applyRightArmUVs,
  applyLeftArmUVs,
  applyRightLegUVs,
  applyLeftLegUVs,
  applyCapeUVs,
} from '../utils/uvMapping'

/** Scale: 1 unit = 1/8 of model height */
const SCALE = 1 / 8

/** Placeholder color matching --grey-900 background */
const PLACEHOLDER_COLOR = new Color('#0d0d0e')

interface BodyPartMeshProps {
  geometry: BoxGeometry
  texture: Texture | null
  transparent?: boolean
}

function BodyPartMesh({ geometry, texture, transparent = false }: BodyPartMeshProps) {
  const material = useMemo(() => {
    const mat = new MeshStandardMaterial({
      map: texture,
      // Use placeholder color when no texture loaded
      color: texture ? undefined : PLACEHOLDER_COLOR,
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
      // Clear placeholder color once texture loads
      material.color.set(0xffffff)
    }
  }, [texture, material])

  return <mesh geometry={geometry} material={material} />
}

/**
 * 3D Character Model
 * 
 * Coordinate system (matching legacy):
 * - X: Forward/Back (front faces +X)
 * - Y: Up/Down
 * - Z: Left/Right (character's right is +Z)
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

  // Detect texture dimensions (64x64 modern or 64x32 legacy)
  const texWidth = skinTexture?.image?.width ?? 64
  const texHeight = skinTexture?.image?.height ?? 64

  const geometries = useMemo(() => {
    // Head (8x8x8)
    const headGeo = new BoxGeometry(8, 8, 8)
    applyHeadUVs(headGeo, texWidth, texHeight)

    // Helmet (9x9x9)
    const helmetGeo = new BoxGeometry(9, 9, 9)
    applyHelmetUVs(helmetGeo, texWidth, texHeight)

    // Body (4 deep × 12 tall × 8 wide)
    const bodyGeo = new BoxGeometry(4, 12, 8)
    applyBodyUVs(bodyGeo, texWidth, texHeight)

    // Right arm (4×12×4) - pivot at shoulder
    const rightArmGeo = new BoxGeometry(4, 12, 4)
    rightArmGeo.translate(0, -4, 0)
    applyRightArmUVs(rightArmGeo, texWidth, texHeight)

    // Left arm (4×12×4) - pivot at shoulder
    const leftArmGeo = new BoxGeometry(4, 12, 4)
    leftArmGeo.translate(0, -4, 0)
    applyLeftArmUVs(leftArmGeo, texWidth, texHeight)

    // Right leg (4×12×4) - pivot at hip
    const rightLegGeo = new BoxGeometry(4, 12, 4)
    rightLegGeo.translate(0, -6, 0)
    applyRightLegUVs(rightLegGeo, texWidth, texHeight)

    // Left leg (4×12×4) - pivot at hip
    const leftLegGeo = new BoxGeometry(4, 12, 4)
    leftLegGeo.translate(0, -6, 0)
    applyLeftLegUVs(leftLegGeo, texWidth, texHeight)

    // Cape (1×16×10) - cape is always 64x32
    const capeGeo = new BoxGeometry(1, 16, 10)
    capeGeo.translate(0, -8, 0)
    applyCapeUVs(capeGeo, 64, 32)

    return { headGeo, helmetGeo, bodyGeo, rightArmGeo, leftArmGeo, rightLegGeo, leftLegGeo, capeGeo }
  }, [texWidth, texHeight])

  // Animation
  useFrame((state) => {
    if (!animate) return
    const time = state.clock.elapsedTime

    // Head bob
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.5) / 5
      headRef.current.rotation.z = Math.sin(time) / 6
    }

    if (running) {
      const t = time * 10
      
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = 2 * Math.cos(0.6662 * t + Math.PI)
        rightArmRef.current.rotation.x = Math.cos(0.2812 * t) - 1
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 2 * Math.cos(0.6662 * t)
        leftArmRef.current.rotation.x = Math.cos(0.2312 * t) + 1
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.z = 1.4 * Math.cos(0.6662 * t)
      }
      if (leftLegRef.current) {
        leftLegRef.current.rotation.z = 1.4 * Math.cos(0.6662 * t + Math.PI)
      }
      if (playerGroupRef.current) {
        playerGroupRef.current.position.y = Math.cos(0.6662 * t * 2)
      }
      if (capeRef.current) {
        capeRef.current.rotation.z = 0.1 * Math.sin(0.6662 * t * 2) + Math.PI / 2.5
      }
    } else {
      const t = time * 3

      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = -Math.sin(t) / 2
        leftArmRef.current.rotation.x = (Math.cos(t) + Math.PI / 2) / 30
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = Math.sin(t) / 2
        rightArmRef.current.rotation.x = -(Math.cos(t) + Math.PI / 2) / 30
      }
      if (leftLegRef.current) {
        leftLegRef.current.rotation.z = Math.sin(t) / 3
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.z = -Math.sin(t) / 3
      }
      if (playerGroupRef.current) {
        playerGroupRef.current.position.y = 0
      }
      if (capeRef.current) {
        capeRef.current.rotation.z = Math.sin(time * 2) / 15 + Math.PI / 15
      }
    }
  })

  const capeMaterial = useMemo(() => {
    const mat = new MeshStandardMaterial({ map: capeTexture, side: DoubleSide })
    if (capeTexture) {
      capeTexture.magFilter = NearestFilter
      capeTexture.minFilter = NearestFilter
    }
    return mat
  }, [capeTexture])

  return (
    <group ref={playerGroupRef} scale={[SCALE, SCALE, SCALE]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Head at y=10 (on top of body) */}
      <group ref={headRef} position={[0, 10, 0]}>
        <BodyPartMesh geometry={geometries.headGeo} texture={skinTexture} />
        <BodyPartMesh geometry={geometries.helmetGeo} texture={skinTexture} transparent />
      </group>

      {/* Body at center */}
      <BodyPartMesh geometry={geometries.bodyGeo} texture={skinTexture} />

      {/* Right arm at z=6, y=4 */}
      <group ref={rightArmRef} position={[0, 4, 6]} rotation={[-Math.PI / 32, 0, 0]}>
        <BodyPartMesh geometry={geometries.rightArmGeo} texture={skinTexture} />
      </group>

      {/* Left arm at z=-6, y=4 */}
      <group ref={leftArmRef} position={[0, 4, -6]} rotation={[Math.PI / 32, 0, 0]}>
        <BodyPartMesh geometry={geometries.leftArmGeo} texture={skinTexture} />
      </group>

      {/* Right leg at z=2, y=-6 */}
      <group ref={rightLegRef} position={[0, -6, 2]}>
        <BodyPartMesh geometry={geometries.rightLegGeo} texture={skinTexture} />
      </group>

      {/* Left leg at z=-2, y=-6 */}
      <group ref={leftLegRef} position={[0, -6, -2]}>
        <BodyPartMesh geometry={geometries.leftLegGeo} texture={skinTexture} />
      </group>

      {/* Cape at x=-2, y=6 */}
      {showCape && capeTexture && (
        <group ref={capeRef} position={[-2, 6, 0]} rotation={[0, Math.PI, Math.PI / 15]}>
          <mesh geometry={geometries.capeGeo} material={capeMaterial} />
        </group>
      )}
    </group>
  )
}
