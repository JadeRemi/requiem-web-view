import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF, Center } from '@react-three/drei'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { EnemyModel } from '../mock/enemies'

interface ModelProps {
  model: EnemyModel
}

// Position enemies low in the card
const ENEMY_BASE_OFFSET_Y = -4.5

function Model({ model }: ModelProps) {
  const { scene } = useGLTF(model.path)
  
  // Clone scene for each instance
  const clonedScene = useMemo(() => scene.clone(), [scene])

  // Combine base offset with model-specific offset
  const totalOffsetY = ENEMY_BASE_OFFSET_Y + (model.offsetY ?? 0)

  return (
    <Center disableY>
      <group position={[0, totalOffsetY, 0]}>
        <primitive 
          object={clonedScene} 
          scale={model.scale}
        />
      </group>
    </Center>
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
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, -5]} fov={45} />
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={4}
            target={[0, 0, 0]}
          />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, -5]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={0.4} />
          <Model model={model} />
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
