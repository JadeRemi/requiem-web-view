import { SkinViewer } from '../components/SkinViewer'

export function ProfilePage() {
  return (
    <div className="page profile-page">
      <SkinViewer
        config={{
          animate: true,
          autoRotate: true,
          running: false,
          showCape: true,
          freezeCameraY: false,
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  )
}

