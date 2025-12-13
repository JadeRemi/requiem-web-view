import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF, Bounds } from '@react-three/drei'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { EnemyModel } from '../mock/enemies'

/** Base Y offset for camera target to position models lower in card */
const BASE_TARGET_Y = 0.3

/** Camera distance from model */
const CAMERA_DISTANCE = 4

interface ModelProps {
  modelPath: string
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath)
  
  const clonedScene = useMemo(() => {
    return scene.clone(true)
  }, [scene])
  
  return <primitive object={clonedScene} />
}

interface SceneContentProps {
  modelPath: string
  autoRotate: boolean
  offsetY: number
}

function SceneContent({ modelPath, autoRotate, offsetY }: SceneContentProps) {
  const targetY = BASE_TARGET_Y + (offsetY ?? 0)
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, targetY, -CAMERA_DISTANCE]} fov={50} />
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={4}
        target={[0, targetY, 0]}
      />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, -5]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />
      
      {/* Bounds handles auto-scaling and zoom animation */}
      {/* Position the group to move the model's center to targetY */}
      <group position={[0, targetY, 0]}>
        <Bounds fit clip margin={1.2}>
          <Model modelPath={modelPath} />
        </Bounds>
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
