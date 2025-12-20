import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, PerspectiveCamera } from '@react-three/drei'
import { Group } from 'three'
import { CURRENCY } from '../config'

function CoinModel() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF(CURRENCY.MODEL_PATH)
  const { scale, offsetX, offsetY } = CURRENCY.COIN_MODEL

  const clonedScene = useMemo(() => scene.clone(), [scene])

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 2
    }
  })

  return (
    <group ref={groupRef} position={[offsetX, offsetY, 0]}>
      <Center>
        <primitive object={clonedScene} scale={scale} />
      </Center>
    </group>
  )
}

interface CoinViewerProps {
  size?: number
  className?: string
}

export function CoinViewer({ size = 24, className = '' }: CoinViewerProps) {
  return (
    <div
      className={`coin-viewer ${className}`}
      style={{ width: size, height: size, pointerEvents: 'none' }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} />
          <CoinModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
