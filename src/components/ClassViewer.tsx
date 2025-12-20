import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import type { PlayerClass } from '../mock/classes'

/**
 * Figurine positioning config - adjust these to center the model in the viewer
 *
 * TO-TRY approaches from other viewers:
 * 1. EnemyViewer: camera at negative Z + OrbitControls with target (WORKS)
 * 2. SkinViewer: camera at positive Z + OrbitControls with target (WORKS)
 * 3. EquipmentViewer: camera at positive Z + OrbitControls + model rotation (faces away without rotation)
 *
 * Current approach: Use EnemyViewer pattern - camera at negative Z + OrbitControls with target
 */
const FIGURINE_CONFIG = {
  /** X offset for all figurines */
  offsetX: 10,
  /** Y offset for all figurines (negative = lower) */
  offsetY: 20,
  /** Scale multiplier for all figurines */
  scale: 3,
  /** Camera Y position */
  cameraY: 0.8,
  /** Camera distance */
  cameraDistance: 4,
}

interface ModelProps {
  path: string
  scale: number
  offsetX: number
  offsetY: number
}

function Model({ path, scale, offsetX, offsetY }: ModelProps) {
  const { scene } = useGLTF(path)

  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.scale.set(scale, scale, scale)
    return clone
  }, [scene, scale])

  return (
    <group position={[offsetX, offsetY, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}

interface ClassViewerProps {
  playerClass: PlayerClass
}

export function ClassViewer({ playerClass }: ClassViewerProps) {
  return (
    <div className="class-viewer">
      <Canvas key={playerClass.id}>
        <Suspense fallback={null}>
          {/* EnemyViewer pattern: camera at negative Z + OrbitControls with target */}
          <PerspectiveCamera
            makeDefault
            position={[0, FIGURINE_CONFIG.cameraY, -FIGURINE_CONFIG.cameraDistance]}
            fov={50}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            target={[0, FIGURINE_CONFIG.cameraY, 0]}
          />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          <Model
            path={playerClass.modelPath}
            scale={playerClass.scale * FIGURINE_CONFIG.scale}
            offsetX={FIGURINE_CONFIG.offsetX}
            offsetY={FIGURINE_CONFIG.offsetY}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
