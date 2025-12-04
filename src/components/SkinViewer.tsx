import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { TextureLoader, Texture, NearestFilter, SRGBColorSpace } from 'three'
import { MinecraftCharacter } from './MinecraftCharacter'
import type { SkinViewerProps, SkinViewerConfig } from '../types/skin'
import { DEFAULT_CONFIG } from '../types/skin'

// Default Steve skin (base64 encoded minimal placeholder)
const DEFAULT_SKIN_URL = 'https://crafatar.com/skins/8667ba71-b85a-4004-af54-457a9734eed7'

interface ControlPanelProps {
  config: SkinViewerConfig
  onConfigChange: (key: keyof SkinViewerConfig, value: boolean) => void
  onFileUpload: (file: File, type: 'skin' | 'cape') => void
}

function ControlPanel({ config, onConfigChange, onFileUpload }: ControlPanelProps) {
  const skinInputRef = useRef<HTMLInputElement>(null)
  const capeInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (type: 'skin' | 'cape') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'image/png') {
      onFileUpload(file, type)
    }
  }

  return (
    <div className="control-panel">
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={config.animate}
            onChange={(e) => onConfigChange('animate', e.target.checked)}
          />
          Animate
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.running}
            onChange={(e) => onConfigChange('running', e.target.checked)}
          />
          Running
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.autoRotate}
            onChange={(e) => onConfigChange('autoRotate', e.target.checked)}
          />
          Auto Rotate
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.showCape}
            onChange={(e) => onConfigChange('showCape', e.target.checked)}
          />
          Show Cape
        </label>
      </div>
      <div className="control-group">
        <button onClick={() => skinInputRef.current?.click()}>Upload Skin</button>
        <input
          ref={skinInputRef}
          type="file"
          accept="image/png"
          onChange={handleFileChange('skin')}
          style={{ display: 'none' }}
        />
        <button onClick={() => capeInputRef.current?.click()}>Upload Cape</button>
        <input
          ref={capeInputRef}
          type="file"
          accept="image/png"
          onChange={handleFileChange('cape')}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

function SceneContent({
  skinTexture,
  capeTexture,
  config,
}: {
  skinTexture: Texture | null
  capeTexture: Texture | null
  config: SkinViewerConfig
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
      <OrbitControls
        autoRotate={config.autoRotate}
        autoRotateSpeed={2}
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        target={[0, 1.5, 0]}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <MinecraftCharacter
        skinTexture={skinTexture}
        capeTexture={capeTexture}
        animate={config.animate}
        running={config.running}
        showCape={config.showCape}
      />
    </>
  )
}

export function SkinViewer({
  skinUrl = DEFAULT_SKIN_URL,
  capeUrl,
  config: initialConfig,
  width = 400,
  height = 600,
}: SkinViewerProps) {
  const [config, setConfig] = useState<SkinViewerConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  })

  const [skinTexture, setSkinTexture] = useState<Texture | null>(null)
  const [capeTexture, setCapeTexture] = useState<Texture | null>(null)

  // Load skin texture
  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(
      skinUrl,
      (texture) => {
        texture.magFilter = NearestFilter
        texture.minFilter = NearestFilter
        texture.colorSpace = SRGBColorSpace
        texture.needsUpdate = true
        setSkinTexture(texture)
      },
      undefined,
      (error) => {
        console.error('Failed to load skin texture:', error)
      }
    )
  }, [skinUrl])

  // Load cape texture
  useEffect(() => {
    if (!capeUrl) {
      setCapeTexture(null)
      return
    }

    const loader = new TextureLoader()
    loader.load(
      capeUrl,
      (texture) => {
        texture.magFilter = NearestFilter
        texture.minFilter = NearestFilter
        texture.colorSpace = SRGBColorSpace
        texture.needsUpdate = true
        setCapeTexture(texture)
      },
      undefined,
      (error) => {
        console.error('Failed to load cape texture:', error)
        setCapeTexture(null)
      }
    )
  }, [capeUrl])

  const handleConfigChange = useCallback((key: keyof SkinViewerConfig, value: boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleFileUpload = useCallback((file: File, type: 'skin' | 'cape') => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      const loader = new TextureLoader()
      loader.load(dataUrl, (texture) => {
        texture.magFilter = NearestFilter
        texture.minFilter = NearestFilter
        texture.colorSpace = SRGBColorSpace
        texture.needsUpdate = true

        if (type === 'skin') {
          setSkinTexture(texture)
        } else {
          setCapeTexture(texture)
        }
      })
    }
    reader.readAsDataURL(file)
  }, [])

  return (
    <div className="skin-viewer" style={{ width, height }}>
      <Canvas>
        <Suspense fallback={null}>
          <SceneContent
            skinTexture={skinTexture}
            capeTexture={capeTexture}
            config={config}
          />
        </Suspense>
      </Canvas>
      <ControlPanel
        config={config}
        onConfigChange={handleConfigChange}
        onFileUpload={handleFileUpload}
      />
    </div>
  )
}

