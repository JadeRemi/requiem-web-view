import { Suspense, useMemo, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { clone as cloneGltf } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import { assetPath } from '../utils/assetPath'
import type { EnemyModel } from '../mock/enemies'

/** Fixed camera target Y position */
const CAMERA_TARGET_Y = 0.8

/** Camera distance from model */
const CAMERA_DISTANCE = 4

/** Default Y offset to lower models (feet at bottom of view) */
const DEFAULT_MODEL_Y = -0.5

interface ModelProps {
  modelPath: string
  configScale: number
  onLoaded?: () => void
}

function Model({ modelPath, configScale, onLoaded }: ModelProps) {
  const { scene } = useGLTF(assetPath(modelPath))
  const hasCalledOnLoaded = useRef(false)

  const clonedScene = useMemo(() => {
    const clone = cloneGltf(scene)
    // Apply scale directly to cloned scene root
    clone.scale.set(configScale, configScale, configScale)
    return clone
  }, [scene, configScale])

  // Call onLoaded once
  if (!hasCalledOnLoaded.current && onLoaded) {
    hasCalledOnLoaded.current = true
    onLoaded()
  }

  return <primitive object={clonedScene} scale={[configScale, configScale, configScale]} />
}

interface SceneContentProps {
  modelPath: string
  autoRotate: boolean
  offsetY: number
  configScale: number
}

function SceneContent({ modelPath, autoRotate, offsetY, configScale }: SceneContentProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Model Y position: default offset + config offset (negative = lower)
  const modelY = DEFAULT_MODEL_Y + (offsetY ?? 0)

  const handleModelLoaded = () => {
    setIsLoaded(true)
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, CAMERA_TARGET_Y, -CAMERA_DISTANCE]} fov={50} />
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={4}
        target={[0, CAMERA_TARGET_Y, 0]}
      />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      <group position={[0, modelY, 0]} visible={isLoaded}>
        <Model modelPath={modelPath} configScale={configScale} onLoaded={handleModelLoaded} />
      </group>
    </>
  )
}

interface EnemyViewerProps {
  model: EnemyModel
  autoRotate?: boolean
  onToggleRotate?: () => void
}

export function EnemyViewer({
  model,
  autoRotate = true,
  onToggleRotate,
}: EnemyViewerProps) {
  return (
    <div className="enemy-viewer">
      <Canvas key={model.id} frameloop="always">
        <Suspense fallback={null}>
          <SceneContent
            modelPath={model.path}
            autoRotate={autoRotate}
            offsetY={model.offsetY ?? 0}
            configScale={model.scale}
          />
        </Suspense>
      </Canvas>
      {onToggleRotate && (
        <div className="enemy-controls">
          <Tooltip content={`Rotate: ${autoRotate ? 'on' : 'off'}`} position="top">
            <button
              className={`icon-toggle ${autoRotate ? 'active' : ''}`}
              onClick={onToggleRotate}
              aria-label="Toggle rotation"
            >
              <Icon name="rotate" size={14} />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  )
}
