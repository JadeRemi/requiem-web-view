import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { clone as cloneGltf } from 'three/examples/jsm/utils/SkeletonUtils.js'
import type { PlayerClass } from '../mock/classes'

/**
 * Figurine positioning config - adjust these to center the model in the viewer
 *
 * WHAT WORKS (from EnemyViewer):
 * 1. Use SkeletonUtils.clone() instead of scene.clone()
 * 2. Use SceneContent wrapper component
 * 3. Position via <group position={[x, y, 0]}> wrapper around Model
 * 4. Model only handles scale, not position
 * 5. Canvas with frameloop="always"
 */
const FIGURINE_CONFIG = {
  /** X offset for all figurines */
  offsetX: 0.5,
  /** Y offset for all figurines (negative = lower) */
  offsetY: -0.2,
  /** Scale multiplier for all figurines */
  scale: 1,
  /** Camera Y position */
  cameraY: 0.8,
  /** Camera distance */
  cameraDistance: 4,
}

interface ModelProps {
  path: string
  scale: number
}

function Model({ path, scale }: ModelProps) {
  const { scene } = useGLTF(path)

  const clonedScene = useMemo(() => {
    const clone = cloneGltf(scene)
    clone.scale.set(scale, scale, scale)
    return clone
  }, [scene, scale])

  return <primitive object={clonedScene} />
}

interface SceneContentProps {
  modelPath: string
  scale: number
  offsetX: number
  offsetY: number
}

function SceneContent({ modelPath, scale, offsetX, offsetY }: SceneContentProps) {
  return (
    <>
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

      <group position={[offsetX, offsetY, 0]}>
        <Model path={modelPath} scale={scale} />
      </group>
    </>
  )
}

interface ClassViewerProps {
  playerClass: PlayerClass
}

export function ClassViewer({ playerClass }: ClassViewerProps) {
  return (
    <div className="class-viewer">
      <Canvas key={playerClass.id} frameloop="always">
        <Suspense fallback={null}>
          <SceneContent
            modelPath={playerClass.modelPath}
            scale={playerClass.scale * FIGURINE_CONFIG.scale}
            offsetX={FIGURINE_CONFIG.offsetX}
            offsetY={FIGURINE_CONFIG.offsetY}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
