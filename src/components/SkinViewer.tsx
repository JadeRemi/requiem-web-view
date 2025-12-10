import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { TextureLoader, Texture, NearestFilter, SRGBColorSpace } from 'three'
import { MinecraftCharacter } from './MinecraftCharacter'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { SkinViewerProps, SkinViewerConfig } from '../types/skin'
import { DEFAULT_CONFIG } from '../types/skin'
import { decodeSkinHash } from '../utils/skinHash'
import { DEFAULT_SKIN_HASH } from '../config'

interface ControlPanelProps {
  config: SkinViewerConfig
  onConfigChange: (key: keyof SkinViewerConfig, value: boolean) => void
  onFileUpload: (file: File, type: 'skin' | 'cape') => void
  compact?: boolean
}

function ControlPanel({ config, onConfigChange, onFileUpload, compact = false }: ControlPanelProps) {
  const skinInputRef = useRef<HTMLInputElement>(null)
  const capeInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (type: 'skin' | 'cape') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'image/png') {
      onFileUpload(file, type)
    }
  }

  const iconSize = compact ? 14 : 28

  return (
    <div className={`control-panel ${compact ? 'control-panel--compact' : ''}`}>
      <div className="control-group">
        <Tooltip content={`Animate: ${config.animate ? 'on' : 'off'}`} position="top">
          <button
            className={`icon-toggle ${config.animate ? 'active' : ''}`}
            onClick={() => onConfigChange('animate', !config.animate)}
            aria-label="Toggle animation"
          >
            <Icon name="animate" size={iconSize} />
          </button>
        </Tooltip>
        <Tooltip content={`Rotate: ${config.autoRotate ? 'on' : 'off'}`} position="top">
          <button
            className={`icon-toggle ${config.autoRotate ? 'active' : ''}`}
            onClick={() => onConfigChange('autoRotate', !config.autoRotate)}
            aria-label="Toggle rotation"
          >
            <Icon name="rotate" size={iconSize} />
          </button>
        </Tooltip>
      </div>
      {!compact && (
        <div className="control-group upload-buttons">
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
      )}
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
      {/* Camera positioned further back and higher */}
      <PerspectiveCamera makeDefault position={[0, 1.5, 12]} fov={35} />
      <OrbitControls
        autoRotate={config.autoRotate}
        autoRotateSpeed={2}
        enablePan={false}
        minDistance={6}
        maxDistance={20}
        target={[0, 0.8, 0]}
        enableRotate={true}
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

/**
 * Load skin URL from a Minecraft skin hash
 * Returns the texture URL or null if decoding fails
 */
function getSkinUrlFromHash(hash: string): string | null {
  const decoded = decodeSkinHash(hash)
  return decoded?.skinUrl ?? null
}

/**
 * Load cape URL from a Minecraft skin hash
 */
function getCapeUrlFromHash(hash: string): string | null {
  const decoded = decodeSkinHash(hash)
  return decoded?.capeUrl ?? null
}

export function SkinViewer({
  skinUrl,
  skinHash,
  capeUrl,
  config: initialConfig,
  width = 400,
  height = 600,
  compactControls = false,
}: SkinViewerProps & { skinHash?: string }) {
  const [config, setConfig] = useState<SkinViewerConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  })

  const [skinTexture, setSkinTexture] = useState<Texture | null>(null)
  const [capeTexture, setCapeTexture] = useState<Texture | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Determine final skin URL - priority: skinUrl prop > skinHash prop > default hash
  const finalSkinUrl = skinUrl ?? getSkinUrlFromHash(skinHash ?? DEFAULT_SKIN_HASH)
  const finalCapeUrl = capeUrl ?? (skinHash ? getCapeUrlFromHash(skinHash) : null)

  // Load skin texture with lazy loading
  useEffect(() => {
    if (!finalSkinUrl) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const loader = new TextureLoader()
    
    // Create an image to handle CORS and lazy loading
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      loader.load(
        finalSkinUrl,
        (texture) => {
          texture.magFilter = NearestFilter
          texture.minFilter = NearestFilter
          texture.colorSpace = SRGBColorSpace
          texture.needsUpdate = true
          setSkinTexture(texture)
          setIsLoading(false)
        },
        undefined,
        (error) => {
          console.error('Failed to load skin texture:', error)
          setIsLoading(false)
        }
      )
    }
    
    img.onerror = () => {
      console.error('Failed to load skin image')
      setIsLoading(false)
    }
    
    // Start loading
    img.src = finalSkinUrl
  }, [finalSkinUrl])

  // Load cape texture
  useEffect(() => {
    if (!finalCapeUrl) {
      setCapeTexture(null)
      return
    }

    const loader = new TextureLoader()
    loader.load(
      finalCapeUrl,
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
  }, [finalCapeUrl])

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
      {isLoading && (
        <div className="skin-viewer-loading">
          <span>Loading...</span>
        </div>
      )}
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
        compact={compactControls}
      />
    </div>
  )
}
