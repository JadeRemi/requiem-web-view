import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF, Center } from '@react-three/drei'
import { Group } from 'three'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { EquipmentModel } from '../mock/equipment'

interface ModelProps {
  model: EquipmentModel
  autoRotate: boolean
}

function Model({ model, autoRotate }: ModelProps) {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF(model.path)
  
  // Clone scene for each instance
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useFrame((_state, delta) => {
    if (groupRef.current && autoRotate) {
      // Match player model rotation speed (2 rad/s from OrbitControls autoRotateSpeed)
      groupRef.current.rotation.y += delta * 2
    }
  })

  return (
    <group ref={groupRef} position={[0, model.offsetY ?? 0, 0]}>
      <group rotation={[model.rotationX, model.rotationY, model.rotationZ]}>
        <Center>
          <primitive object={clonedScene} scale={model.scale} />
        </Center>
      </group>
    </group>
  )
}

interface EquipmentViewerProps {
  model: EquipmentModel
  autoRotate?: boolean
  onToggleRotate?: () => void
  /** Disable all mouse controls (rotate, zoom, pan) */
  disableControls?: boolean
}

export function EquipmentViewer({
  model,
  autoRotate = true,
  onToggleRotate,
  disableControls = false,
}: EquipmentViewerProps) {
  return (
    <div className="equipment-viewer">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            enableRotate={!disableControls}
            enableZoom={!disableControls}
          />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} />
          <Model model={model} autoRotate={autoRotate} />
        </Suspense>
      </Canvas>
      {onToggleRotate && (
        <div className="equipment-controls">
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

