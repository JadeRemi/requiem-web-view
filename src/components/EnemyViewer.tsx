import { Suspense, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF, Bounds } from '@react-three/drei'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { EnemyModel } from '../mock/enemies'

interface ModelProps {
  modelPath: string
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath)
  // Just return the cloned scene - Bounds handles the fitting
  return <primitive object={scene.clone(true)} />
}

interface SceneContentProps {
  modelPath: string
  autoRotate: boolean
  offsetY: number
}

function SceneContent({ modelPath, autoRotate, offsetY }: SceneContentProps) {
  // Apply offsetY to the target - higher target = model appears lower
  const targetY = 0.8 + (offsetY ?? 0)
  
  return (
    <>
      {/* Camera behind model so enemies face toward camera */}
      <PerspectiveCamera makeDefault position={[0, 0, -5]} fov={50} />
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
      <Bounds fit clip observe margin={1.5}>
        <Model modelPath={modelPath} />
      </Bounds>
    </>
  )
}

interface EnemyViewerProps {
  model: EnemyModel
  autoRotate?: boolean
  onToggleRotate?: () => void
}

// Memoize to prevent re-renders during carousel animation
const EnemyViewerInner = memo(function EnemyViewerInner({ 
  model, 
  autoRotate = true,
}: { model: EnemyModel; autoRotate: boolean }) {
  return (
    <Canvas frameloop="always">
      <Suspense fallback={null}>
        <SceneContent 
          modelPath={model.path} 
          autoRotate={autoRotate} 
          offsetY={model.offsetY ?? 0}
        />
      </Suspense>
    </Canvas>
  )
})

export function EnemyViewer({ 
  model, 
  autoRotate = true,
  onToggleRotate,
}: EnemyViewerProps) {
  return (
    <div className="enemy-viewer">
      <EnemyViewerInner model={model} autoRotate={autoRotate} />
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
